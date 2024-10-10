import { describe, expect, it } from '@jest/globals'
import { isVaultPageReg } from './events'

describe('is vault page regex', () => {
  it('should match valid paths', () => {
    expect(isVaultPageReg.test('/earn/bsc_mainnet/eonUSDT')).toBe(true)
    expect(isVaultPageReg.test('/earn/bsc_mainnet/InsuredETH')).toBe(true)
    expect(isVaultPageReg.test('/earn/seppolia/eonBNB')).toBe(true)
  })

  it('should not match invalid paths', () => {
    expect(isVaultPageReg.test('/earn')).toBe(false)
    expect(isVaultPageReg.test('/earn/')).toBe(false)
  })
})
