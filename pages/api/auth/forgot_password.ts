import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/db/connectToDatabase'
import absoluteUrl from 'next-absolute-url'
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


const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors)
  if(req.method !== 'POST') {
    return
  }

  const { email } = req.body
  
  if(!email || !email.includes('@')) {
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
    res.status(422).json({
      success: false,
      message: 'No user found!'
    })
  }

  const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })


  const updatedUser = await usersCollection.updateOne({ email }, { $set: {
    resetToken
  }})

  const { origin } = absoluteUrl(req)
  const link = `${origin}/auth/reset_password/${resetToken}` //เปลี่ยนเป็น domain ได้ถ้าอยากให้มันสวย

  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY
    }
  })

  transporter.sendMail({
    from: process.env.SENDGRID_EMAIL,
    to: email,
    subject: 'เปลี่ยนรหัสผ่าน | Ailurus',
    text: `
      คลิกที่ลิงค์เพื่อเปลี่ยนรหัสผ่าน ${link}
    `
  }, (err: any, info: any) => {
    if(err) {
      res.status(400).json({
        success: false,
        message: err
      })
    } else {
      res.status(200).json({
        success: true,
        message: `Email sent: ${info.response}`,
        resetToken
      })
    }
  })



}

export default handler


