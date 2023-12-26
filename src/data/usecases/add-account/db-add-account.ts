import type { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, repository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = repository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    const accountData = await this.addAccountRepository.add(Object.assign({}, account, { password: hashedPassword }))
    return accountData
  }
}
