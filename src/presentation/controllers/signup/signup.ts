import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import type {
  Controller,
  EmailValidator,
  PhoneNumberValidator,
  AddAccount,
  HttpRequest,
  HttpResponse
} from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly phoneNumberValidator: PhoneNumberValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, phoneNumberValidator: PhoneNumberValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.phoneNumberValidator = phoneNumberValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'phoneNumber']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, confirmPassword, phoneNumber } = httpRequest.body
      if (password !== confirmPassword) {
        return badRequest(new InvalidParamError('confirmPassword'))
      }

      const isValidEmail = this.emailValidator.isValid(email as string)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const isValidPhoneNumber = this.phoneNumberValidator.isValid(phoneNumber as string, 'BR')
      if (!isValidPhoneNumber) {
        return badRequest(new InvalidParamError('phoneNumber'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
        phoneNumber
      })
      return ok(account)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
