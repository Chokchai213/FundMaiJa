<template>
  <!-- Carousel -->
  <div id="indicators-carousel" class="relative w-full" data-carousel="slide">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-visible md:h-96">
      <!-- Carousel items -->
      <div
        v-for="(item, index) in news"
        :key="index"
        :class="{ 'carousel-item': true, active: activeIndex === index }"
      >
        <!-- Available content -->
        <a
          v-if="
            item.urlToImage !== null &&
            item.urlToImage !== undefined &&
            item.urlToImage !== ''
          "
          target="_blank"
          :href="item.url"
        >
          <img
            :src="item.urlToImage"
            class="absolute block w-full h-full object-fill"
          />
          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4"
          >
            <h2 class="text-white text-lg md:text-xl font-semibold">
              {{ item.title }}
            </h2>
            <p class="text-white text-sm md:text-base">
              {{ item.description }}
            </p>
          </div>
        </a>
        <!-- Unavailable content -->
        <a
          v-else-if="
            item.url !== null &&
            item.url !== undefined &&
            item.urlToImage !== ''
          "
          target="_blank"
          :href="item.url"
        >
          <img
            :src="'Image_not_available.png'"
            class="absolute block w-full h-full object-fill"
          />
          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4"
          >
            <h2 class="text-black text-lg md:text-xl font-semibold">
              {{ item.title }}
            </h2>
            <p class="text-black text-sm md:text-base">
              {{ item.description }}
            </p>
          </div>
        </a>
        <div v-else>
          <img
            :src="'this-content-is-not-available.gif'"
            class="absolute block w-full h-full object-fill"
          />
        </div>
      </div>
    </div>
    <!-- Slider indicators -->
    <div
      class="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2"
    >
      <button
        v-for="(slide, index) in slides"
        :key="index"
        type="button"
        :class="{
          'w-3 h-3 rounded-full': true,
          'bg-black': activeIndex === index,
          'bg-gray-400': activeIndex !== index,
        }"
        aria-current="true"
        :aria-label="`Slide ${index + 1}`"
        @click="goToSlide(index)"
      ></button>
    </div>
    <!-- Slider controls -->
    <button
      type="button"
      class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-prev
      @click="prevSlide"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button
      type="button"
      class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-next
      @click="nextSlide"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>

  <!-- Card -->
  <!-- <div
    class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <img
        class="rounded-t-lg"
        src="https://via.placeholder.com/800x400?text=Second+Slide"
        alt=""
      />
    </a>
    <div class="p-5">
      <a href="#">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Noteworthy technology acquisitions 2021
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
      <a
        href="#"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  </div> -->
</template>

<script>
import axios from "axios";
import { getCookie } from '../utils/CookieUtils';
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
      slides: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      ],
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
          this.news.push({
            title: article.title,
            urlToImage: article.urlToImage,
            description: article.description,
            url: article.url,
          });
        });
      })
      .finally(() => {
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
      console.log(this.activeIndex);
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
</style>