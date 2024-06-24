import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { PhoneNumberAdapter } from '../../utils/phone-number-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const phoneValidatorAdapter = new PhoneNumberAdapter()
  const bcrypt = new BcryptAdapter(salt)
  const repository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcrypt, repository)
  return new SignUpController(emailValidatorAdapter, phoneValidatorAdapter, dbAddAccount)
}
