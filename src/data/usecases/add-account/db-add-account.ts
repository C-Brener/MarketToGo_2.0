import type { AccountModel } from '../../../domain/models/account'
import type { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import type { Encrypter } from '../../protocols/encrypter'

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
