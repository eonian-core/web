// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.19;

import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

import {ICInterestRate} from "./protocols/ICInterestRate.sol";
import {BaseStrategy, IOps} from "./BaseStrategy.sol";
import {ICToken} from "./protocols/ICToken.sol";
import {IRainMaker} from "./protocols/IRainMaker.sol";
import {IStrategy} from "./IStrategy.sol";
import {IStrategiesLender} from "../lending/IStrategiesLender.sol";

error IncompatibleCTokenContract();
error UnsupportedDecimals();
error MintError(uint256 code);
error RedeemError(uint256 code);

/** Base for implementation of strategy on top of CToken (Compound-like market)  */
abstract contract CTokenBaseStrategy is ICInterestRate, BaseStrategy {

    /** Market on top of which strategy operates */
    ICToken public cToken;
    /** Contract which allow claim compToken reward */
    IRainMaker public rainMaker;
    /** Token which is used for reward, COMP for Compund */
    IERC20Upgradeable public compToken;

    /** Required for mapping of interest rate calculated per second to rate calculated per block */
    uint256 public secondPerBlock;

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[50] private __gap;

    /** Emited when assets moved into protocol */
    event DepositInProtocol(uint256 amount, uint256 sharesBefore, uint256 underlyingBefore, uint256 sharesAfter, uint256 underlyingAfter);

    /** Emited when assets moved out of protocol */
    event WithdrawFromProtocol(uint256 amount, uint256 sharesBefore, uint256 underlyingBefore, uint256 sharesAfter, uint256 underlyingAfter);

    // ------------------------------------------ Constructors ------------------------------------------

    function __CTokenBaseStrategy_init(
        IStrategiesLender _lender,
        IERC20Upgradeable _asset,
        ICToken _cToken,
        IRainMaker _rainMaker,
        IERC20Upgradeable _compToken,
        IOps _ops,
        AggregatorV3Interface _nativeTokenPriceFeed,
        AggregatorV3Interface _assetPriceFeed,
        uint256 _minReportInterval,
        bool _isPrepaid
    ) public onlyInitializing {
        __BaseStrategy_init(
            _lender,
            _asset,
            _ops,
            _minReportInterval,
            _isPrepaid,
            _nativeTokenPriceFeed,
            _assetPriceFeed,
            address(0)
        ); // ownable under the hood

        __CTokenBaseStrategyinit_unchained(_cToken, _rainMaker, _compToken);
    }

    function __CTokenBaseStrategyinit_unchained(ICToken _cToken, IRainMaker _rainMaker, IERC20Upgradeable _compToken) internal onlyInitializing {
        secondPerBlock = 3; // 3.01 awarage seconds for BSC
        cToken = _cToken;
        rainMaker = _rainMaker;
        compToken = _compToken;

        if (cToken.decimals() != 8 || _assetDecimals != 18) {
            revert UnsupportedDecimals();
        }

        if (cToken.underlying() != address(asset)) {
            revert IncompatibleCTokenContract();
        }

        approveTokenMax(address(asset), address(_cToken));
    }

    /// @notice Returns the current banana balance of the strategy contract.
    function _currentBananaBalance() internal view returns (uint256) {
        return compToken.balanceOf(address(this));
    }

    /// @notice Retrieves accrued BANANA from the protocol.
    function _claimBanana() internal {
        ICToken[] memory tokens = new ICToken[](1);
        tokens[0] = cToken;
        rainMaker.claimComp(address(this), tokens);
    }

    /// @inheritdoc IStrategy
    function interestRatePerBlock() public view returns (uint256) {
        return supplyRatePerBlock();
    }

    /// @notice Returns current deposited balance (in shares, in asset).
    /// @dev The exchange rate is recalculated at the last time someone touched the cToken contract.
    ///      Transactions are not performed too often on this contract, perhaps we should consider recalculating the rate ourselves.
    function depositedBalanceSnapshot() public view returns (uint256, uint256) {
        (, uint256 cTokenBalance, , uint256 exchangeRate) = cToken.getAccountSnapshot(address(this));

        // Since every ApeSwap's cToken has 8 decimals, we can leave 1e18 as constant here.
        return (cTokenBalance, (cTokenBalance * exchangeRate) / 1e18);
    }

    /// @notice Deposit asset into the protocol.
    function depositInProtocol(uint256 amount) internal {
        (uint256 sharesBefore, uint256 underlyingBefore) = depositedBalanceSnapshot();

        uint256 result = cToken.mint(amount);
        if (result > 0) {
            revert MintError(result);
        }

        (uint256 sharesAfter, uint256 underlyingAfter) = depositedBalanceSnapshot();
        emit DepositInProtocol(amount, sharesBefore, underlyingBefore, sharesAfter, underlyingAfter);
    }

    /// @notice Withdraw asset from the protocol.
    function withdrawFromProtocol(uint256 amount) internal {
        (uint256 sharesBefore, uint256 underlyingBefore) = depositedBalanceSnapshot();

        uint256 result = cToken.redeemUnderlying(amount);
        if (result > 0) {
            revert RedeemError(result);
        }

        (uint256 sharesAfter, uint256 underlyingAfter) = depositedBalanceSnapshot();
        emit WithdrawFromProtocol(amount, sharesBefore, underlyingBefore, sharesAfter, underlyingAfter);
    }


    // ------------------------------------------ Pass interest related methods from cToken ------------------------------------------
    // Methods must be overridden by the strategy contract if they change interest rate model

    /// @inheritdoc ICInterestRate
    function borrowRatePerBlock() public view returns (uint256) {
        if (cToken.blocksBased()) {
            return cToken.borrowRatePerBlock();
        }

        // in this case "PerBlock" actually means "PerSecond"
        return cToken.borrowRatePerBlock() * secondPerBlock;
    }

    /// @inheritdoc ICInterestRate
    function supplyRatePerBlock() public view returns (uint256) {
        if (cToken.blocksBased()) {
            return cToken.supplyRatePerBlock();
        }

        // in this case "PerBlock" actually means "PerSecond"
        return cToken.supplyRatePerBlock() * secondPerBlock;
    }

    /// @inheritdoc ICInterestRate
    function exchangeRateCurrent() public returns (uint256) {
        return cToken.exchangeRateCurrent();
    }

    /// @inheritdoc ICInterestRate
    function exchangeRateStored() public view returns (uint256) {
        return cToken.exchangeRateStored();
    }

    /// @inheritdoc ICInterestRate
    function accrueInterest() public returns (uint256) {
        return cToken.accrueInterest();
    }
}