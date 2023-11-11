import { getServerSession } from '#auth';
import prisma from '../../db/prisma';

export default defineEventHandler(async (event) => {
   const session = await getServerSession(event)
   if (!session) {
      return setResponseStatus(event, 404)
   }

   const data = await readBody(event)
   const body = data.body

   try {
      const book = await prisma.book.create({
         data: {
            title: body.title,
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
            User: {
               connect: {
                  id: +body.userId
               }
            }
         },
      });
      return book
   } catch (error) {
      console.log(error)
      return null
   }

})