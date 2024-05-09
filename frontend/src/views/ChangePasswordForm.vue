<script setup>
import OverlayLoading from "../components/OverlayLoading.vue";
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-16">
    <div
      class="bg-gray-50 p-8 rounded-lg shadow-md w-3/4 flex items-center justify-center flex flex-col"
    >
      <div
        class="w-1/4 h-4/8 text-black text-xl font-bold px-2 py-1 rounded-lg mb-4 text-center"
      >
        Change Password
      </div>

      <div class="flex flex-col w-full">
        <div>
          <label for="name" class="block text-gray-700 font-bold mb-2"
            >Old Password:</label
          >
          <input
            type="password"
            id="oldpassword"
            name="name"
            class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 mb-3"
            v-model="oldPassword"
          />
        </div>
        <div>
          <label for="password" class="block text-gray-700 font-bold mb-2"
            >New Password:</label
          >
          <input
            type="password"
            id="newpassword"
            name="newpassword"
            class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 mb-3"
            v-model="newPassword"
          />
        </div>
        <div>
          <label for="password" class="block text-gray-700 font-bold mb-2"
            >Confirm New Password:</label
          >
          <input
            type="password"
            id="newcpassword"
            name="newcpassword"
            class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 mb-3"
            v-model="newcPassword"
          />
        </div>
        <div class="flex justify-center space-x-4">
          <button
            type="submit"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-gray-300 p-1"
            @click="onClickChangePassword"
          >
            Save
          </button>
          <button
            type="submit"
            class="bg-white-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-gray-300 p-1"
            @click="onClickCancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  <OverlayLoading :isLoading="isLoading" />
</template>

<script>
import axios from "axios";
import { getCookie } from "../utils/CookieUtils";
export default {
  data() {
    return {
      isLoading: false,
      oldPassword: "",
      newPassword: "",
      newcPassword: "",
    };
  },
  methods: {
    onClickCancel() {
      this.$router.back();
    },
    onClickChangePassword() {
      this.isLoading = true;
      if (this.newPassword !== this.newcPassword) {
        alert("new password and confirm password is not the same");
        this.isLoading = false;
        return;
      }
      axios
        .post(
          `http://localhost:3000/auth/change-pwd/${getCookie("username")}`,
          {
            new_pass: this.newPassword,
            old_pass: this.oldPassword,
          }
        )
        .then((res) => {
          alert(res.data.message);
          this.isLoading = false;
          this.$router.back();
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    // console.log(getCookie("accessToken"));
  },
};
</script>

<style></style>
