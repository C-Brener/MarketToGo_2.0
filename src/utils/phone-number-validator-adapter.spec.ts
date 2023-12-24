import { isValidPhoneNumber } from 'libphonenumber-js'
import type { PhoneNumberValidator } from '../presentation/protocols/phone-number-validator'
import { PhoneNumberAdapter } from './phone-number-validator-adapter'

jest.mock('libphonenumber-js', () => ({
  isValidPhoneNumber: jest.fn()
}))

const makeSut = (): PhoneNumberValidator => {
  return new PhoneNumberAdapter()
}

describe('PhoneNumberValidator', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should phoneNumber returns true when isValid return true', () => {
    (isValidPhoneNumber as jest.Mock).mockReturnValue(true)

    const sut = makeSut()

    const isValid = sut.isValid('7199999999', 'BR')

    expect(isValid).toBe(true)
  })

  test('Should phoneNumber returns false when isValid return false', () => {
    (isValidPhoneNumber as jest.Mock).mockReturnValue(false)

    const sut = makeSut()

    const isValid = sut.isValid('7199999999', 'BR')

    expect(isValid).toBe(false)
  })

  test('Should phoneNumber returns true when isValid recieve the correct information', () => {
    const validNumber = '7199999999'
    const sut = makeSut()

    sut.isValid(validNumber, 'BR')

    expect(isValidPhoneNumber).toHaveBeenCalledWith(validNumber, 'BR')
  })
})
