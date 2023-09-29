<script setup lang="ts">
useTitle("Home");

useFavicon("/favicon.png");
const content = ref<string>("");
watch(content, (newContent) => {
  console.log(newContent);
});
</script>
<template>
  <main>
    <Editor />
  </main>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
