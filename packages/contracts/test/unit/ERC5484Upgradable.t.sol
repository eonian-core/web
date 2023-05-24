// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.10;

import "forge-std/Test.sol";

import "./helpers/TestWithERC1820Registry.sol";
import "./mocks/ERC5484UpgradableMock.sol";
import "contracts/tokens/ERC5484Upgradeable.sol";
import "contracts/tokens/IERC5484.sol";

contract ERC5484UpgradeableTest is TestWithERC1820Registry {
    ERC5484Upgradeable token;

    address rewards = vm.addr(1);
    address culprit = vm.addr(2);

    address alice = vm.addr(10);
    address bob = vm.addr(11);

    function setUp() public {
        vm.label(rewards, "rewards");
        vm.label(culprit, "culprit");

        vm.label(alice, "Alice");
        vm.label(bob, "Bob");

        //create a new instance of Founder token contact before each test run
        token = new ERC5484UpgradableMock(
            "SBT Name",
            "SBT",
            IERC5484.BurnAuth.Neither,
            true,
            address(this)
        );
    }

    function testVaultMetadata() public {
        assertEq(token.symbol(), "SBT");
        assertEq(token.name(), "SBT Name");
    }

    function testMintToken() public {
        token.safeMint(alice, "testUrl");
        token.safeMint(bob, "testUrl2");

        assertEq(token.totalSupply(), 2);
        assertEq(token.tokenURI(0), "testUrl");
        assertEq(token.tokenURI(1), "testUrl2");
        assertEq(token.ownerOf(0), alice);
        assertEq(token.ownerOf(1), bob);
    }

    function testMintTokenOnceFail(string memory url) public {
        token.safeMint(alice, url);

        vm.expectRevert("ERC5484Upgradeable: User already has a token");
        token.safeMint(alice, url);

        assertEq(token.totalSupply(), 1);
    }

    function testMintTokenMultipleTimeForSingleUser(string memory url) public {
        token = new ERC5484UpgradableMock(
            "SBT Name",
            "SBT",
            IERC5484.BurnAuth.Neither,
            false,
            address(this)
        );
        token.safeMint(alice, url);
        token.safeMint(alice, url);
        token.safeMint(alice, url);

        assertEq(token.totalSupply(), 3);
    }

    function testTokenTransferFail(string memory url) public {
        token.safeMint(alice, url);

        vm.prank(alice);
        vm.expectRevert("ERC5484Upgradeable: token is SOUL BOUND and can't be transferred");

        token.transferFrom(alice, bob, 0);
    }

    function testTokenBurnFailed(string memory url) public {
        token.safeMint(alice, url);

        vm.prank(alice);
        vm.expectRevert(
            abi.encodePacked(
                getErrorMessage(address(this), token.BURNER_ROLE())
            )
        );
        token.burn(0);

        assertEq(token.totalSupply(), 1);
    }

    function testBurnTokenForIssuerOnly(string memory url, bool mintOnce_) public {
        token = new ERC5484UpgradableMock(
            "SBT Name",
            "SBT",
            IERC5484.BurnAuth.IssuerOnly,
            mintOnce_,
            address(this)
        );

        token.safeMint(alice, url);
        assertEq(token.totalSupply(), 1);

        // can be burn only by issuer
        vm.prank(address(this));
        token.burn(0);

        assertEq(token.totalSupply(), 0);
    }

    function testBurnTokenForIssuerOnlyFail(string memory url, bool mintOnce_) public {
        token = new ERC5484UpgradableMock(
            "SBT Name",
            "SBT",
            IERC5484.BurnAuth.IssuerOnly,
            mintOnce_,
            address(this)
        );

        token.safeMint(alice, url);
        assertEq(token.totalSupply(), 1);

        // can't be burned by owner
        string memory errorMessage = getErrorMessage(address(alice), token.BURNER_ROLE()); // error message have to be generated before the call
        vm.prank(alice);
        vm.expectRevert(abi.encodePacked(errorMessage));

        token.burn(0);
        assertEq(token.totalSupply(), 1);
    }

    function testBurnTokenForOwnerOnly(string memory url, bool mintOnce_) public{
        token = new ERC5484UpgradableMock(
            "SBT Name",
            "SBT",
            IERC5484.BurnAuth.OwnerOnly,
            mintOnce_,
            address(this)
        );

        token.safeMint(alice, url);
        assertEq(token.totalSupply(), 1);

        // must pass since it can be burn only by owner
        vm.prank(alice);
        token.burn(0);
        assertEq(token.totalSupply(), 0);
    }

    function testBurnTokenForOwnerOnlyFail(string memory url, bool mintOnce_) public{
        token = new ERC5484UpgradableMock(
            "SBT Name",
            "SBT",
            IERC5484.BurnAuth.OwnerOnly,
            mintOnce_,
            address(this)
        );

        token.safeMint(alice, url);
        assertEq(token.totalSupply(), 1);

        // must fail since it can be burn only by owner
        vm.prank(address(0));
        vm.expectRevert(
            abi.encodePacked(
                getErrorMessage(address(this), token.BURNER_ROLE())
            )
        );
        token.burn(0);
        assertEq(token.totalSupply(), 1);
    }

    function testBurnTokenForOwnerAndIssuerOnly(string memory url, bool mintOnce_) public{
        token = new ERC5484UpgradableMock(
            "SBT Name",
            "SBT",
            IERC5484.BurnAuth.Both,
            mintOnce_,
            address(this)
        );

        token.safeMint(alice, url);
        token.safeMint(bob, url);
        assertEq(token.totalSupply(), 2);

        // must pass since it can be burn by owner
        vm.prank(alice);
        token.burn(0);
        assertEq(token.totalSupply(), 1);

        // must pass since it can be burn by issuer
        vm.prank(address(this));
        token.burn(1);
        assertEq(token.totalSupply(), 0);
    }

    function getErrorMessage(address account, bytes32 role) private pure returns (string memory) {
        return string(
            abi.encodePacked(
                "AccessControl: account ",
                StringsUpgradeable.toHexString(account),
                " is missing role ",
                StringsUpgradeable.toHexString(uint256(role), 32)
            )
        );
    }
}