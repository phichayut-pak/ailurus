import type { NextApiRequest, NextApiResponse } from 'next'
const nodemailer = require('nodemailer')
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

type ContactUsData = {
  success: boolean,
  message: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ContactUsData>) => {
  runMiddleware(req, res, cors)
  if(req.method !== 'POST') {
    return
  }

  const { name, email: emailGiven, message } = req.body
  if(!name || !emailGiven || !message) {
    res.status(400).json({
      success: false,
      message: 'Invalid input!'
    })
  }

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
    to: 'ailurus0614@gmail.com',
    subject: name,
    text: `
    From email: ${emailGiven}
    Message: ${message}
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
        message: `Email sent: ${info.response}`
      })
    }


  })  
  
  



}

export default handler