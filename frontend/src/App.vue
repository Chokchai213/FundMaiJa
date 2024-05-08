<script setup>
import NavigationBar from "./components/NavigationBar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <NavigationBar />
  <RouterView />
  <Footer />
</template>

<script>
import { reactive } from 'vue'

export const store = reactive({
  accessToken : null,
  setUserAuthStatus(accessToken) {
    this.accessToken = accessToken;
  }
})


</script>

<style scoped></style>
