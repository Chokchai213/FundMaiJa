<script setup>
  import OverlayLoading from "../components/OverlayLoading.vue";
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <!-- render if successfully verified -->
  <section class="bg-gray-50" v-if="isSuccess==true">
    <div class="min-h-screen flex flex-col justify-center items-center">
    <!-- Exclamation mark icon -->
    <div class="text-green-500 text-9xl mb-8">
      <i class="fas fa-check-circle"></i>
    </div>
    <!-- Text in the middle -->
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-4">Your Account has been verified successfully</h1>
    </div>
  </div>
  </section>
  <!-- render if verify fail -->
  <section class="bg-gray-50" v-else>
    <div class="min-h-screen flex flex-col justify-center items-center">
    <!-- Exclamation mark icon -->
    <div class="text-red-500 text-9xl mb-8">
      <i class="fas fa-times-circle"></i>
    </div>
    <!-- Text in the middle -->
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-4">Your Account has already been verified</h1>
    </div>
  </div>
  </section>
  <OverlayLoading :isLoading="false"/>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      isLoading : false,
      isSuccess : null
    };
  },
  mounted(){
    this.isLoading = true;
    axios
        .post(`http://localhost:3000/auth/verify-email/${this.$route.params.userId}/${this.$route.params.token}`,
      )
        .then((res) => {
          res.status === 200 ? this.isSuccess = true : this.isSuccess = false;
          console.log(res)
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.response.data.message)
        });
    },
  }
</script>

<style></style>
