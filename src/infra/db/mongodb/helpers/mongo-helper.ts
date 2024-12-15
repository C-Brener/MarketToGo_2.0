import { type Collection, MongoClient } from 'mongodb'
export const MongoHelper = {
  client: MongoClient,
  uri: null as string | null,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.isConnected()) await this.connect(this.uri)
    return this.client.db().collection(name)
  },

  isConnected (): boolean {
    return !!this.client && this.client.topology?.isConnected()
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutID } = collection
    return Object.assign({}, collectionWithoutID, { id: _id })
  }

}
