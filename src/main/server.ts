import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import dotenv from 'dotenv'

dotenv.config()
MongoHelper.connect(`${process.env.MONGO_URL}`).then(async () => {
  const app = (await import('./config/app')).default
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
    console.log(`Mongo is ${process.env.MONGO_URL}`)
  })
}).catch(console.error)
