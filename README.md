# Pongo Books

My first Nuxt project. A simple Nuxt application to manage your book collection, give ratings and such. 

## Tech Stack

- [Nuxt](https://nuxt.com/)
- [Bun](https://bun.sh/)
- [Prisma](https://www.prisma.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [PrimeVue](https://primevue.org/)

For authentication I'm using
- [Sidebase/nuxt-auth](https://sidebase.io/nuxt-auth/getting-started)

## UI

### Login & Register Page

![Login Page](https://i.imgur.com/5RDlcHz.png)

Simple login page, nothing special.

### Home Page

![Home Page](https://i.imgur.com/zxHyRlE.png)

On the home page, you can see a row with all the books that you have added, they show in a "Netflix" style row with the covers. Books that have no cover image will show a fallback image.

### New Book Page

![Add Book Page](https://i.imgur.com/AmczZBA.png)

By default, editing is disabled. You can toggle between editing and non-editing mode, once editing, you can change all the fields and the book cover. When you upload a new cover, the old one is removed.