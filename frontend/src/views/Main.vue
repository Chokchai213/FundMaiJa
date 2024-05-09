<template>
  <!-- Carousel -->
  <div id="indicators-carousel" class="relative w-screen carousel-width" data-carousel="slide">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-visible md:h-96">
      <!-- Carousel items -->
      <div v-for="(item, index) in news" :key="index" :class="{ 'carousel-item': true, active: activeIndex === index }">
        <!-- Image available -->
        <a v-if="
          item.urlToImage !== null &&
          item.urlToImage !== undefined &&
          item.urlToImage !== ''
        " target="_blank" :href="item.url">
          <img :src="item.urlToImage" class="absolute overflow-hidden h-full w-full object-cover" />
          <div class="absolute bottom-4 left-0 right-0 via-transparent to-transparent p-4">
            <h2 class="text-white text-lg md:text-xl font-semibold">
              {{ item.title }}
            </h2>
            <p class="text-white text-sm md:text-base">
              {{ item.description }}
            </p>
          </div>
        </a>
        <!-- Image unavailable -->
        <a v-else-if="
          item.url !== null &&
          item.url !== undefined &&
          item.urlToImage !== ''
        " target="_blank" :href="item.url">
          <img :src="'Image_not_available.jpg'" class="absolute overflow-hidden h-full w-full object-cover" />
          <div class="absolute bottom-4 left-0 right-0 via-transparent to-transparent p-4">
            <h2 class="text-black text-lg md:text-xl font-semibold">
              {{ item.title }}
            </h2>
            <p class="text-black text-sm md:text-base">
              {{ item.description }}
            </p>
          </div>
        </a>
        <!-- Content unavailable -->
        <div v-else>
          <img :src="'this-content-is-not-available.gif'" class="absolute overflow-hidden h-full w-full object-cover" />
        </div>
      </div>
    </div>
    <!-- Slider indicators -->
    <div class="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-3 left-1/2">
      <button v-for="(slide, index) in slides" :key="index" type="button" :class="{
        'w-3 h-3 rounded-full': true,
        'bg-black': activeIndex === index,
        'bg-gray-400': activeIndex !== index,
      }" aria-current="true" :aria-label="`Slide ${index + 1}`" @click="goToSlide(index)"></button>
    </div>
    <!-- Slider controls -->
    <button type="button"
      class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-prev @click="prevSlide">
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 1 1 5l4 4" />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button type="button"
      class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-next @click="nextSlide">
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 9 4-4-4-4" />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>

  <!-- Card -->
  <!-- This is an example component -->
  <div>
    <div class="relative items-center justify-center">
      <!-- Header Text-->
      <h1 class="text-center text-2xl font-bold p-2 bg-green-500 text-white">
        Today's news
      </h1>
      <!-- All Cards Container -->
      <div class="container mx-auto my-auto overflow-x-auto whitespace-nowrap">
        <!-- Card 1 -->
        <div v-for="item in news"
          class="inline-block lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8 w-80 h-80">
          <!-- Image available -->
          <!-- Card Image -->
          <div v-if="
            item.urlToImage !== null &&
            item.urlToImage !== undefined &&
            item.urlToImage !== ''
          " target="_blank" :href="item.url" class="w-full h-full bg-center bg-cover">
            <img :src="item.urlToImage" class="overflow-hidden h-full w-full object-cover" />
            <!-- Card Content -->
            <div class="p-4 max-h-48 overflow-hidden">
              <h3 class="font-medium text-gray-600 text-lg my-2 uppercase">
                {{ item.title }}
              </h3>
              <p class="text-justify truncate">
                {{ item.description }}
              </p>
              <div class="mt-5">
                <a :href="item.url"
                  class="hover:bg-gray-700 rounded-full py-2 px-3 font-semibold hover:text-white bg-gray-400 text-gray-100"
                  target="blank">Read More</a>
              </div>
            </div>
          </div>
          <!-- Image unavailable -->
          <div v-else-if="
            item.url !== null &&
            item.url !== undefined &&
            item.url !== '' &&
            item.description !== null &&
            item.description !== undefined &&
            item.description !== ''
          " target="_blank" :href="item.url" class="w-full h-full bg-center bg-cover">
            <img :src="'Image_not_available.jpg'" class="overflow-hidden h-full w-full object-cover" />
            <!-- Card Content -->
            <div class="p-4 max-h-48 overflow-hidden">
              <h3 class="font-medium text-gray-600 text-lg my-2 uppercase">
                {{ item.title }}
              </h3>
              <p class="text-justify truncate">
                {{ item.description }}
              </p>
              <div class="mt-5">
                <a :href="item.url"
                  class="hover:bg-gray-700 rounded-full py-2 px-3 font-semibold hover:text-white bg-gray-400 text-gray-100"
                  target="blank">Read More</a>
              </div>
            </div>
          </div>

          <!-- Image unavailable and no description -->
          <div v-else-if="
            (item.title !== null &&
              item.title !== undefined &&
              item.title !== '') ||
            item.description == null ||
            item.description == undefined ||
            item.description == ''
          " target="_blank" :href="item.url" class="w-full h-full bg-center bg-cover">
            <img :src="'Image_not_available.jpg'" class="overflow-hidden h-full w-full object-cover" />
            <!-- Card Content -->
            <div class="p-4 max-h-48 overflow-hidden">
              <h3 class="font-medium text-gray-600 text-lg my-2 uppercase">
                {{ item.title }}
              </h3>
              <p class="text-justify truncate text-white">temp</p>
              <div class="mt-5">
                <a :href="item.url"
                  class="hover:bg-gray-700 rounded-full py-2 px-3 font-semibold hover:text-white bg-gray-400 text-gray-100"
                  target="blank">Read More</a>
              </div>
            </div>
          </div>

          <!-- Content unavailable -->
          <div v-else class="w-full h-full bg-center bg-cover">
            <img :src="'this-content-is-not-available.jpg'" class="overflow-hidden h-full w-full object-cover" />
            <div class="p-4 max-h-48 overflow-hidden">
              <h3 class="font-medium text-gray-600 text-lg my-2 uppercase">
                The content is available
              </h3>
              <p class="text-justify">The content is available</p>
              <div class="mt-5">
                <a :href="'#'"
                  class="rounded-full py-2 px-3 font-semibold hover:text-white bg-white text-white disabled-link"
                  target="blank">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Footer -->
    </div>
  </div>
  <br />
  <br />
