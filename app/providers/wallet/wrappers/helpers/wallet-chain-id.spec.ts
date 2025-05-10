import { ChainId } from './wallet-chain-id'

describe('ChainId', () => {
  it('Should transform id to hex', () => {
    expect(ChainId.toHex(ChainId.BSC_MAINNET)).toBe('0x38')
  })

  it('Should parse string', () => {
    expect(ChainId.parse('0x38')).toBe(ChainId.BSC_MAINNET)

    expect(ChainId.parse(56)).toBe(ChainId.BSC_MAINNET)

    expect(ChainId.parse('56')).toBe(ChainId.BSC_MAINNET)

    expect(ChainId.parse(1)).toBe(ChainId.UNKNOWN)
    expect(ChainId.parse('1')).toBe(ChainId.UNKNOWN)
    expect(ChainId.parse('0x1')).toBe(ChainId.UNKNOWN)
  })

  it('Should get enum by string value', () => {
    expect(ChainId.getByName('123')).toBe(ChainId.UNKNOWN)
    expect(ChainId.getByName(null)).toBe(ChainId.UNKNOWN)
    expect(ChainId.getByName('sepol')).toBe(ChainId.UNKNOWN)
    expect(ChainId.getByName('BSC_MAINNET')).toBe(ChainId.BSC_MAINNET)
    expect(ChainId.getByName('bsc_mainnet')).toBe(ChainId.BSC_MAINNET)
  })

  it('Should return name by chain id', () => {
    expect(ChainId.getName(ChainId.BSC_MAINNET)).toBe('BSC_MAINNET')
  })
})
