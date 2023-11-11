import type { BookModel } from "~/server/models/book";

export function initDefaultBook(): BookModel {
   return {
      id: null,
      title: "",
      coverPath: undefined,
      pages: 0,
      publicationYear: undefined,
      isbn: undefined,
      startDate: new Date(),
      endDate: new Date(),
      reRead: false,
      timesRead: undefined,
      generalScore: undefined,
      review: undefined,
      readOn: undefined,
      favouriteCharacter: undefined,
      userId: 0,
   };
}