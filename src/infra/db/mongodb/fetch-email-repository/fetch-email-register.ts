import type { FetchEmailRegisterRepository } from '../../../../data/protocols/fetch-email-register-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class FetchEmailRegisterMongoRepository implements FetchEmailRegisterRepository {
  async checkEmailAlreadyExist (registerEmail: string): Promise<boolean> {
    const collection = await MongoHelper.getCollection('accounts')
    const hasEmailUsed = await collection.findOne({ email: registerEmail })
    return !!hasEmailUsed
  }
}
