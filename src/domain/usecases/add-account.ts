import type { AccountModel } from '../models/account'
import type { AddAccountModel } from '../models/add_account'

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
