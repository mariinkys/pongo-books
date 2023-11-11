<template>
   <div v-if="!loading">
      <CustomPageTitle :text="book.title === '' ? 'Editing Book' : book.title" />
      <div class="max-w-5xl m-auto">
         <div class="flex justify-end my-5">
            <ToggleButton v-model="editing" on-label="Editing" off-label="Not editing" />
         </div>
         <div v-if="book.coverPath">
            <img :src="'/bookcovers/' + book.coverPath" alt="Book Cover" width="150" height="200" />
         </div>
         <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
            <div class="flex gap-2">
               <span class="p-float-label grow">
                  <InputText id="title" v-model="book.title" class="w-full" required autocomplete="off"
                     aria-autocomplete="none" :disabled="!editing" />
                  <label for="title">Title</label>
               </span>
               <!--3mb file-size?-->
               <FileUpload mode="basic" customUpload accept="image/*" :maxFileSize="3000000" @uploader="onUpload"
                  :disabled="!editing" choose-label="Change Book Cover" show-upload-button />
            </div>

            <span class="p-float-label">
               <InputNumber id="pages" v-model="book.pages" class="w-full" autocomplete="off" aria-autocomplete="none"
                  :disabled="!editing" />
               <label for="pages">Pages</label>
            </span>

            <span class="p-float-label">
               <InputText id="publicationYear" v-model="book.publicationYear" class="w-full" autocomplete="off"
                  aria-autocomplete="none" :disabled="!editing" />
               <label for="publicationYear">Publication Year</label>
            </span>

            <span class="p-float-label">
               <InputText id="isbn" v-model="book.isbn" class="w-full" autocomplete="off" aria-autocomplete="none"
                  :disabled="!editing" />
               <label for="isbn">ISBN</label>
            </span>

            <div class="flex gap-2">
               <span class="p-float-label w-full">
                  <Calendar id="startDate" v-model="book.startDate" showIcon class="w-full" date-format="dd/mm/yy"
                     :disabled="!editing" />
                  <label for="startDate">Start Date</label>
               </span>
               <span class="p-float-label w-full">
                  <Calendar id="endDate" v-model="book.endDate" showIcon class="w-full" date-format="dd/mm/yy"
                     :disabled="!editing" />
                  <label for="endDate">End Date</label>
               </span>
            </div>

            <div class="flex gap-2 justify-center">
               <ToggleButton v-model="book.reRead" on-label="Read more than once" off-label="Not read more than once"
                  :disabled="!editing" />
               <span class="p-float-label" v-if="book.reRead">
                  <InputNumber id="timesRead" v-model="book.timesRead" class="w-full" autocomplete="off"
                     aria-autocomplete="none" :disabled="!editing" />
                  <label for="timesRead">Times Read</label>
               </span>
            </div>

            <div class="self-center text-center">
               <p class="m-0 p-1">General Score</p>
               <Rating v-model="book.generalScore" :cancel="false" :stars="10" :disabled="!editing" />
            </div>

            <span class="p-float-label">
               <Textarea v-model="book.review" autoResize class="w-full" rows="5" name="review" id="review"
                  autocomplete="off" aria-autocomplete="none" :disabled="!editing" />
               <label for="review">Review</label>
            </span>

            <span class="p-float-label">
               <InputText id="readOn" v-model="book.readOn" class="w-full" autocomplete="off" aria-autocomplete="none"
                  :disabled="!editing" />
               <label for="readOn">Read On</label>
            </span>

            <span class="p-float-label">
               <InputText id="favouriteCharacter" v-model="book.favouriteCharacter" class="w-full" autocomplete="off"
                  aria-autocomplete="none" :disabled="!editing" />
               <label for="favouriteCharacter">Favourite Character</label>
            </span>

            <Button type="submit" label="Update" :disabled="!editing" />
         </form>
      </div>
   </div>
   <div class="text-center mt-10" v-else>
      <ProgressSpinner />
   </div>
</template>

<script lang="ts">
import { initDefaultBook } from '~/utils/modelHelper';
import axios from 'axios'
import { mapPrismaToBookModel } from '~/server/models/book';

export default {
   data() {
      return {
         book: initDefaultBook(),
         loading: true,
         editing: false,
      };
   },
   async mounted() {
      const route = useRoute()
      const uId = await getUserId()
      if (uId === -1) {
         this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Could not get userId!', life: 3000 });
         await navigateTo('/home')
      } else {
         axios.get(`/api/book/${route.params.id}`)
            .then(async res => {
               if (res.status == 200) {
                  this.book = mapPrismaToBookModel(res.data)
                  this.loading = false
               } else {
                  this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
                  await navigateTo("/home")
               }
            })
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
         const route = useRoute()
         const body = this.book;
         if (this.validate().length === 0) {
            this.loading = true;
            axios.post(`/api/book/${route.params.id}`, {
               body
            }).then(async res => {
               if (res.status == 200) {
                  this.editing = false;
                  this.loading = false;
                  this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Changes saved!', life: 3000 });
               }
               else {
                  this.loading = false;
                  this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               }
            }).catch(err => {
               this.loading = false;
               this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               console.log(err)
            });
         } else {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Not valid!', life: 3000 });
         }
      },
      async onUpload(event: any) {
         try {
            if (this.book.id) {
               const file = event.files[0];
               const formData = new FormData();
               formData.append('bookId', this.book.id.toString())
               formData.append('file', file);
               await useFetch('/api/book/uploadcover', {
                  method: 'post',
                  body: formData,
               }).then(res => {
                  if (res.error.value) {
                     this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
                  } else {
                     this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Cover Uploaded', life: 3000 });
                  }
               }, error => {
                  this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               });
            } else {
               this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
            }

         } catch (error) {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
         }
      }
   }
}
</script>