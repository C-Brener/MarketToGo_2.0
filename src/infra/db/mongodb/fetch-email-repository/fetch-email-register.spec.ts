import type { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
import { FetchEmailRegisterMongoRepository } from './fetch-email-register'

describe('FetchEmailRegisterMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__ as string)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const mockAddAccount: AddAccountModel = {
      name: 'John Doe',
      email: 'test@example.com',
      password: 'securePassword123',
      phoneNumber: '+1234567890'
    }
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.insertOne(mockAddAccount)
  })

  test('should return true if email already exists', async () => {
    const sut = new FetchEmailRegisterMongoRepository()
    const exists = await sut.checkEmailAlreadyExist('test@example.com')
    expect(exists).toBe(true)
  })

  test('should return false if email does not exists', async () => {
    const sut = new FetchEmailRegisterMongoRepository()
    const exists = await sut.checkEmailAlreadyExist('test1@example.com')
    expect(exists).toBe(false)
  })
})
