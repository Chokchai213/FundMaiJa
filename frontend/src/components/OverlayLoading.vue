<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
    integrity="sha512-PgQMlq+nqFLV4ylk1gwUOgm6CtIIXkKwaIHp/PAIWHzig/lKZSEGKEysh0TCVbHJXCLN7WetD8TFecIky75ZfQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
  <!--If isLoading is True, then shows overlay loading-->
  <div v-if="isLoading" class="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
    <div class="flex justify-center items-center mt-[50vh]">
      <div class="fas fa-circle-notch fa-spin fa-5x text-grey-600"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

const isLoading = ref(false);

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  //assign props.isloading to isLoading ref.
  setup(props) {
    isLoading.value = props.isLoading;
  }
}
</script>

<style scoped></style>
