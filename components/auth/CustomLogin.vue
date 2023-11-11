<template>
   <div class="max-w-5xl m-auto">
      <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
         <span class="p-float-label">
            <InputText id="username" v-model="state.username" class="w-full" />
            <label for="username">Username</label>
         </span>

         <span class="p-float-label">
            <InputText id="password" v-model="state.password" type="password" class="w-full" />
            <label for="username">Password</label>
         </span>

         <Button type="submit" label="Login" />
      </form>
   </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const { signIn } = useAuth()
const toast = useToast();

const state = reactive({
   username: undefined,
   password: undefined
})

function validate(): any[] {
   const errors = []
   if (!state.username) errors.push({ path: 'username', message: 'Required' })
   if (!state.password) errors.push({ path: 'password', message: 'Required' })
   return errors
}

async function onSubmit() {
   // Do something with data
   if (validate().length == 0) {
      const user = state.username
      const password = state.password
      await signIn('credentials', { user, password })
   } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Not valid!', life: 3000 });
   }
}
</script>