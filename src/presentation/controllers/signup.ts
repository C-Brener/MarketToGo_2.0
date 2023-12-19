import type { Controller, EmailValidator, HttpRequest, HttpResponse, PhoneNumberValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from './helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly phoneNumberValidator: PhoneNumberValidator

  constructor (emailValidator: EmailValidator, phoneNumberValidator: PhoneNumberValidator) {
    this.emailValidator = emailValidator
    this.phoneNumberValidator = phoneNumberValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'phoneNumber']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, confirmPassword, phoneNumber } = httpRequest.body
      if (password !== confirmPassword) {
        return badRequest(new InvalidParamError('confirmPassword'))
      }

      const isValidEmail = this.emailValidator.isValid(email as string)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const isValidPhoneNumber = this.phoneNumberValidator.isValid(phoneNumber as string)
      if (!isValidPhoneNumber) {
        return badRequest(new InvalidParamError('phoneNumber'))
      }

      return {
        statusCode: 200,
        body: { message: 'User signed' }
      }
    } catch (error) {
      return serverError()
    }
  }
}
