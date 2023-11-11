import { getToken } from '#auth';
import prisma from '../../db/prisma';

export default defineEventHandler(async (event) => {
   const token = await getToken({ event })
   if (!token) { return setResponseStatus(event, 404) }

   const data = token.sub ?? '-1'
   const userId = +data

   const queryParams = getRouterParams(event)
   const bookId = queryParams.id

   if (!isNaN(userId) && userId != -1) {
      try {
         const book = await prisma.book.findFirst({
            where: {
               userId: {
                  equals: userId
               },
               id: {
                  equals: +bookId
               }
            }
         });
         return book
      } catch (error) {
         console.log(error)
         return setResponseStatus(event, 404)
      }
   } else {
      return setResponseStatus(event, 404)
   }
})