<template>
   <div class="flex gap-3">
      <div v-for="book in books">
         <div v-if="book.coverPath">
            <NuxtLink :to="`books/` + book.id"><img :src="'/bookcovers/' + book.coverPath" alt="Book Cover" width="150"
                  height="200" class="rounded-lg shadow-lg" /></NuxtLink>
         </div>
         <div v-else>
            <NuxtLink :to="`books/` + book.id"><img src="/fallbackcover.png" alt="Fallback Book Cover" width="150"
                  height="200" class="rounded-lg shadow-lg" /></NuxtLink>
         </div>
         <p class="text-center m-0 p-0">{{ book.title.slice(0, 13) }}...</p>
      </div>
   </div>
   <div v-if="books.length === 0">
      <p class="mx-5 my-0 p-0">Nothing to see here...</p>
   </div>
</template>

<script lang="ts">
import axios from 'axios'
import type { BookModel } from '@/server/models/book'

export default {
   mounted() {
      axios.get(`/api/book`)
         .then(res => {
            if (res.status == 200) {
               this.books = res.data
            } else {
               this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
            }
         })
   },
   data() {
      return {
         books: ref<BookModel[]>([])
      }
   }
}
</script>
