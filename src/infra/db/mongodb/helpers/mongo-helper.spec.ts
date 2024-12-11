import { MongoHelper as sut } from './mongo-helper'

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(`${process.env.MONGO_URL}`)
  })
  afterAll(async () => {
    await sut.disconnect()
  })
  test('Should reconnect if mondb is', async () => {
    const accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
