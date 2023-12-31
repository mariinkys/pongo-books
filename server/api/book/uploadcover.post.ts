import { getToken } from '#auth';
import crypto from "crypto";
import fs from 'fs';
import { writeFile } from 'fs/promises';
import prisma from '../../db/prisma';

export default defineEventHandler(async (event) => {
   const token = await getToken({ event })
   if (!token) { return setResponseStatus(event, 404) }

   const data = token.sub ?? '-1'
   const userId = +data

   if (!isNaN(userId) && userId != -1) {
      try {
         const files = await readMultipartFormData(event);

         if (!files || files.length === 0) {
            throw createError({
               statusCode: 400,
               statusMessage: 'Image Not Found',
            });
         }

         const bId = files[0].data.toString('ascii');

         if (files[1].name === 'file') {
            const filename = crypto.randomUUID() + "-" + files[1].filename;
            //   const mimetype = files[i].type;
            const data = files[1].data;
            const filePath = `./public/bookcovers/${filename}`;
            await writeFile(filePath, data);

            const ogBook = await prisma.book.findUnique({
               where: {
                  id: +bId
               }
            })

            //Delete old cover file if exsits
            if (ogBook && ogBook.coverPath && ogBook.coverPath.length > 0) {
               fs.unlink(`./public/bookcovers/${ogBook.coverPath}`, (err) => {
                  if (err) {
                     if (err.code === 'ENOENT') {
                        console.error('The file does not exist');
                     } else {
                        throw err
                     }
                  }
               });
            }

            await prisma.book.update({
               where: {
                  id: +bId,
               },
               data: {
                  coverPath: filename,
               },
            })
         }

         return setResponseStatus(event, 200)
      } catch (error) {
         console.log(error)
         return setResponseStatus(event, 404)
      }
   }
});