import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDatabase } from "../../../lib/db/connectToDatabase";
import { verifyPassword } from "../../../lib/auth/auth";
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from "../../../lib/auth/mongodb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }), 
    CredentialsProvider({

      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = await client.db('auth').collection('users')

        const user = await usersCollection.findOne({ email: credentials.email});

        if(!user) {
          client.close()
          throw new Error('No user found!')
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )

        if(!isValid) {
          client.close()
          throw new Error('Could not log you in')
        }

        
        client.close()
        
        
        
        return { email: user.email }
      },

    }),
  ],
  pages: {
    signIn: '/auth/login'
  },
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt'
  },
  secret: process.env.JWT_SECRET

})
