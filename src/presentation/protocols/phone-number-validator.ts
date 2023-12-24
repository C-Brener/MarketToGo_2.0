export interface PhoneNumberValidator {
  isValid: (phoneNumber: string, country: string) => boolean
}
