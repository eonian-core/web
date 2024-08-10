export function formatPercent(percent: number) {
  const prefix = percent > 0 ? '+' : '-'
  const absolute = Math.abs(percent)
  if (absolute < 0.0001) {
    return {
      percent: `~${prefix}0.0001%`,
      prefix,
    }
  }

  if (absolute < 0.01) {
    return {
      percent: `${prefix}${absolute.toFixed(4)}%`,
      prefix,
    }
  }

  const decimal = getDecimal(absolute)
  if (decimal === 0 || absolute > 10) {
    // will skip decimal part if it not exists or number is greater than 10
    return {
      percent: `${prefix}${absolute.toFixed(0)}%`,
      prefix,
    }
  }

  return {
    percent: `${prefix}${absolute.toFixed(2)}%`,
    prefix,
  }
}

/** get decimal part of number */
export function getDecimal(n: number) {
  return n % 1
}
