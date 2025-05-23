import React from 'react'
import { ethers } from 'ethers'

export interface NumberInputValue {
  value?: bigint
  displayValue?: string
  onValueChange: (value: string | bigint) => void
}

export function useNumberInputValue(
  defaultValue: bigint | undefined,
  decimals: number,
): NumberInputValue {
  const [value, setValue] = React.useState(defaultValue)
  const [displayValue, setDisplayValue] = React.useState(value ? bigIntToString(value, decimals) : undefined)

  React.useEffect(() => {
    setValue(defaultValue)
    setDisplayValue(defaultValue ? bigIntToString(defaultValue, decimals) : undefined)
  }, [defaultValue, decimals])

  const onValueChange = React.useCallback(
    (value: string | bigint) => {
      const isBigInt = typeof value === 'bigint'
      const values = isBigInt ? parseBigIntValue(value, decimals) : parseValue(value, decimals)
      if (!values)
        return

      const { value: newValue, displayValue } = values
      setDisplayValue(displayValue)
      setValue(newValue)
    },
    [decimals],
  )

  return { value, displayValue, onValueChange }
}

export interface ValueParseResult {
  value: bigint
  displayValue: string
}

export function parseValue(value: string, decimals: number): ValueParseResult | null {
  const newValue = normalizeValue(value)
  const isValid = validate(newValue, decimals)
  if (!isValid)
    return null

  const numberValue = Number.parseFloat(newValue)
  const isNumber = !Number.isNaN(numberValue)
  return {
    value: isNumber ? toBigIntWithDecimals(newValue, decimals) : 0n,
    displayValue: newValue,
  }
}

export function parseBigIntValue(value: bigint, decimals: number): ValueParseResult {
  return { value, displayValue: bigIntToString(value, decimals) }
}

/**
 * Converts the big integer to number (in string representation) and removes empty fraction part.
 */
function bigIntToString(value: bigint, decimals: number): string {
  return toStringNumberFromDecimals(value, decimals).replace(/\.0$/, '')
}

function normalizeValue(value: string | number): string {
  return String(value)
    .replace(/,/g, '.') // Transforms a comma to a dot.
    .replace(/^(0+)([0-9]+.*)/g, '$2') // Removes extra leading zeros from the input.
}

function validate(value: string, decimals: number): boolean {
  if (!value)
    return true

  const validators = [validateNumber, validateRange, validateFractionPartLength]
  return validators.every(validator => validator(value, decimals))
}

function validateNumber(value: string) {
  return !!value.match(/^[0-9]*\.?[0-9]*$/)
}

/**
 * Tries to cast a number to BigInt with specified decimals.
 */
function validateRange(value: string, decimals: number) {
  try {
    toBigIntWithDecimals(value, decimals)
  }
  catch {
    return false
  }
  return true
}

/**
 * Since the ending zeros in the fractional part are ignored by the range validator,
 * the length of the value can be inflated.
 * E.g. "0.01" number is invalid (if decimals = 1), but "0.01000" is considered as a valid number.
 */
function validateFractionPartLength(value: string, decimals: number) {
  const parts = value.split('.')
  if (parts.length !== 2)
    return true

  const [, fractionPart] = parts
  return !fractionPart.endsWith('0') || fractionPart.length <= decimals
}

function toBigIntWithDecimals(value: number | string, decimals: number): bigint {
  return ethers.parseUnits(value.toString(), decimals)
}

/**
 * Transforms big number with decimals to normal JavaScript number.
 * @param value The value to transform.
 * @param decimals The decimals value of the big number.
 * @returns A number value.
 */
function toStringNumberFromDecimals(value: bigint | string, decimals: number): string {
  return ethers.formatUnits(value, decimals)
}
