import type { HttpResponse, HttpRequest } from '../procotols/http'
import { MissingParamError } from '../erros/missing-param-error'
import { badRequest } from './helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }

    return {
      statusCode: 200,
      body: { message: 'User signed' }
    }
  }
}
