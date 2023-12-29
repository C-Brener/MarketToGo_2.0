import mongoose from 'mongoose'

export const MongoHelper = {
  client: null,
  async connect (uri: string): Promise<void> {
    this.client = await mongoose.connect(global.__MONGO_URI__ as string)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
