import { Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'
import prisma from './../db/prisma'

export default defineEventHandler(async (event) => {
   const data = await readBody(event)
   const body = data.body
   if (validateRegisterBody(body)) {
      try {
         const hash = bcrypt.hashSync(body.password, 12);
         const user = await prisma.user.create({
            data: {
               username: body.username,
               mail: body.mail,
               name: body.username,
               password: hash
            },
         })
         user.password = ''
         return user
      } catch (error) {
         if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === 'P2002') {
               console.log(
                  'Username or email already taken!'
               )
               return null
            }
         }
         console.log(error)
         return null
      }
   }
})

function validateRegisterBody(body: any): boolean {
   if (body.username.length <= 0 || body.username == null) {
      return false
   }
   if (body.mail.length <= 0 || body.mail == null) {
      return false
   }
   if (body.password.length <= 0 || body.password == null) {
      return false
   }
   if (body.repeatpassword.length <= 0 || body.repeatpassword == null) {
      return false
   }
   if (body.password !== body.repeatpassword) {
      return false
   }
   return true
}