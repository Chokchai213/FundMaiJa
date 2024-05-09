<script setup></script>
<template>
  <nav class="bg-green-700">
    <div class="mx-auto">
      <div class="relative flex items-center justify-between px-4">
        <div class="flex items-center">
          <div class="flex flex-shrink-0 items-center">
            <a href="/mainfeed" class="px-4 py-4">
              <h1 class="font-bold select-none text-2xl text-white">
                FUNDMAIJA
              </h1>
            </a>
          </div>
          <div class="sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                :href="'/myinvestment'"
                class="text-white rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >My Investment</a
              >
              <a
                href="/searchfund"
                class="text-white rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >Search Fund</a
              >
            </div>
          </div>
        </div>
        <div class="relative flex items-center" v-if="isLogin">
          <div class="mr-3">
            <img
              class="h-8 w-8 rounded-full border border-white border-2"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyLXJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiLz48cGF0aCBkPSJNMjAgMjFhOCA4IDAgMCAwLTE2IDAiLz48L3N2Zz4="
              alt=""
            />
          </div>
          <div>
            <div
              class="bg-white text-black rounded-3xl px-3 py-2 text-sm font-medium hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
            >
              {{ this.username }}
            </div>
          </div>
          <div class="px-1">
            <div
              class="bg-white text-black rounded-3xl px-3 py-2 text-sm font-medium hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
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
              class="bg-white text-black rounded-3xl px-3 py-2 text-sm font-medium hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
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
      username: getCookie("username"),
    };
  },
  methods: {
    pushSignIn() {
      this.$router.push("/signin");
    },
    onClickSignOut() {
      deleteAllCookies();
      window.location.reload();
      this.$router.replace("/");
    },
  },
  mounted() {
    if (getCookie("accessToken")) {
      this.isLogin = true;
    }
  },
};
</script>

<style scoped></style>
