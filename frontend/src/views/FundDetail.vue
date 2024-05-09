<script setup>
import OverlayLoading from "../components/OverlayLoading.vue";
</script>
<template>
    <div class="flex justify-center mt-16 mb-16">
        <div class="flex flex-col items-center w-2/4">
            <div class="flex flex-col px-4 sm:px-0 items-center ">
                <h3 class="text-base font-semibold leading-7 text-gray-900">{{ Detail.proj_name_en }}</h3>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{{ Detail.proj_name_th }}</p>
            </div>
            <div class="mt-6 border-t border-gray-100">
                <dl class="divide-y divide-gray-100">
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Abbreviated name</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 ">{{ Detail.proj_abbr_name
                            }}</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Risk</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ Detail.risk_spectrum
                            }}</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Type</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ Detail.spec_code }}
                        </dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Policy description</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ Detail.policy_desc }}
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
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Factsheet</dt>
                        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div class="ml-4 flex-shrink-0">
                                        <a :href="Detail.url_factsheet"
                                            class="font-medium text-indigo-600 hover:text-indigo-500">{{
                                                Detail.url_factsheet }}</a>
                                    </div>
                                </li>
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
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
    methods: {

    },
    mounted() {
        this.isLoading = true;
        axios
            .post(`http://localhost:3000/fund/getdetail/${this.$route.params.proj_id}`)
            .then((res) => {
                // console.log(res.data);
                this.Detail = res.data[0];
                console.log(this.Detail);
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
