<script setup>
import { getCookie } from '../utils/CookieUtils';

</script>


<template>
  <p>MyInvestment</p>
</template>
  
  <script>
  import { getCookie } from '../utils/CookieUtils';
    export default {
  mounted(){
      console.log(getCookie("accessToken"));
    },
  }
  </script>
  
  <style>
  </style>