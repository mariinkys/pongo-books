<template>
   <CustomPageTitle :text="book.title === '' ? 'New Book' : book.title" />
   <div class="max-w-5xl m-auto">
      <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
         <span class="p-float-label">
            <InputText id="title" v-model="book.title" class="w-full" required autocomplete="off"
               aria-autocomplete="none" />
            <label for="title">Title</label>
         </span>

         <span class="p-float-label">
            <InputNumber id="pages" v-model="book.pages" class="w-full" autocomplete="off" aria-autocomplete="none" />
            <label for="pages">Pages</label>
         </span>

         <span class="p-float-label">
            <InputText id="publicationYear" v-model="book.publicationYear" class="w-full" autocomplete="off"
               aria-autocomplete="none" />
            <label for="publicationYear">Publication Year</label>
         </span>

         <span class="p-float-label">
            <InputText id="isbn" v-model="book.isbn" class="w-full" autocomplete="off" aria-autocomplete="none" />
            <label for="isbn">ISBN</label>
         </span>

         <div class="flex gap-2">
            <span class="p-float-label w-full">
               <Calendar id="startDate" v-model="book.startDate" showIcon class="w-full" date-format="dd/mm/yy" />
               <label for="startDate">Start Date</label>
            </span>
            <span class="p-float-label w-full">
               <Calendar id="endDate" v-model="book.endDate" showIcon class="w-full" date-format="dd/mm/yy" />
               <label for="endDate">End Date</label>
            </span>
         </div>

         <div class="flex gap-2 justify-center">
            <ToggleButton v-model="book.reRead" on-label="Read more than once" off-label="Not read more than once" />
            <span class="p-float-label" v-if="book.reRead">
               <InputNumber id="timesRead" v-model="book.timesRead" class="w-full" autocomplete="off"
                  aria-autocomplete="none" />
               <label for="timesRead">Times Read</label>
            </span>
         </div>

         <div class="self-center text-center">
            <p class="m-0 p-1">General Score</p>
            <Rating v-model="book.generalScore" :cancel="false" :stars="10" />
         </div>

         <span class="p-float-label">
            <Textarea v-model="book.review" autoResize class="w-full" rows="5" name="review" id="review" autocomplete="off"
               aria-autocomplete="none" />
            <label for="review">Review</label>
         </span>

         <span class="p-float-label">
            <InputText id="readOn" v-model="book.readOn" class="w-full" autocomplete="off" aria-autocomplete="none" />
            <label for="readOn">Read On</label>
         </span>

         <span class="p-float-label">
            <InputText id="favouriteCharacter" v-model="book.favouriteCharacter" class="w-full" autocomplete="off"
               aria-autocomplete="none" />
            <label for="favouriteCharacter">Favourite Character</label>
         </span>

         <Button type="submit" label="Add" />
      </form>
   </div>
</template>

<script lang="ts">
import { initDefaultBook } from '~/utils/modelHelper';
import axios from 'axios'

export default {
   data() {
      return {
         book: initDefaultBook()
      };
   },
   async mounted() {
      const uId = await getUserId()
      if (uId === -1) {
         this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Could not get userId!', life: 3000 });
         await navigateTo('/home')
      } else {
         this.book.userId = uId
      }
   },
   methods: {
      validate(): any[] {
         const errors = [];
         if (!this.book.title)
            errors.push({ path: "title", message: "Required" });
         return errors;
      },
      onSubmit() {
         const body = this.book;
         if (this.validate().length === 0) {
            axios.post("/api/book", {
               body
            }).then(async res => {
               if (res.status == 200) {
                  await navigateTo("/home");
                  this.$toast.add({ severity: 'success', summary: 'Created', detail: 'New book added!', life: 3000 });
               }
               else {
                  this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               }
            }).catch(err => {
               this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               console.log(err)
            });
         } else {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Not valid!', life: 3000 });
         }
      }
   }
}
</script>