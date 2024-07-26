import { checkEnvVar } from './endpoints'

describe('checkEnvVar', () => {
  it('returns the value when it exists', () => {
    expect(checkEnvVar('TEST_ENV', 'test value')).toEqual('test value')
  })

  it('throws an error when the value is undefined', () => {
    expect(() => checkEnvVar('TEST_ENV', undefined)).toThrow(
      new Error('Environment variable "TEST_ENV" not found'),
    )
  })
})
