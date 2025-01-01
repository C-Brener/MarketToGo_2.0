import type { AddAccountModel } from '../../../domain/models/add_account'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { SignUpController } from './signup'
import type { AccountModel, AddAccount, EmailValidator, FetchEmailRegister, HttpRequest, PhoneNumberValidator } from './signup-protocols'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makePhoneNumberValidator = (): PhoneNumberValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (phoneNumber: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAcountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: account.name,
        email: account.email,
        password: account.password,
        phoneNumber: account.phoneNumber
      }
      return new Promise(resolve => { resolve(fakeAccount) })
    }
  }
  return new AddAcountStub()
}

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'valid_password',
      confirmPassword: 'valid_password',
      phoneNumber: '719999999'
    }
  }
}

const makeCheckEmailRegister = (): FetchEmailRegister => {
  class FetchEmailRegisterStub implements FetchEmailRegister {
    async checkEmailAlreadyExist (email: string): Promise<boolean> {
      const checkEmail = email === 'teste@teste.com'
      return new Promise(resolve => { resolve(checkEmail) })
    }
  }
  return new FetchEmailRegisterStub()
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  phoneNumberValidatorStub: PhoneNumberValidator
  checkEmailRegisterStub: FetchEmailRegister
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const phoneNumberValidatorStub = makePhoneNumberValidator()
  const addAccountStub = makeAddAccount()
  const checkEmailRegisterStub = makeCheckEmailRegister()
  const sut = new SignUpController(emailValidatorStub, phoneNumberValidatorStub, checkEmailRegisterStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    phoneNumberValidatorStub,
    checkEmailRegisterStub,
    addAccountStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any@gmail.com',
        password: 'any_password',
        confirmPassword: 'any_confirm_password',
        phoneNumber: '719999999'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        confirmPassword: 'any_confirm_password',
        phoneNumber: '719999999'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no phoneNumber is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@gmail.com',
        password: 'any_password',
        confirmPassword: 'any_confirm_password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('phoneNumber')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@gmail.com',
        confirmPassword: 'any_confirm_password',
        phoneNumber: '719999999'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if no confirmation password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@gmail.com',
        password: 'any_password',
        phoneNumber: '719999999'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('confirmPassword')))
  })

  test('Should return 400 if passwordConfirmation failed', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@gmail.com',
        password: 'any_password',
        confirmPassword: 'invalid_passaword',
        phoneNumber: '719999999'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new InvalidParamError('confirmPassword')))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    // GIVEN
    const { sut, emailValidatorStub } = makeSut()
    // WHEN
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = makeFakeRequest()
    const response = await sut.handle(httpRequest)

    // THEN
    expect(response).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should call emailValidator with correct email', async () => {
    // GIVEN
    const { sut, emailValidatorStub } = makeSut()
    // WHEN
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@gmail.com',
        password: 'any_password',
        confirmPassword: 'any_password',
        phoneNumber: '719999999'
      }
    }
    await sut.handle(httpRequest)

    // THEN
    expect(isValidSpy).toHaveBeenCalledWith('any@gmail.com')
  })

  test('Should return 500 if emailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new ServerError()
    })
    const httpRequest = makeFakeRequest()
    const response = await sut.handle(httpRequest)

    // THEN
    expect(response).toEqual(serverError(new ServerError()))
  })

  test('Should return 400 if an invalid phoneNumber is provided', async () => {
    // GIVEN
    const { sut, phoneNumberValidatorStub } = makeSut()
    // WHEN
    jest.spyOn(phoneNumberValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = makeFakeRequest()
    const response = await sut.handle(httpRequest)

    // THEN
    expect(response).toEqual(badRequest(new InvalidParamError('phoneNumber')))
  })

  test('Should return 500 if phoneNumberValidator throws error', async () => {
    // GIVEN
    const { sut, phoneNumberValidatorStub } = makeSut()
    // WHEN
    jest.spyOn(phoneNumberValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new ServerError()
    })
    const httpRequest = makeFakeRequest()
    const response = await sut.handle(httpRequest)

    // THEN
    expect(response).toEqual(serverError(new ServerError()))
  })

  test('Should call AddAccount with correct values', async () => {
    // GIVEN
    const { sut, addAccountStub } = makeSut()
    // WHEN
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    // THEN
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'valid_password',
      phoneNumber: '719999999'
    })
  })

  test('Should return 500 if addAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => { reject(new ServerError()) })
    })
    const httpRequest = makeFakeRequest()
    const response = await sut.handle(httpRequest)

    // THEN
    expect(response).toEqual(serverError(new ServerError()))
  })

  test('Should return 200 if an valid data is provided', async () => {
    // GIVEN
    const { sut } = makeSut()
    const fakeAccount = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'valid_password',
      phoneNumber: '719999999'
    }
    // WHEN
    const httpRequest = makeFakeRequest()
    const response = await sut.handle(httpRequest)

    // THEN
    expect(response).toEqual(ok(fakeAccount))
  })
})
