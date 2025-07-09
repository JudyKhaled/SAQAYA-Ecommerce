<template>
  <div class="hero-slider">
    <div class="slider-text">
      <h1 class="headline">GET UP TO 30% OFF ON NEW ARRIVALS</h1>
      <router-link to="/products" class="shop-btn">Shop Now</router-link>
    </div>

    <div class="slider-overlay"></div>

    <div
      class="slider-track"
      :style="{
        transform: `translateX(-${sliderStore.currentSlide * 100}%)`,
      }"
    >
      <div class="hero-slide" v-for="(slide, index) in slides" :key="index">
        <img :src="slide" alt="Hero slide" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { useSliderStore } from "@/store/modules/slider";

const sliderStore = useSliderStore();

const slides = [
  new URL("@/assets/imgs/headphones.png", import.meta.url).href,
  new URL("@/assets/imgs/controller.png", import.meta.url).href,
];

sliderStore.totalSlides = slides.length;

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  interval = setInterval(() => {
    sliderStore.nextSlide();
  }, 5000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style scoped>
:global(html, body, #app) {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #000;
}

.hero-slider {
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
  z-index: 0;
  background: #000;
  margin-top: -70px;
}

.slider-track {
  display: flex;
  transition: transform 1s ease-in-out;
  width: 100vw;
  height: 100vh;
}

.hero-slide {
  flex: 0 0 100vw;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.hero-slide img {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  display: block;
}

.slider-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent);
  z-index: 1;
  pointer-events: none;
}

.slider-text {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  color: #fff;
  max-width: 480px;
  padding: 1.5rem 2rem;
}

.headline {
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  margin-left: 30px;
}

.shop-btn {
  position: relative;
  display: inline-block;
  background-color: black;
  color: white;
  padding: 1rem 5rem;
  border-radius: 999px;
  font-weight: bold;
  font-size: 1.8rem;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;
  overflow: hidden;
  margin-top: 4rem;
}

.shop-btn::after {
  content: "";
  position: absolute;
  left: 15%;
  bottom: 12px;
  width: 70%;
  height: 2px;
  background-color: white;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  border-radius: 2px;
}

.shop-btn:hover {
  background-color: black;
  color: white;
}

.shop-btn:hover::after {
  transform: scaleX(1);
}

@media (max-width: 1024px) {
  .slider-text {
    max-width: 400px;
    left: 8%;
    padding: 1rem 1.5rem;
  }

  .headline {
    font-size: 2.6rem;
    margin-left: 10px;
  }

  .shop-btn {
    font-size: 1.5rem;
    padding: 0.9rem 4rem;
    margin-top: 3rem;
  }
}

@media (max-width: 768px) {
  .slider-text {
    max-width: 90%;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 1rem;
  }

  .headline {
    font-size: 2rem;
    margin: 0 auto 1rem;
  }

  .shop-btn {
    font-size: 1.3rem;
    padding: 0.8rem 3rem;
  }
}

@media (max-width: 480px) {
  .headline {
    font-size: 1.6rem;
    line-height: 1.4;
  }

  .shop-btn {
    font-size: 1.1rem;
    padding: 0.7rem 2.5rem;
  }

  .slider-text {
    top: 55%;
  }
}
</style>
