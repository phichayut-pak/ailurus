import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/db/connectToDatabase'
import Cors from 'cors'

const cors = Cors({
  methods: ['POST'],
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function 
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors)
  if(req.method !== 'POST') {
    res.status(422).json({
      success: false,
      message: 'Invalid method!'
    })
    return
  }

  const { email, title, content, enabled, image_url } = req.body

  if(!email || !email.includes('@') || !title || title.trim().length === 0 || !content || content.trim().length === 0 || !image_url) {
    res.status(422).json({
      success: false,
      message: 'Invalid input!'
    })
  }

  const client: any = await connectToDatabase()
  const db = await client.db('auth')
  const usersCollection = await db.collection('users')
  const user = await usersCollection.findOne({ email })

  if(!user) {
    client.close()
    res.status(400).json({
      success: false,
      message: 'No user found!'
    })
  }


  const collections = user.collections

  
  if(!collections) {
    const collections = []
    if(enabled) {
      collections.push({
        title,
        content,
        image_url
      })
    }
  
    if(!enabled) {
      collections.push({
        title,
        image_url
      })
    }

    const updatedUser = await usersCollection.updateOne({ email }, { $set: {
      collections
    }})

    res.status(200).json({
      success: true,
      message: 'Post created!'
    })
    
  } else {

    if(enabled) {
      collections.push({
        title,
        content,
        image_url
      })
    }

    if(!enabled) {
      collections.push({
        title,
        image_url
      })
    }

    const updatedUser = await usersCollection.updateOne({ email }, { $set: {
      collections
    }})
    

    res.status(200).json({
      success: true,
      message: 'Post created!'
    })

  }




}

export default handler