import type { HttpResponse, HttpRequest } from '../procotols/http'
import type { Controller } from '../procotols/controller'
import { MissingParamError } from '../erros/missing-param-error'
import { badRequest } from './helpers/http-helper'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'confirmPassword']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 200,
      body: { message: 'User signed' }
    }
  }
}
