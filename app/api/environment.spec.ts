import { requireEnv } from './environment'

describe('requireEnv', () => {
  it('returns the value when it exists', () => {
    expect(requireEnv('TEST_ENV', 'test value')).toEqual('test value')
  })

  it('throws an error when the value is undefined', () => {
    expect(() => requireEnv('TEST_ENV', undefined)).toThrow(
      new Error('Environment variable "TEST_ENV" not found'),
    )
  })
})
