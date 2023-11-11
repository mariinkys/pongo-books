import { Book } from "@prisma/client";

export type BookModel = {
   id: number | null,
   title: string,
   coverPath: string | undefined,
   //authors
   pages: number | undefined,
   //publishingHouse?
   publicationYear: string | undefined,
   isbn: string | undefined,
   startDate: Date | undefined,
   endDate: Date | undefined,
   reRead: boolean,
   timesRead: number | undefined,
   generalScore: number | undefined,
   //customRatings
   review: string | undefined,
   readOn: string | undefined,
   favouriteCharacter: string | undefined,
   //user?
   userId: number
}

// Function to map Prisma result to BookModel
export function mapPrismaToBookModel(prismaBook: Book): BookModel {
   return {
      id: prismaBook.id,
      title: prismaBook.title,
      coverPath: prismaBook.coverPath ?? '',
      pages: prismaBook.pages ?? 0,
      publicationYear: prismaBook.publicationYear ?? 'Unknown',
      isbn: prismaBook.isbn ?? 'Unknown',
      startDate: prismaBook.startDate ?? new Date(),
      endDate: prismaBook.endDate ?? new Date(),
      reRead: prismaBook.reRead ?? false,
      timesRead: prismaBook.timesRead ?? 0,
      generalScore: prismaBook.generalScore ?? 0,
      review: prismaBook.review ?? 'Unknown',
      readOn: prismaBook.readOn ?? 'Unknown',
      favouriteCharacter: prismaBook.favouriteCharacter ?? 'Unknown',
      userId: prismaBook.userId
   };
}