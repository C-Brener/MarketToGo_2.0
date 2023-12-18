import type { HttpResponse, HttpRequest } from '../procotols/http'
import type { Controller } from '../procotols/controller'
import { MissingParamError } from '../erros/missing-param-error'
import { badRequest } from './helpers/http-helper'
import type { EmailValidator } from '../procotols/email-validator'
import { InvalidParamError } from '../erros/invalid-param-error'
import { ServerError } from '../erros/server-error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
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
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
