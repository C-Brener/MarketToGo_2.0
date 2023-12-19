import type { AccountModel } from '../models/account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
  phoneNumber: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => AccountModel
}
