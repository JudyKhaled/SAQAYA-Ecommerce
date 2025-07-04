<template>
  <div
    class="products-view__card"
    @mouseenter="$emit('hover', product.id)"
    @mouseleave="$emit('hover', null)"
    :class="{ 'products-view__card--hovered': hovered }"
    @click="$emit('view-product', product)"
  >
    <div class="products-view__card-content">
      <img
        :src="product.image"
        :alt="product.title"
        class="products-view__image"
      />
      <div class="products-view__cart-icon-row">
        <button
          v-if="!isInCart"
          class="products-view__add-btn products-view__cart-icon-btn"
          @click.stop="$emit('add-to-cart', product)"
          title="Add to Cart"
        >
          <i class="fa fa-shopping-cart"></i>
        </button>
        <button
          v-else
          class="products-view__remove-btn products-view__cart-icon-btn"
          @click.stop="$emit('remove-from-cart', product.id)"
          title="Remove from Cart"
        >
          <i class="fa fa-trash"></i>
        </button>
      </div>
      <h3 class="products-view__title">{{ product.title }}</h3>
      <p class="products-view__price">${{ product.price.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
  isInCart: boolean;
  hovered: boolean;
}>();

defineEmits([
  "hover",
  "view-product",
  "add-to-cart",
  "remove-from-cart",
]);
</script>

<style scoped>
.products-view__card,
.products-view__card--hovered {
  border: 1px solid #ddd;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  background: white;
  position: relative;
  width: 420px;
  min-width: 420px;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 450px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 24px rgba(100, 100, 100, 0.18) !important;
  z-index: 2;
}

.products-view__card--hovered {
  box-shadow: 0 8px 30px rgba(33, 33, 33, 0.4) !important;
  transform: translateY(-5px);
}

.products-view__card-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  transition: none;
}

.products-view__image {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

.products-view__title {
  font-size: 1rem;
  margin: 0.5rem 0;
  min-height: 2.5em;
}

.products-view__price {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
  position: absolute;
  left: 50%;
  top: 350px;
  transform: translateX(-50%);
  z-index: 2;
  background: white;
  padding: 0 0.5em;
}

.products-view__cart-icon-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 18px 0 0 0;
  min-height: 40px;
}

.products-view__cart-icon-btn {
  background: none;
  color: #888;
  border: none;
  font-size: 1.7rem;
  cursor: pointer;
  padding: 0.3rem 0.7rem;
  border-radius: 50%;
  box-shadow: none;
  transition: color 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.products-view__cart-icon-btn:hover {
  color: #333;
  background: none;
  transform: scale(1.12);
}
</style>
