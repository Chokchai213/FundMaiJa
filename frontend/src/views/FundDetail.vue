<script setup>
import OverlayLoading from "../components/OverlayLoading.vue";
</script>
<template>
    <!--Fund's detail box-->
    <div class="flex justify-center mt-14 mb-12">
        <div class="bg-gray-50 p-8 rounded-lg shadow-md w-3/4 items-center justify-center flex flex-col">
            <div class="flex flex-col px-4 sm:px-0 items-center ">
                <h3 class="text-base font-semibold leading-7 text-gray-900 text-xl">{{ Detail.proj_name_en }}</h3>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{{ Detail.proj_name_th }}</p>
            </div>
            <div class="mt-6 border-t border-gray-100">
                <dl class="divide-y divide-gray-100">
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Abbreviated name</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 ">{{
                            Detail.proj_abbr_name
                        }}</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Risk</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{
                            Detail.risk_spectrum
                        }}</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Type</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ Detail.spec_code
                            }}
                        </dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Policy description</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ Detail.policy_desc
                            }}
                        </dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Management style</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{
                            Detail.management_style
                        }}</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Investment policy description</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{
                            Detail.investment_policy_desc }}</dd>
                    </div>
                    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Factsheet</dt>
                        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <a :href="Detail.url_factsheet" class="font-medium text-indigo-600 hover:text-indigo-500">{{
                                Detail.url_factsheet }}</a>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
    <!--Go back button-->
    <div class="flex justify-center mb-20">
        <button @click="$router.back()"
            class="bg-gray-50 text-black rounded-xl shadow-md px-12 py-5 text-md hover:bg-gray-100 font-medium cursor-pointer">
            Go back
        </button>
    </div>
    <OverlayLoading :isLoading="isLoading" />
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            Detail: [],
            isLoading: false,
        };
    },
    mounted() {
        this.isLoading = true;
        //get fund's detail by proj_id param.
        axios
            .post(`http://localhost:3000/fund/getdetail/${this.$route.params.proj_id}`)
            .then((res) => {
                this.Detail = res.data[0];
                this.isLoading = false;
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                this.isLoading = false;
            });
    },
};
</script>

<style>
#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#customers td,
#customers th {
    border: 1px solid #ddd;
    padding: 8px;
}

#customers tr:nth-child(even) {
    background-color: #f2f2f2;
}

#customers tr:hover {
    background-color: #ddd;
}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
}
</style>
