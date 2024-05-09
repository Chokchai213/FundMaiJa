<script setup></script>
<template>
  <nav class="bg-green-700">
    <div class="mx-auto">
      <div class="relative flex items-center justify-between px-4">
        <div class="flex items-center">
          <div class="flex flex-shrink-0 items-center">
            <a href="/mainfeed" class="px-4 py-4">
              <h1 class="font-bold select-none text-2xl text-white">FUNDMAIJA</h1>
            </a>
          </div>
          <div class="sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
              :href="'/myinvestment'"
                class=" text-white rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >My Investment</a>
              <a
                href="/searchfund"
                class=" text-white rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >Search Fund</a>
            </div>
          </div>
        </div>
        <div class="relative flex items-center" v-if="isLogin">
          <div class="mr-3">
            <img
              class="h-8 w-8 rounded-full border border-black border-2"
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt=""
            />
          </div>
          <div>
            <div
              class="bg-gray-900 text-white rounded-3xl px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              {{this.username}}
            </div>
          </div>
          <div class="px-1">
            <div
              class="bg-black text-white rounded-3xl px-3 py-2 text-sm font-medium hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium"
              @click="onClickSignOut"
            >
              Sign out
            </div>
          </div>
        </div>
        <div class="relative flex items-center" v-else>
          <div class="mr-3">
            <button
              type="submit"
              class="w-full text-white bg-green-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              @click="pushSignIn"
            >
              Sign in
            </button>
          </div>
        </div>
        
      </div>
    </div>
  </nav>
</template>

<script>
import { getCookie, deleteAllCookies } from "../utils/CookieUtils";
export default {
  data() {
    return {
      isLogin: false,
      username : getCookie("username")
    };
  },
  methods: {
    pushSignIn() {
      this.$router.push('/signin');
    },
    onClickSignOut(){
      deleteAllCookies();
      window.location.reload();
      this.$router.replace('/');
    }
  },
  mounted() {
    if (getCookie("accessToken")) {
      this.isLogin = true;
    }
  },
};
</script>

<style scoped></style>
