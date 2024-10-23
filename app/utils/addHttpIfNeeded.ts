export function addHttpIfNeed(url: string): string {
  if (url.startsWith('http'))
    return url

  return `https://${url}`
}
