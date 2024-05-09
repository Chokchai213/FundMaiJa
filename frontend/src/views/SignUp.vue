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
            Create your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit">
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Your username</label
              >
              <input
                type="email"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Username"
                v-model="username"
                required=""
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                v-model="email"
                required=""
              />
            </div>
            <div>
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
                v-model="password"
                required=""
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              @click="signUp"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
    <OverlayLoading :isLoading="isLoading" />
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  props: {},
  components: {},
  data() {
    return {
      username: "",
      email: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    signUp() {
      if (!this.username || !this.password || !this.email) {
        return;
      }
      this.isLoading = true;
      axios
        .post("http://localhost:3000/auth/signup", {
          username: this.username,
          password: this.password,
          email: this.email,
        })
        .then((res) => {
          this.isLoading = false;
          console.log("res.data :: ", res.data);
          this.$router.replace("/verifyyouraccount/" + btoa(this.email));
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
