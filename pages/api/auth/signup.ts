import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/db/connectToDatabase'
import { hashPassword } from '../../../lib/auth/auth'
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

interface SignupData {
  success: boolean,
  message: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<SignupData>) => {
  await runMiddleware(req, res, cors)
  if(req.method !== 'POST') {
    return
  }

  const { email, password } = req.body

  if(!email || !email.includes('@') || !password ) {
    res.status(422).json({
      success: false,
      message: 'Invalid input!'
    })
  }

  const client: any = await connectToDatabase()
  const usersCollection = await client.db('auth').collection('users')

  const existingUser = await usersCollection.findOne({ email: email })

  if(existingUser) {
    res.status(422).json({
      success: false,
      message: 'Another account is using the same email.'
    })
    client.close()
    return
  }

  const hashedPassword = await hashPassword(password)

  const result = await usersCollection.insertOne({
    email: email,
    password: hashedPassword,
    resetToken: undefined,
    collections: []
  })

  res.status(200).json({
    success: true,
    message: 'Created User!'
  })

  client.close()

}

export default handler