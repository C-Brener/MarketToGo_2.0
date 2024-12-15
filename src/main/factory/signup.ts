import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { PhoneNumberAdapter } from '../../utils/phone-number-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { FetchEmailRegisterMongoRepository } from '../../infra/db/mongodb/fetch-email-repository/fetch-email-register'
import { DbFetchEmailRegister } from '../../data/usecases/check-email-register/db-fetch-email-register'
import type { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const phoneValidatorAdapter = new PhoneNumberAdapter()
  const bcrypt = new BcryptAdapter(salt)
  const repository = new AccountMongoRepository()
  const fetchEmailRepository = new FetchEmailRegisterMongoRepository()
  const dbCheckEmail = new DbFetchEmailRegister(fetchEmailRepository)
  const dbAddAccount = new DbAddAccount(bcrypt, repository)
  const signupController = new SignUpController(emailValidatorAdapter, phoneValidatorAdapter, dbCheckEmail, dbAddAccount)
  return new LoggerControllerDecorator(signupController)
}

class LoggerControllerDecorator implements Controller {
  private readonly controller: Controller
  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    return httpResponse
  }
}
