import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { SignInController } from './signin'

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = new SignInController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
