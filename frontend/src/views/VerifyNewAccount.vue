<script setup>
  import OverlayLoading from "../components/OverlayLoading.vue";

</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <section class="bg-gray-50">
    <div class="min-h-screen flex flex-col justify-center items-center">
    <!-- Exclamation mark icon -->
    <div class="text-gray-500 text-9xl mb-8">
      <i class="fas fa-exclamation-circle"></i>
    </div>
    <!-- Text in the middle -->
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-4">Please Check your email</h1>
      <p class="text-lg text-gray-700">we have email your account verification email at {{encodedEmail}}</p>
    </div>
  </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      encodedEmail : atob(this.$route.params.email)
    };
  }
};
</script>

<style></style>
