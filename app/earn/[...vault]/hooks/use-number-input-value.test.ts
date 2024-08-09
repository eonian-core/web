import type { ValueParseResult } from './use-number-input-value'
import { parseBigIntValue, parseValue } from './use-number-input-value'

describe('parseValue', () => {
  const validData: [string, ValueParseResult, number][] = [
    ['1.0', { value: 10n ** 18n, displayValue: '1.0' }, 18],
    ['1', { value: 10n ** 18n, displayValue: '1' }, 18],
    ['5.0', { value: 5n * 10n ** 9n, displayValue: '5.0' }, 9],
    ['5', { value: 5n * 10n ** 9n, displayValue: '5' }, 9],
    ['0.1234', { value: 1234n * 10n ** 5n, displayValue: '0.1234' }, 9],
  ]
  it.each(validData)('Should parse valid input', (input, result, decimals) => {
    const values = parseValue(input, decimals)
    expect(values).toEqual(result)
  })
})

describe('parseBigIntValue', () => {
  const validData: [bigint, ValueParseResult, number][] = [
    [10n ** 18n, { value: 10n ** 18n, displayValue: '1' }, 18],
    [10n ** 18n + 25n * 10n ** 16n, { value: 10n ** 18n + 25n * 10n ** 16n, displayValue: '1.25' }, 18],
    [5n * 10n ** 9n, { value: 5n * 10n ** 9n, displayValue: '5' }, 9],
    [5n * 10n ** 9n + 5n * 10n ** 8n, { value: 5n * 10n ** 9n + 5n * 10n ** 8n, displayValue: '5.5' }, 9],
    [12345n, { value: 12345n, displayValue: '0.000012345' }, 9],
    [12345n, { value: 12345n, displayValue: '0.000000000000012345' }, 18],
    [1234567891011n, { value: 1234567891011n, displayValue: '0.000001234567891011' }, 18],
    [9300000000000000001n, { value: 9300000000000000001n, displayValue: '9.300000000000000001' }, 18],
  ]
  it.each(validData)('Should parse valid input', (input, result, decimals) => {
    const values = parseBigIntValue(input, decimals)
    expect(values).toEqual(result)
  })
})
