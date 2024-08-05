import { toStringNumberFromDecimals } from '@/shared/web3'

export enum FractionPartView {
  GREATER_SIGN,
  DOTS,
  CUT,
}

export interface CompactNumberParams {
  threshold?: bigint
  fractionDigits?: number
  fractionPartView?: FractionPartView
  locale?: string
}

/**
 * Returns formatted value with compact notation if it's greater then {@link threshold}.
 * @param value The value to format.
 * @param decimals The decimals of the value.
 * @param params
 * @param params.threshold If the value exceeds this {@link threshold}, it will be compacted.
 * @param params.fractionDigits Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
 * @param params.fractionPartView The type of small number compaction.
 * @param params.locale The locale that is used for formatting.
 * @returns Formatted value.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export function formatNumberCompactWithThreshold(
  value: bigint,
  decimals: number,
  {
    threshold = 0n,
    fractionDigits = 0,
    fractionPartView = FractionPartView.CUT,
    locale,
  }: CompactNumberParams = {}): { raw: string; result: string } {
  const stringNumber = toStringNumberFromDecimals(value, decimals)

  if (threshold > 0n && value > threshold)
    return { raw: stringNumber, result: formatNumberCompact(Number.parseFloat(stringNumber), locale) }

  const [integerPart, fractionPart] = String(stringNumber).split('.')

  // TODO: @sergey refactor this, cognitive-complexity exists for reason
  if (stringNumber.replace(/\.0$/, '').includes('.') && fractionDigits > 0) {
    const index = stringNumber.indexOf('.')
    const capped = stringNumber.substring(0, index + 1 + fractionDigits)
    const lengthDifference = stringNumber.length - capped.length

    switch (fractionPartView) {
      case FractionPartView.GREATER_SIGN:
        return { raw: stringNumber, result: lengthDifference > 0 ? `>${capped}` : stringNumber }
      case FractionPartView.DOTS: {
        if (lengthDifference > 1)
          return { raw: stringNumber, result: `${capped}..${stringNumber.slice(-1)}` }

        // The length difference is 1 digit only, so we can return source value in this case.
        if (lengthDifference === 1)
          return { raw: stringNumber, result: stringNumber }

        return { raw: stringNumber, result: capped }
      }
      case FractionPartView.CUT: {
        if (lengthDifference === 0)
          return { raw: stringNumber, result: stringNumber }

        const digits = Math.min(fractionPart.length, fractionDigits)
        const cuttedNumber = `${integerPart}.${fractionPart.slice(0, digits)}`

        // If the actual number is small (less than specified fraction point), we should show that is not a zero after all.
        // E.g. when the actual number (value) is 0.0005, digits (fractionDigits) is 2, it will show "0.00",
        // and in this case, we can represent it like: ">0.01"
        if (+cuttedNumber === 0 && +stringNumber > 0)
          return { raw: stringNumber, result: `<0.${'0'.repeat(digits - 1)}1` }

        return { raw: stringNumber, result: cuttedNumber }
      }
    }
  }

  if (fractionPart === '0')
    return { raw: stringNumber, result: integerPart }

  return { raw: stringNumber, result: stringNumber }
}

export function formatNumberCompact(value: number, locale = 'en', maxValue = 1e16): string {
  value = Math.min(value, maxValue)
  const formatter = Intl.NumberFormat(locale, { notation: 'compact' })
  const formattedValue = formatter.format(value)
  return value === maxValue ? `>${formattedValue}` : formattedValue
}
