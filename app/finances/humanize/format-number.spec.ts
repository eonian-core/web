import { FractionPartView, formatNumberCompactWithThreshold } from './format-number'

describe('formatNumberCompactWithThreshold', () => {
  it('Should format with fraction digits set (DOTS)', () => {
    const format = (value: bigint, fractionDigits = 0, decimals = 9) =>
      formatNumberCompactWithThreshold(value, decimals, {
        fractionDigits,
        fractionPartView: FractionPartView.DOTS,
      })

    expect(format(120000000n, 2).result).toBe('0.12')
    expect(format(120000001n, 2).result).toBe('0.12..1')
    expect(format(123456789n, 2).result).toBe('0.12..9')
    expect(format(123456789n, 3).result).toBe('0.123..9')
    expect(format(123456789n, 8).result).toBe('0.123456789')
    expect(format(123456789n, 0).result).toBe('0.123456789')

    expect(format(9999999n, 2, 7).result).toBe('0.99..9')
  })

  it('Should format with fraction digits set (G)', () => {
    const format = (value: bigint, fractionDigits = 0, decimals = 9) =>
      formatNumberCompactWithThreshold(value, decimals, {
        fractionDigits,
        fractionPartView: FractionPartView.GREATER_SIGN,
      })

    expect(format(120000000n, 2).result).toBe('0.12')
    expect(format(120000001n, 2).result).toBe('>0.12')
    expect(format(123456789n, 2).result).toBe('>0.12')
    expect(format(123456789n, 3).result).toBe('>0.123')
    expect(format(123456789n, 8).result).toBe('>0.12345678')
    expect(format(123456789n, 0).result).toBe('0.123456789')

    expect(format(9999999n, 2, 7).result).toBe('>0.99')
  })

  it('Should format with fraction digits set (CUT)', () => {
    const format = (value: bigint, fractionDigits = 0, decimals = 9) =>
      formatNumberCompactWithThreshold(value, decimals, {
        fractionDigits,
        fractionPartView: FractionPartView.CUT,
      })

    expect(format(120000000n, 2).result).toBe('0.12')
    expect(format(120000000n, 4).result).toBe('0.12')
    expect(format(120000001n, 2).result).toBe('0.12')
    expect(format(123456789n, 2).result).toBe('0.12')
    expect(format(123456789n, 3).result).toBe('0.123')
    expect(format(123456789n, 8).result).toBe('0.12345678')
    expect(format(123456789n, 0).result).toBe('0.123456789')

    expect(format(9999999n, 2, 7).result).toBe('0.99')

    expect(format(12000000n, 2).result).toBe('0.01')
    expect(format(22000000n, 2).result).toBe('0.02')
    expect(format(1200000n, 2).result).toBe('<0.01')
    expect(format(2200000n, 2).result).toBe('<0.01')
  })

  it('Should format value', () => {
    const format = (value: bigint) => formatNumberCompactWithThreshold(value, 9)
    const getValue = (value: number) => BigInt(value) * 10n ** BigInt(9)

    expect(format(getValue(1e3)).result).toBe('1000')
    expect(format(getValue(1e5)).result).toBe('100000')
    expect(format(getValue(1e6)).result).toBe('1000000')
    expect(format(getValue(1e8)).result).toBe('100000000')
    expect(format(getValue(1e9)).result).toBe('1000000000')
    expect(format(getValue(1e11)).result).toBe('100000000000')
    expect(format(getValue(1e12)).result).toBe('1000000000000')
    expect(format(getValue(1e14)).result).toBe('100000000000000')
  })

  it('Should format value with threshold', () => {
    const getValue = (value: number) => BigInt(value) * 10n ** BigInt(9)
    const format = (value: bigint) =>
      formatNumberCompactWithThreshold(value, 9, {
        threshold: getValue(1e6),
      })

    expect(format(getValue(1e3)).result).toBe('1000')
    expect(format(getValue(1e5)).result).toBe('100000')
    expect(format(getValue(1e6)).result).toBe('1000000')
    expect(format(getValue(1e8)).result).toBe('100M')
    expect(format(getValue(1e9)).result).toBe('1B')
    expect(format(getValue(1e11)).result).toBe('100B')
    expect(format(getValue(1e12)).result).toBe('1T')
    expect(format(getValue(1e14)).result).toBe('100T')
  })

  it('Should format value with threshold and cap decimal part', () => {
    const getValue = (value: number) => BigInt(value) * 10n ** BigInt(9)
    const format = (value: bigint) =>
      formatNumberCompactWithThreshold(value, 9, {
        threshold: getValue(1e5),
        fractionDigits: 2,
      })

    expect(format(100123400000n).result).toBe('100.12')
    expect(format(100666000000n).result).toBe('100.66')
    expect(format(getValue(1e6)).result).toBe('1M')
    expect(format(2000000513200000n).result).toBe('2M')
  })
})
