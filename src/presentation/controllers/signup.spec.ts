import { SignUpController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import type { EmailValidator } from '../protocols'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeEmailValidatorWithError = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      throw new ServerError()
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignUpController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any@gmail.com',
        password: 'any_password',
        confirmPassword: 'any_confirm_password',
        phoneNumber: '719999999'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        confirmPassword: 'any_confirm_password',
        phoneNumber: '719999999'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no phoneNumber is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@gmail.com',
        password: 'any_password',
        confirmPassword: 'any_confirm_password'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
  })

  test('Should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@gmail.com',
        confirmPassword: 'any_confirm_password',
        phoneNumber: '719999999'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no confirmation password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@gmail.com',
        password: 'any_password',
        phoneNumber: '719999999'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('confirmPassword'))
  })

  test('Should return 400 if an invalid email is provided', () => {
    // GIVEN
    const { sut, emailValidatorStub } = makeSut()
    // WHEN
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@gmail.com',
        password: 'any_password',
        confirmPassword: 'any_confirm_password',
        phoneNumber: '719999999'
      }
    }
    const response = sut.handle(httpRequest)

    // THEN
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call emailValidator with correct email', () => {
    // GIVEN
    const { sut, emailValidatorStub } = makeSut()
    // WHEN
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@gmail.com',
        password: 'any_password',
        confirmPassword: 'any_confirm_password',
        phoneNumber: '719999999'
      }
    }
    sut.handle(httpRequest)

    // THEN
    expect(isValidSpy).toHaveBeenCalledWith('any@gmail.com')
  })

  test('Should return 500 if emailValidator throws', () => {
    const emailValidatorStub = makeEmailValidatorWithError()
    const sut = new SignUpController(emailValidatorStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@gmail.com',
        password: 'any_password',
        confirmPassword: 'any_confirm_password',
        phoneNumber: '719999999'
      }
    }
    const response = sut.handle(httpRequest)

    // THEN
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })
})
