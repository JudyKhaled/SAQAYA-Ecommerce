import { defineStore } from "pinia";

export const useSliderStore = defineStore("slider", {
  state: () => ({
    currentSlide: 0,
    totalSlides: 0,
  }),
  actions: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    },
    resetSlide() {
      this.currentSlide = 0;
    },
  },
});
