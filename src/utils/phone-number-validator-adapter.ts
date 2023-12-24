import type { PhoneNumberValidator } from '../presentation/protocols/phone-number-validator'
import { type CountryCode, isValidPhoneNumber } from 'libphonenumber-js'

export class PhoneNumberAdapter implements PhoneNumberValidator {
  isValid (phoneNumber: string, country: string): boolean {
    return isValidPhoneNumber(phoneNumber, country as CountryCode)
  }
}
