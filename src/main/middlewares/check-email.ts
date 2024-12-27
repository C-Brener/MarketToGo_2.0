import type { Request, Response, NextFunction } from 'express'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

export const checkEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.body
  try {
    const accountCollection = MongoHelper.getCollection('accounts')
    const existingUser = await accountCollection.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: 'Email Already Exist.' })
      return
    }
    next()
  } catch (error) {
    res.status(500).json({ message: 'Error to check email.' })
  }
}
