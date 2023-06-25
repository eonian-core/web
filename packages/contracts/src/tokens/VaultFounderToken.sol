// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.19;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

import {SafeInitializable} from "../upgradeable/SafeInitializable.sol";
import {SafeUUPSUpgradeable} from "../upgradeable/SafeUUPSUpgradeable.sol";
import {IVersionable} from "../upgradeable/IVersionable.sol";
import {ERC5484Upgradeable} from "./ERC5484Upgradeable.sol";
import {ERC4626Upgradeable} from "./ERC4626Upgradeable.sol";
import {IVaultFounderToken} from "./IVaultFounderToken.sol";
import {IVaultHook, ERC4626UpgradeableRequest} from "./IVaultHook.sol";
import {RewardHolder} from "./RewardHolder.sol";

contract VaultFounderToken is IVaultFounderToken, SafeUUPSUpgradeable, ERC5484Upgradeable, IVaultHook, RewardHolder {

    // Max number of tokens that can be minted
    uint256 private _maxCountTokens;

    // Next token price multiplier in percents
    uint256 private _nextTokenPriceMultiplier;

    // Initial token price
    uint256 private _initialTokenPrice;

    /// @dev This empty reserved space is put in place to allow future versions to add new
    /// variables without shifting down storage in the inheritance chain.
    /// See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[46] private __gap;

    /* ///////////////////////////// CONSTRUCTORS ///////////////////////////// */

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(bool needDisableInitializers) SafeInitializable(needDisableInitializers) {} // solhint-disable-line no-empty-blocks

    function initialize(
        uint256 maxCountTokens_,
        uint256 nextTokenPriceMultiplier_,
        uint256 initialTokenPrice_,
        address admin_
    ) public initializer {
        __SafeUUPSUpgradeable_init_direct();
        __ERC5484Upgradeable_init("Eonian Vault Founder Token", "EVFT", BurnAuth.Neither, true, admin_);
        __RewardHolder_init(admin_);
        _maxCountTokens = maxCountTokens_;
        _nextTokenPriceMultiplier = nextTokenPriceMultiplier_;
        _initialTokenPrice = initialTokenPrice_;
    }

    /// @inheritdoc IVersionable
    function version() external pure returns (string memory) {
        return "0.1.0";
    }

    /// @dev function for mint new SBT token
    /// @param to address of user who will receive token
    /// @param uri token metadata uri
    function safeMint(address to, string memory uri) public virtual override(ERC5484Upgradeable) {
        if(totalSupply() < _maxCountTokens) {
            super.safeMint(to, uri);
        }
    }

    /// @inheritdoc ERC721Upgradeable
    function _safeMint(address to, uint256 tokenId) internal override {
        require(totalSupply() < _maxCountTokens, "EVFT: max number of tokens");
        super._safeMint(to, tokenId);
    }

    function priceOf(uint256 tokenId) external view returns (uint256) {
        require(tokenId < totalSupply(), "EVFT: Token does not exist");
        return _priceOf(tokenId);
    }

    function _priceOf(uint256 tokenId) internal view returns (uint256) {
        uint256 price = _initialTokenPrice;
        for (uint256 i = 0; i < tokenId; i++) {
            price = (price * _nextTokenPriceMultiplier) / 10_000;
        }
        return price;
    }

    function setNextTokenMultiplier(uint256 nextTokenPriceMultiplier_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _nextTokenPriceMultiplier = nextTokenPriceMultiplier_;
    }

    function nextTokenPrice() external view returns (uint256){
        return _nextTokenPrice();
    }

    function _nextTokenPrice() internal view returns (uint256){
        return _priceOf(totalSupply());
    }

    function setTokenURI(string memory _tokenURI) external override {
        address tokenOwner = msg.sender;
        uint256 tokenId = tokenOfOwnerByIndex(tokenOwner, 0);
        _setTokenURI(tokenId, _tokenURI);
    }

    function afterDepositTrigger(ERC4626UpgradeableRequest memory request)
            external override
    {
        if(request.senderMaxWithdraw >= _nextTokenPrice()) {
            safeMint(request.requestSender, "");
        }
    }

    /* solhint-disable no-empty-blocks */
    function beforeWithdrawTrigger(ERC4626UpgradeableRequest memory request) external override
    {
        //empty code
    }
    /* solhint-disable no-empty-blocks */

    /// @dev See {IERC165-supportsInterface}.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC5484Upgradeable, AccessControlUpgradeable, IERC165Upgradeable)
        virtual
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}