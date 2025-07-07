<template>
  <div class="product-details" v-if="product">
    <div class="product-details__content">
      <div class="product-details__image-card">
        <img
          :src="product.image"
          :alt="product.title"
          class="product-details__image"
        />
      </div>

      <div class="product-details__info">
        <h2 class="product-details__title">{{ product.title }}</h2>
        <p class="product-details__price">${{ product.price.toFixed(2) }}</p>
        <p class="product-details__description">{{ product.description }}</p>

        <div class="product-details__quantity-wrapper">
          <label class="product-details__quantity-label">Quantity:</label>
          <div class="product-details__quantity-controls">
            <button @click="decreaseQty">−</button>
            <span>{{ quantity }}</span>
            <button @click="increaseQty">+</button>
          </div>
        </div>

        <div class="product-details__add-btn-container">
          <button @click="addToCart" class="product-details__add-btn">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Product not found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
import { useSelectedProductStore } from "@/store/modules/selectedProduct";
import { useCartItemsStore } from "@/store/modules/cartItems";

const emit = defineEmits<{
  (e: "open-cart"): void;
}>();

const selectedProductStore = useSelectedProductStore();
const cartStore = useCartItemsStore();

const product = computed(() => selectedProductStore.selectedProduct);
const quantity = ref(1);

function increaseQty() {
  quantity.value++;
}
function decreaseQty() {
  if (quantity.value > 1) quantity.value--;
}
function addToCart() {
  if (!product.value) return;

  cartStore.addToCart({
    ...product.value,
    quantity: quantity.value,
  });

  emit("open-cart");
}
</script>

<style scoped>
@font-face {
  font-family: "Lulo Clean One";
  src: url("@/assets/fonts/Lulo Clean One.otf") format("opentype");
}
@font-face {
  font-family: "Lulo Clean One Bold";
  src: url("@/assets/fonts/Lulo Clean One Bold.otf") format("opentype");
}
@font-face {
  font-family: "Bubble Rainbow";
  src: url("@/assets/fonts/Bubble Rainbow.ttf") format("truetype");
}
@font-face {
  font-family: "Taz";
  src: url("@/assets/fonts/Taz-SemiLight.otf") format("truetype");
}
@font-face {
  font-family: "SANS";
  src: url("@/assets/fonts/OpenSans-Light.ttf") format("truetype");
}

.product-details {
  padding-top: 6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
  padding-bottom: 0;
  background-color: #041e3a;
}

.product-details__content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.product-details__image-card {
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  max-width: 400px;
  width: 100%;
}

.product-details__image {
  width: 100%;
  object-fit: contain;
  border-radius: 10px;
}

.product-details__info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-details__title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: rgb(188, 189, 189);
  font-family: "Taz";
}

.product-details__price {
  font-size: 1.8rem;
  color: #ea82b9;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: "Bubble Rainbow";
}

.product-details__description {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  max-width: 600px;
  color: rgb(188, 189, 189);
  font-family: "SANS";
}

.product-details__quantity-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
  font-family: "Bubble Rainbow";
}

.product-details__quantity-label {
  font-size: 1.2rem;
  color: rgb(188, 189, 189);
  margin-bottom: 0.7rem;
  font-family: "SANS";
  font-weight: bold;
  margin-left: 0.8rem;
}

.product-details__quantity-controls {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: 2px solid rgb(188, 189, 189);
  font-family: "Bubble Rainbow";
  font-size: 1.8rem;
  min-width: 200px;
  color: rgb(188, 189, 189);
}

.product-details__quantity-controls button {
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  color: rgb(188, 189, 189);
  font-weight: bold;
  padding: 0 0.5rem;
  line-height: 1;
  font-family: "Bubble Rainbow";
}

.product-details__add-btn-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;
}

.product-details__add-btn {
  position: relative;
  background: black;
  color: white;
  font-size: 1.8rem;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
  width: 100%;
  max-width: 600px;
  min-height: 70px;
  transition: color 0.3s ease, background-color 0.3s ease;
  text-align: center;
  z-index: 1;
  overflow: hidden;
  font-family: "Bubble Rainbow";
}

.product-details__add-btn::after {
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
  z-index: 2;
}

.product-details__add-btn:hover {
  background-color: black;
  color: white;
}

.product-details__add-btn:hover::after {
  transform: scaleX(1);
}
</style>
