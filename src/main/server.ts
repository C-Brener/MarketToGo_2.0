import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import app from './config/app'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
app.listen(env.port, () => { console.log('Server is running at http://localhost:env.port')})
