<template>
  <div class="product-details" v-if="product">
    <img
      :src="product.image"
      :alt="product.title"
      class="product-details__image"
    />
    <h2 class="product-details__title">{{ product.title }}</h2>
    <p class="product-details__price">${{ product.price.toFixed(2) }}</p>
    <p class="product-details__description">{{ product.description }}</p>
    <button
      @click="cartStore.addToCart({ ...product, quantity: 1 })"
      class="product-details__add-btn"
    >
      <i class="fa fa-shopping-cart"></i> Add to Cart
    </button>
  </div>
  <div v-else>
    <p>Product not found.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSelectedProductStore } from "@/store/modules/selectedProduct";
import { useCartItemsStore } from "@/store/modules/cartItems";

const selectedProductStore = useSelectedProductStore();
const cartStore = useCartItemsStore();

const product = computed(() => selectedProductStore.selectedProduct);
</script>

<style scoped>
.product-details {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  text-align: center;
}
.product-details__image {
  width: 100%;
  max-width: 300px;
  height: 300px;
  object-fit: contain;
  margin-bottom: 1rem;
}
.product-details__title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.product-details__price {
  color: #ea82b9;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.product-details__description {
  margin-bottom: 1.5rem;
  color: #333;
}
.product-details__add-btn {
  background: #0d0c4f;
  color: #fff;
  border: none;
  padding: 0.7rem 2.2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.2s;
}
.product-details__add-btn:hover {
  background: #ea82b9;
  color: #0d0c4f;
}
</style>
