import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../lib/db/connectToDatabase'
import { hashPassword } from '../../../../lib/auth/auth'
import { ObjectId } from 'mongodb'

const jwt = require('jsonwebtoken')

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'POST') {
    return
  }

  const { token } = req.query
  const { password, confirmedPassword } = req.body

  if(!password || !confirmedPassword) {
    res.status(422).json({
      success: false,
      message: 'Invalid input!'
    })
  }

  if(password !== confirmedPassword ) {
    res.status(400).json({
      success: false,
      message: 'Passwords do not match'
    })
    return
  }
  
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

  const client: any = await connectToDatabase()
  const db = await client.db('auth')
  const usersCollection = await db.collection('users')
  const user = await usersCollection.findOne({ _id: new ObjectId(decodedToken._id)})
  
  if(!user) {
    res.status(422).json({
      success: false,
      message: 'No user found!'
    })
  }

  const newPassword = await hashPassword(password)

  const updatedUser = await usersCollection.updateMany({ email: user.email }, { $set: {
    password: newPassword,
    resetToken: null
  }})
  


  res.status(200).json({
    success: true,
    message: 'Password changed'
  })

}

export default handler