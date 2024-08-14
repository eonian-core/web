export class Cacher<T> {
  private cache: { [key: string]: T } = {}

  withCache(func: (key: string) => T) {
    return (key: string): T => {
      if (this.cache[key])
        return this.cache[key]

      return (this.cache[key] = func(key))
    }
  }
}
