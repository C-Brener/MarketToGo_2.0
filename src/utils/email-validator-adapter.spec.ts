import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))
const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}
describe('EvailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()

    const isValid = sut.isValid('valid_email@mail.com')

    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const validEmail = 'valid_email@mail.com'
    const sut = makeSut()
    const isEmailCaptured = jest.spyOn(validator, 'isEmail')
    sut.isValid(validEmail)
    expect(isEmailCaptured).toHaveBeenCalledWith(validEmail)
  })
})
