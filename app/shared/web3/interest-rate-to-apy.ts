export function convertInterestRateToAPY(interestRatePerBlock: bigint, decimals: number, blocksPerDay: number): bigint {
  const mantissa = 10 ** decimals
  const interestRate = Number(interestRatePerBlock) / mantissa
  const dailyReward = (interestRate * blocksPerDay + 1)
  const result = (dailyReward ** 365 - 1) * mantissa
  return BigInt(result * 100)
}
