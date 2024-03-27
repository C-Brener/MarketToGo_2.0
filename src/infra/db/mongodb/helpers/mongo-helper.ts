import { type Collection, MongoClient } from 'mongodb'
export const MongoHelper = {
  client: MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    console.log(`Testando ${global.__MONGO_URI__ as string}`)
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutID } = collection
    return Object.assign({}, collectionWithoutID, { id: _id })
  }

}
