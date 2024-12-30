import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import type { Controller, HttpRequest, HttpResponse } from '../../protocols'
import type { EmailValidator } from '../signup/signup-protocols'

export class SignInController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!password) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }

    const isValidEmail = this.emailValidator.isValid(email as string)
    if (!isValidEmail) {
      return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
    }

    return new Promise(resolve => resolve(ok('')))
  }
}
