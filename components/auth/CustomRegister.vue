<template>
   <div class="max-w-5xl m-auto">
      <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
         <span class="p-float-label">
            <InputText id="username" v-model="state.username" class="w-full" />
            <label for="username">Username</label>
         </span>

         <span class="p-float-label">
            <InputText id="mail" v-model="state.mail" class="w-full" />
            <label for="mail">Email</label>
         </span>

         <span class="p-float-label">
            <InputText id="password" v-model="state.password" type="password" class="w-full" />
            <label for="username">Password</label>
         </span>

         <span class="p-float-label">
            <InputText id="password" v-model="state.repeatpassword" type="password" class="w-full" />
            <label for="username">Repeat Password</label>
         </span>


         <Button type="submit" label="Register" />
      </form>
      <Toast />
   </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import axios from 'axios'
const toast = useToast();

const state = reactive({
   username: undefined,
   password: undefined,
   mail: undefined,
   repeatpassword: undefined,
})

function validate(): any[] {
   const errors = []
   if (!state.username) errors.push({ path: 'username', message: 'Required' })
   if (!state.username) errors.push({ path: 'mail', message: 'Required' })
   if (!state.password) errors.push({ path: 'password', message: 'Required' })
   if (!state.repeatpassword) errors.push({ path: 'repeatpassword', message: 'Required' })
   if (state.repeatpassword !== state.password) {
      errors.push({ path: 'password', message: 'Passwords have to be the same' })
      errors.push({ path: 'repeatpassword', message: 'Passwords have to be the same' })
   }
   return errors
}

async function onSubmit() {
   if (validate().length == 0) {
      const body = state
      axios.post('/api/register', {
         body
      }).then(async function (res: any) {
         if (res.status == 200) {
            await navigateTo('/')
            toast.add({ severity: 'success', summary: 'Success', detail: 'User Registered!', life: 3000 });
         } else {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
         }
      }).catch(function (error: any) {
         toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
      })
   } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Not valid!', life: 3000 });
   }
}
</script>