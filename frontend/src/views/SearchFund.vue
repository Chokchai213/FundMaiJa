<script setup>
import OverlayLoading from "../components/OverlayLoading.vue";
</script>

<template>
  <div class="mx-auto max-w-3xl mt-8 flex flex-col items-center justify-center" v-if="!isLoading">
    <div class="w-1/4 h-4/8  text-black font-bold px-2 py-1 rounded-lg mb-4 text-center text-xl">
      Search Fund
    </div>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div class="flex justify-center items-center h-full">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Search Condition
          </label>
        </div>
        <div>
          <div class="relative">
          </div>
        </div>
        <div class="flex justify-center items-center h-full">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="searchname">
            Name (EN)
          </label>
        </div>
        <div>
          <div class="relative">
            <input
              class="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-200 cursor-pointer"
              id="searchname" placeholder="Search using name (EN)" v-model="searchNameEN">
            </input>
          </div>
        </div>
        <div class="flex justify-center items-center h-full">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="fundtype">
            Type
          </label>
        </div>
        <div>
          <div class="relative">
            <select
              class="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-200 cursor-pointer"
              id="fundtype" v-model="selectedType">
              <option v-for="(option, index) in typeMapping" :key="index" :value="option">
                {{ option }}
              </option>

            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center h-full">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="fundrisk">
            Risk
          </label>
        </div>
        <div>
          <div class="relative">
            <select
              class="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-200 cursor-pointer"
              id="fundrisk" v-model="selectedRisk">
              <option v-for="(option, index) in riskMapping" :key="index" :value="option">
                {{ option }}
              </option>

            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <!-- favFund -->
  <div class="flex flex-col items-center justify-center mt-16" v-if="!isLoading">
    <div class="bg-gray-50 p-8 rounded-lg shadow-md h-[400px] w-full md:w-3/4 overflow-x-auto">
      <div class="w-full h-4/8  text-black font-bold px-2 py-1 rounded-lg mb-4 text-center text-xl">
        Query Fund
      </div>
      <div class="w-full overflow-x-scroll">

      <table class="w-full border-collapse border border-slate-400">
        <thead>
          <tr>
            <th
              class="border border-slate-300 px-6 py-3 bg-green-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Project ID
            </th>
            <th
              class="border border-slate-300 px-6 py-3 bg-green-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Project Name
            </th>
            <th
              class="border border-slate-300 px-6 py-3 bg-green-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Risk Spectrum
            </th>
            <th
              class="border border-slate-300 px-6 py-3 bg-green-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Factsheet URL
            </th>
            <th
              class="border border-slate-300 px-6 py-3 bg-green-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through each favorite fund -->
          <tr v-for="(fav, key) in filterFunds" :key="key">
            <td class="border border-slate-300 px-6 py-4 whitespace-no-wrap">{{ fav.proj_id }}</td>
            <td class="border border-slate-300 px-6 py-4 whitespace-no-wrap">
              <a :href="`/fund-detail/${fav.proj_id}`">
                {{ fav.proj_name_en }}
              </a>
            </td>
            <td class="border border-slate-300 px-6 py-4 whitespace-no-wrap">
              {{ fav.risk_spectrum }}
            </td>
            <td class="border border-slate-300 px-6 py-4 whitespace-no-wrap">
              <a :href="fav.url_factsheet" target="_blank" rel="noopener noreferrer"
                class="text-blue-500 hover:underline">{{ fav.url_factsheet }}</a>
            </td>
            <td class="border border-slate-300 px-6 py-4 whitespace-no-wrap">
              <button
                class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-amber-500 text-black shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button" @click="onClickRemoveFromFav(fav)" v-if="fav.isFavorite">
                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><i
                    class="fas fa-star" aria-hidden="true"></i></span>
              </button>
              <button
                class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-grey-500 text-black shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button" @click="onClickAddToFav(fav)" v-else>
                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><i
                    class="fas fa-star" aria-hidden="true"></i></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
      allFunds: null,
      riskMapping: null,
      typeMapping: null,
      selectedType: null,
      selectedRisk: null,
      listUserFavFun: null,
      searchNameEN: "",
    };
  },
  methods: {
    onClickAddToFav(fav) {
      axios.post(`http://localhost:3000/fund/addfavfund/${getCookie("_id")}`,
        {
          proj_id: fav.proj_id
        }).then(res => {
          this.allFunds[fav.index].isFavorite = true;
        }).catch(err => {
          console.log(err.response.data.message)
        })
    },
    onClickRemoveFromFav(fav) {
      axios
        .delete(
          `http://localhost:3000/fund/removefavfund/${getCookie("_id")}`,
          {
            data: { proj_id: fav.proj_id },
          }
        ).then(res => {
          this.allFunds[fav.index].isFavorite = false;
        }).catch(err => {
          console.log(err.response.data.message)
        })
    }
  },
  computed: {
    filterFunds() {
      if (!this.allFunds) {
        // Handle the case when allFunds is not initialized
        return [];
      }
      // Filter users based on search term
      return this.allFunds.filter((fund) => {
        if (this.selectedRisk !== "-- None --" && this.selectedType !== "-- None --") {
          return (
            fund.proj_name_en.match(this.searchNameEN) &&
            fund.risk_spectrum.toString() === this.selectedRisk &&
            fund.spec_code.includes(this.selectedType)
          );
        } else if (this.selectedRisk !== "-- None --") {
          return (
            fund.proj_name_en.match(this.searchNameEN) &&
            fund.risk_spectrum.toString() === this.selectedRisk
          );
        } else if (this.selectedType !== "-- None --") {
          return (
            fund.proj_name_en.match(this.searchNameEN) &&
            fund.spec_code.includes(this.selectedType)
          );
        } else {
          return fund.proj_name_en.match(this.searchNameEN);
        }
      });

    },
  },
  mounted() {
    this.isLoading = true;
    axios
      .get("http://localhost:3000/fund/getallfund")
      .then((res) => {
        this.allFunds = res.data
        const uniqueRisk = new Set();
        const uniqueType = new Set();
        axios
          .post(`http://localhost:3000/user/getuser/${getCookie("username")}`)
          .then((resUser) => {
            this.Users = resUser.data;
            this.allFunds.forEach((fund, index) => {
              this.Users.favouriteFund.forEach((favFund) => {
                if (favFund.proj_id === fund.proj_id) {
                  this.allFunds[index].isFavorite = (favFund.proj_id === fund.proj_id);
                }
              })
              uniqueRisk.add(fund['risk_spectrum']);
              const currentFundSpec = fund['spec_code'].split(',')
              currentFundSpec.forEach(spec => {
                uniqueType.add(spec)
              })
              this.allFunds[index]['spec_code'] = currentFundSpec;
              this.allFunds[index].index = index
            });
            this.riskMapping = Array.from(uniqueRisk).sort();
            this.typeMapping = Array.from(uniqueType).sort();
            this.riskMapping.unshift("-- None --");
            this.typeMapping.unshift("-- None --");
            this.selectedType = this.typeMapping[0];
            this.selectedRisk = this.riskMapping[0];
            this.isLoading = false;
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching allfunds:", error);
        this.isLoading = false;
      });
  },
};
</script>

<style></style>