</template>

<script>
import axios from "axios";
import { getCookie } from "../utils/CookieUtils";
const apiKey = import.meta.env.VITE_NEWS_APIKEY;

export default {
  name: "MyComponent",
  data() {
    return {
      news: [
        {
          title: "",
          urlToImage: "",
          description: "",
          url: "",
        },
      ],
      activeIndex: 0,
      slides: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      slideInterval: 5000,
    };
  },
  mounted() {
    this.interval = setInterval(this.nextSlide, this.slideInterval);
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`
      )
      .then((res) => {
        // console.log(res.data);
        res.data.articles.forEach((article) => {
          // Push the values to respective arrays
          if (article.title != "[Removed]") {
            console.log(article.title);
            this.news.push({
              title: article.title,
              urlToImage: article.urlToImage,
              description: article.description,
              url: article.url,
            });
          }
        });
      })
      .finally(() => {
        this.news.shift();
        console.log(this.news);
      });
  },
  beforeDestroy() {
    // Clear the interval when the component is destroyed to prevent memory leaks
    clearInterval(this.interval);
  },
  methods: {
    goToSlide(index) {
      // Clear the interval to prevent automatic slide switching
      clearInterval(this.interval);
      // Update the activeIndex to the selected slide
      this.activeIndex = index;
      // Restart the interval for automatic slide switching
      this.interval = setInterval(() => this.nextSlide(), this.slideInterval);
    },
    prevSlide() {
      this.goToSlide(
        (this.activeIndex - 1 + this.slides.length) % this.slides.length
      );
    },
    nextSlide() {
      this.goToSlide((this.activeIndex + 1) % this.slides.length);
    },
  },
};
</script>

<style>
.carousel-item {
  /* Styles for all slides */
  display: none;
}

.carousel-item.active {
  /* Styles for the active slide */
  display: block;
}

.carousel-width {
  width: 60%;
}
</style>
