export interface YAxisDomainOptions {
  kMin?: number
  kMax?: number
}

export function calcYAxisDomain({ kMin = 10, kMax = 10 }: YAxisDomainOptions = {}) {
  return ([dataMin, dataMax]: [number, number]): [number, number] => {
    const diff = dataMax - dataMin

    const min = dataMin - diff / kMin
    const max = dataMax + diff / kMax

    return [min, max]
  }
}
