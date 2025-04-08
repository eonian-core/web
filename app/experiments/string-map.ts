export function toStringMap(data: Record<string, string | boolean>): Record<string, string> {
  return Object.entries(data).reduce((acc, [key, value]) => {
    acc[key] = String(value)
    return acc
  }, {} as Record<string, string>)
}
