<script setup>
import OverlayLoading from "../components/OverlayLoading.vue";
</script>

<template>
  <section class="bg-gray-50">
    <div
      class="flex flex-col items-center justify-center px-4 py-2 mx-auto md:h-screen lg:py-0"
    >
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit">
            <div>
              <!-- Username input box -->
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Username</label
              >
              <input
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Your Username"
                required=""
                v-model="username"
              />
            </div>
            <div>
              <!-- Password input box -->
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required=""
                v-model="password"
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <!-- <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    required=""
                  /> -->
                </div>
                <div class="ml-3 text-sm">
                  <!-- <label for="remember" class="text-gray-500"
                    >Remember me</label
                  > -->
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              @click="signIn"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500">
              Don’t have an account yet?
              <a
                href="/signup"
                class="font-medium text-primary-600 hover:underline"
                >Sign up</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
    <OverlayLoading :isLoading="isLoading" />
  </section>
</template>

<script>
import axios from "axios";
import { getCookie, setCookie } from "../utils/CookieUtils";
export default {
  name: "SignIn",
  props: {},
  components: {},
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    signIn() {
      if (!this.username || !this.password) {
        return;
      }
      this.isLoading = true;
      axios
        .post("https://fundmaija-backend.onrender.com/auth/signin", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          this.isLoading = false;
          const token = res.data.accessToken;
          const username = res.data.username;
          const email = res.data.email;
          setCookie("accessToken", token, 12);
          setCookie("username", username, 12);
          setCookie("email", email, 12);
          axios
            .post(`https://fundmaija-backend.onrender.com/user/getuser/${username}`)
            .then((resGetUser) => {
              setCookie("_id", resGetUser.data._id);
              this.$router.push("/mainfeed");
            })
            .catch((errGetUser) => {
              this.isLoading = false;
              alert(errGetUser.response.data.message);
              console.log("errGetUser :: ", errGetUser);
            });
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.response.data.message);
          console.log("err :: ", err);
        });
    },
  },
  mounted() {
    if (getCookie("accessToken")) {
      this.$router.replace("/mainfeed");
    }
  },
};
</script>

<style></style>
