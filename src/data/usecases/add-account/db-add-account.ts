import type { AccountModel, AddAccount, AddAccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountDataMock = {
      id: 'id_valid',
      ...account
    }
    await this.encrypter.encrypt(accountDataMock.password)
    return new Promise(resolve => { resolve(accountDataMock) })
  }
}
