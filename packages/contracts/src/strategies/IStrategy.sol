// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.0;

interface IStrategy {
    /// @notice Returns the contract address of the underlying asset of this strategy.
    function asset() external view returns (address);

    /// @notice Returns the contract address of the Vault to which this strategy is connected.
    function vault() external view returns (address);

    /// @notice Transfers a specified amount of tokens to the vault.
    /// @param assets A amount of tokens to withdraw.
    /// @return loss A number of tokens that the strategy could not return.
    function withdraw(uint256 assets) external returns (uint256 loss);
}
