<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center mt-16">
    <div
      class="bg-gray-50 p-8 rounded-lg shadow-md w-3/4 flex items-center justify-center flex flex-col"
    >
      <div
        class="w-1/4 h-4/8 bg-green-500 text-black font-bold px-2 py-1 rounded-lg mb-4 text-center"
      >
        Contact
      </div>

      <div class="flex flex-col w-full">
        <div>
          <label for="name" class="block text-gray-700 font-bold mb-2"
            >Username:</label
          >
          <input
            type="text"
            id="name"
            name="name"
            class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 mb-3"
            disabled
          />
        </div>
        <div>
          <label for="password" class="block text-gray-700 font-bold mb-2"
            >Email:</label
          >
          <input
            type="email"
            id="email"
            name="email"
            class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 mb-3"
            disabled
          />
        </div>
        <div class="flex justify-center space-x-4">
          <button
            type="submit"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="onClickEdit"
          >
            Edit
          </button>
          <button
            type="submit"
            class="bg-white-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-gray-300 p-1"
            @click="onClickChangePassword"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from "../utils/CookieUtils";
export default {
  data() {
    return {
      username : 
    };
  },
  methods: {
    onClickEdit(){
        console.log("EditClicked")
    },
    onClickChangePassword(){
        this.$router.push('/changepassword');
    }
  },
  mounted() {

  },
};
</script>

<style></style>
