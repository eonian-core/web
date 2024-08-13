import { formatPercent, getDecimal } from './format-persent'

describe('formatPercent', () => {
  it('should return ~+0.0001% for numbers less than 0.0001', () => {
    const result = formatPercent(0.00001)
    expect(result).toEqual({ percent: '~+0.0001%', prefix: '+' })
  })

  it('should return 4 decimal places for numbers less than 0.01', () => {
    const result = formatPercent(0.009)
    expect(result).toEqual({ percent: '+0.0090%', prefix: '+' })
  })

  it('should return no decimal places for numbers greater than 10', () => {
    const result = formatPercent(11)
    expect(result).toEqual({ percent: '+11%', prefix: '+' })
  })

  it('should return 2 decimal places for numbers between 0.01 and 10', () => {
    const result = formatPercent(1.2345)
    expect(result).toEqual({ percent: '+1.23%', prefix: '+' })
  })

  it('should handle negative numbers', () => {
    const result = formatPercent(-0.009)
    expect(result).toEqual({ percent: '-0.0090%', prefix: '-' })
  })
})

describe('getDecimal', () => {
  it('should return 0 for integer numbers', () => {
    const result = getDecimal(10)
    expect(result).toBe(0)
  })

  it('should return decimal part for decimal numbers', () => {
    const result = getDecimal(10.1234)
    expect(result).toBeCloseTo(0.1234)
  })

  it('should handle negative numbers', () => {
    const result = getDecimal(-10.1234)
    expect(result).toBeCloseTo(-0.1234)
  })
})
