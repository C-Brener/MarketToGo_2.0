import { type LogsErrorRepository } from '../../../../data/protocols/logs-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogsMongoRepository implements LogsErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
