import { getToken } from '#auth';
import prisma from '../../db/prisma';

export default defineEventHandler(async (event) => {
   const token = await getToken({ event })
   if (!token) { return setResponseStatus(event, 404) }

   const data = token.sub ?? '-1'
   const userId = +data
   if (!isNaN(userId) && userId != -1) {
      try {
         const books = await prisma.book.findMany({
            where: {
               userId: {
                  equals: userId
               }
            }
         });
         return books
      } catch (error) {
         console.log(error)
         return setResponseStatus(event, 404)
      }
   } else {
      return setResponseStatus(event, 404)
   }
})