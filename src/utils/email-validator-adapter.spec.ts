import { EmailValidatorAdapter } from './email-validator'

describe('EvailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()

    const isValid = sut.isValid('ivalid_email@mail.com')

    expect(isValid).toBe(false)
  })
})
