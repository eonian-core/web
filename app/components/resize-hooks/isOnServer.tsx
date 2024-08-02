export function isOnServer() {
  return typeof window === 'undefined'
}
