import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  createMockedFunction,
  afterEach,
} from "matchstick-as/assembly/index"
import { Address, ethereum, BigInt } from "@graphprotocol/graph-ts"
import { AdminChanged } from "../generated/schema"
import { AdminChanged as AdminChangedEvent } from "../generated/Vault/Vault"
import { handleAdminChanged, handleUpgraded } from "../src/vault"
import { createAdminChangedEvent, createUpgradedEvent } from "./vault-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

// Hardcoded in matchstic but not exported :(
// can cause failed tests if will be changed in library
const defaultAddress = Address.fromString("0xA16081F360e3847006dB660bae1c6d1b2e17eC2A");
const vaultAddress = defaultAddress.toHexString()

function mockViewFunction(contractAddress: Address, name: string, resultType: string, resultValue: ethereum.Value[]): void {
  createMockedFunction(contractAddress, name, name + "():(" + resultType + ")")
    .withArgs([])
    .returns(resultValue)
}

function mockVault(): void {
  // Mock the contract call for getting the name
  mockViewFunction(defaultAddress, "name", "string", [ethereum.Value.fromString("USDT Vault")])
  // Mock the contract call for getting the symbol
  mockViewFunction(defaultAddress, "symbol", "string", [ethereum.Value.fromString("eonUSDT")])
  // Mock the contract call for getting the version
  mockViewFunction(defaultAddress, "version", "string", [ethereum.Value.fromString("0.1.0")])
  // Mock the contract call for getting the decimals
  mockViewFunction(defaultAddress, "decimals", "uint8", [ethereum.Value.fromI32(18)])
  // Mock the contract call for getting the totalSupply
  mockViewFunction(defaultAddress, "totalSupply", "uint256", [ethereum.Value.fromSignedBigInt(BigInt.fromString('100000000000000000000'))])
  // Mock the contract call for getting the totalDebt
  mockViewFunction(defaultAddress, "totalDebt", "uint256", [ethereum.Value.fromSignedBigInt(BigInt.fromString('50000000000000000000'))])
  // Mock the contract call for getting the MAX_BPS
  mockViewFunction(defaultAddress, "MAX_BPS", "uint256", [ethereum.Value.fromSignedBigInt(BigInt.fromI64(10000))])
  // Mock the contract call for getting the debtRatio
  mockViewFunction(defaultAddress, "debtRatio", "uint256", [ethereum.Value.fromSignedBigInt(BigInt.fromI64(5000))])
  // Mock the contract call for getting the lastReportTimestamp
  mockViewFunction(defaultAddress, "lastReportTimestamp", "uint256", [ethereum.Value.fromSignedBigInt(BigInt.fromI64(123))])

}

// TODO: try to use test invariant
function testVault(): void {
  assert.fieldEquals("Vault", vaultAddress, "name", "USDT Vault")
  assert.fieldEquals("Vault", vaultAddress, "symbol", "eonUSDT")
  assert.fieldEquals("Vault", vaultAddress, "version", "0.1.0")
  assert.fieldEquals("Vault", vaultAddress, "decimals", "18")
  assert.fieldEquals("Vault", vaultAddress, "totalSupply", "100")
  assert.fieldEquals("Vault", vaultAddress, "totalDebt", "50000000000000000000")
  assert.fieldEquals("Vault", vaultAddress, "maxBps", "10000")
  assert.fieldEquals("Vault", vaultAddress, "debtRatio", "0.5")
  assert.fieldEquals("Vault", vaultAddress, "lastReportTimestamp", "123");

}

describe("AdminChanged", () => {
  beforeAll(() => {
    mockVault()
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("created and stored", () => {
    let previousAdmin = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAdmin = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )

    let newAdminChangedEvent = createAdminChangedEvent(previousAdmin, newAdmin)
    handleAdminChanged(newAdminChangedEvent)

    assert.entityCount("AdminChanged", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AdminChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "previousAdmin",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AdminChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "newAdmin",
      "0x0000000000000000000000000000000000000001"
    )

    // must be inside test block
    testVault();

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

describe("Upgraded", () => {
  beforeAll(() => {
    mockVault()
  })

  afterAll(() => {
    clearStore()
  })

  test("event created and stored correctly", () => {
    let implementationAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )

    let newUpgradedEvent = createUpgradedEvent(implementationAddress)

    handleUpgraded(newUpgradedEvent)

    assert.entityCount("Upgraded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Upgraded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "implementation",
      "0x0000000000000000000000000000000000000001"
    )

    assert.fieldEquals(
      "Upgraded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "version",
      "0.1.0"
    )

    // must be inside test block
    testVault();
  })
})