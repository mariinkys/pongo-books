<template>
   <header>
      <nav class="flex justify-between items-center h-16 px-8">
         <NuxtLink to="/" style="color: inherit; text-decoration: none;">
            <p class="text-3xl font-bold">Pongo Books</p>
         </NuxtLink>
         <div class="flex justify-between items-center h-16">
            <div v-if="props.loggedIn">
               <NuxtLink to="/books/create" style="color: inherit; text-decoration: none;" class="mx-1">
                  <Button label="New Book" />
               </NuxtLink>
               <Button icon="pi pi-sign-out" severity="primary" class="mx-1" aria-label="User" @click="signOut()" />
            </div>
            <div v-else>
               <NuxtLink to="/register" style="color: inherit; text-decoration: none;">
                  <Button label="Register" class="mx-1" />
               </NuxtLink>
               <NuxtLink to="/login" style="color: inherit; text-decoration: none;">
                  <Button label="LogIn" class="mx-1" />
               </NuxtLink>
            </div>
         </div>
      </nav>
   </header>
</template>

<script setup lang="ts">
const props = defineProps(['loggedIn'])
const { signOut } = useAuth()
</script>