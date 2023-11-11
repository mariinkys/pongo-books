<template>
   <div class="d-flex">
      <div v-for="book in books">
         <NuxtLink :to="`books/` + book.id">
            <p>{{ book.title }}</p>
         </NuxtLink>
      </div>
      <div v-if="books.length === 0">
         <p class="mx-5 my-0 p-0">Nothing to see here...</p>
      </div>
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
