import { getToken } from '#auth';
import prisma from '../../db/prisma';

export default defineEventHandler(async (event) => {
   const token = await getToken({ event })
   if (!token) { return setResponseStatus(event, 404) }

   const userData = token.sub ?? '-1'
   const userId = +userData

   const data = await readBody(event)
   const body = data.body
   
   if (!isNaN(userId) && userId != -1 && !isNaN(body.id)) {
      try {
         const book = await prisma.book.update({
            where: {
               userId: userId,
               id: body.id,
            },
            data: {
               title: body.title,
               coverPath: body.coverPath,
               pages: +body.pages,
               publicationYear: body.publicationYear,
               isbn: body.isbn,
               startDate: body.startDate,
               endDate: body.endDate,
               reRead: body.reRead,
               timesRead: body.timesRead,
               generalScore: body.generalScore,
               review: body.review,
               readOn: body.readOn,
               favouriteCharacter: body.favouriteCharacter,
               publishingHouseId: body.publishingHouseId,
            },
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