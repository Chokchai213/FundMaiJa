<script setup>
import OverlayLoading from "../components/OverlayLoading.vue";
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-16">
    <div
      class="bg-gray-50 p-8 rounded-lg shadow-md w-3/4 flex items-center justify-center flex flex-col"
    >
      <div
        class="w-1/4 h-4/8 text-black font-bold px-2 py-1 rounded-lg mb-4 text-center text-xl"
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
            v-model="username"
            required=""
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
            v-model="email"
            required=""
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

  <!-- favFund -->
  <div class="flex flex-col items-center justify-center mt-16">
    <div
      class="bg-gray-50 p-8 rounded-lg shadow-md w-full h-[400px] sm:w-3/4 overflow-auto"
    >
      <div
        class="w-full h-4/8 text-black font-bold px-2 py-1 rounded-lg mb-4 text-center text-xl"
      >
        Favourite Fund
      </div>
      <div class="w-full overflow-x-scroll">
        <table class="border-collapse border border-slate-400">
          <thead class="">
            <tr>
              <th
                class="border border-slate-300 px-6 py-3 bg-green-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider"
              >
                Project ID
              </th>
              <th
                class="border border-slate-300 px-6 py-3 bg-green-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider"
              >
                Project Name
              </th>
              <th
                class="border border-slate-300 px-6 py-3 bg-green-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider"
              >
                Risk Spectrum
              </th>
              <th
                class="border border-slate-300 px-6 py-3 bg-green-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider"
              >
                Factsheet URL
              </th>
              <th
                class="border border-slate-300 px-6 py-3 bg-green-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop through each favorite fund -->
            <tr v-for="(fav, key) in Users.favouriteFund" :key="key">
              <td class="border border-slate-300 px-6 py-4 whitespace-no-wrap">
                {{ fav.proj_id }}
              </td>
              <td class="border border-slate-300 px-6 py-4 whitespace-no-wrap">
                {{ fav.proj_name_en }}
              </td>
              <td class="border border-slate-300 px-6 py-4 whitespace-no-wrap">
                {{ fav.risk_spectrum }}
              </td>
              <td class="border border-slate-300 px-6 py-4 whitespace-no-wrap">
                <a
                  :href="fav.url_factsheet"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-500 hover:underline"
                  >{{ fav.url_factsheet }}</a
                >
              </td>
              <td class="border border-slate-300 px-6 py-4 whitespace-no-wrap">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  v-on:click="onClickDeleteFavFund(fav.proj_id)"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <center>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          v-on:click="onClickExportToCSV()"
        >
          Export Favourite Fund to CSV
        </button>
      </center>
    </div>
  </div>

  <OverlayLoading :isLoading="isLoading" />
</template>

<script>
import { getCookie, setCookie } from "../utils/CookieUtils";
import axios from "axios";
export default {
  data() {
    return {
      username: getCookie("username"),
      email: getCookie("email"),
      Users: [],
      isLoading: false,
    };
  },
  methods: {
    onClickEdit() {
      this.isLoading = true;
      axios
        .patch(`http://localhost:3000/user/edituser/${getCookie("_id")}`, {
          username: this.username,
          email: this.email,
        })
        .then(() => {
          console.log("then");
          this.isLoading = false;
          setCookie("username", this.username, 12);
          setCookie("email", this.email, 12);
          alert("Edit Successfully");
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.response.data.message);
        });
    },
    onClickChangePassword() {
      this.$router.push("/changepassword");
    },
    onClickDeleteFavFund(proj_id) {
      console.log(getCookie("_id"));
      console.log(proj_id);
      axios
        .delete(
          `http://localhost:3000/fund/removefavfund/${getCookie("_id")}`,
          {
            data: { proj_id: proj_id },
          }
        )
        .then((res) => {
          console.log("Delete fav fund id: " + proj_id);
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .finally(() => {
          window.location.reload();
        });
    },
    onClickExportToCSV() {
      axios
        .get(
          `http://localhost:3000/user/export-file/${getCookie("_id")}`,
          null,
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          const blob = new Blob([res.data], {
            type: res.headers["content-type"],
          });

          // Create a temporary URL for the blob
          const url = window.URL.createObjectURL(blob);

          // Create a temporary anchor element
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "FavFundData.csv"); // Set the filename for the download

          // Programmatically trigger a click event on the anchor element
          document.body.appendChild(link);
          link.click();

          // Clean up by revoking the temporary URL and removing the temporary anchor element
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);

          alert("Downloaded CSV file");
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    axios
      .post(`http://localhost:3000/user/getuser/${this.username}`)
      .then((res) => {
        // console.log(res.data);
        this.Users = res.data;
        console.log(this.Users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  },
};
</script>

<style></style>
