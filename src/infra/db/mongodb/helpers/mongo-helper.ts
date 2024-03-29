import { type Collection, MongoClient } from 'mongodb'
export const MongoHelper = {
  client: MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(global.__MONGO_URI__ as string)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}
