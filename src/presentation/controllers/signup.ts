import type { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from './helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'phoneNumber']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (httpRequest.body.password !== httpRequest.body.confirmPassword) {
        return badRequest(new InvalidParamError('confirmPassword'))
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email as string)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
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
