import { formatUSD } from './format-currency'

describe('formatUSD', () => {
  it('should format 0 as $0', () => {
    expect(formatUSD(0)).toBe('$0')
  })

  it('should format values less than 1 with 3 decimal places', () => {
    expect(formatUSD(0.312312)).toBe('$0.312')
  })

  it('should format values less than 100 with 2 decimal places', () => {
    expect(formatUSD(31.2312)).toBe('$31.23')
  })

  it('should format values less than 1000 with 1 decimal place', () => {
    expect(formatUSD(312.312)).toBe('$312.3')
  })

  it('should format values greater than or equal to 1000 with no decimal places', () => {
    expect(formatUSD(1321.232)).toBe('$1,321')
  })

  it('should format values in the thousands correctly', () => {
    expect(formatUSD(12345.6789)).toBe('$12,346')
  })

  it('should format values in the millions correctly', () => {
    expect(formatUSD(12345678.9)).toBe('$12,345,679')
  })

  it('should format values in the billions correctly', () => {
    expect(formatUSD(1234567890.12)).toBe('$1,234,567,890')
  })
})
