<template>
   <h1 class="text-start text-3xl font-semibold m-5">{{ text ?? 'Missing Title' }}</h1>
</template>

<script setup lang="ts">
const props = defineProps(['text'])
</script>