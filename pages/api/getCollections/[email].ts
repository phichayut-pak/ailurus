import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/db/connectToDatabase'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'GET') {
    return
  }

  const { email } = req.query

  if(!email) {
    res.status(422).json({
      success: false,
      message: 'Invalid input!'
    })
  }

  const client: any = await connectToDatabase()
  const db = await client.db('auth')
  const usersCollection = await db.collection('users')
  const user = await usersCollection.findOne({ email: email })

  if(!user) {
    client.close()
    res.status(400).json({
      success: false,
      message: 'No user found!'
    })
  }

  res.status(200).json({
    success: true,
    id: user._id,
    collections: user.collections
  })

  


}

export default handler