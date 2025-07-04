<!-- eslint-disable -->
<template>
  <div :class="['cart', { 'cart--open': isOpen }]">
    <div class="cart__content">
      <div class="cart__header">
        <h2 class="cart__title">My Cart</h2>
        <button class="cart__close" @click="$emit('close')">&times;</button>
      </div>

      <div v-if="cartItems.length === 0" class="cart__empty">
        <p>No items in cart</p>
      </div>

      <ul v-else class="cart__list">
        <li v-for="(item, index) in cartItems" :key="index" class="cart__item">
          <img :src="item.image" :alt="item.title" class="cart__item-image" />
          <div class="cart__item-info">
            <h4 class="cart__item-title">{{ item.title }}</h4>
            <p class="cart__item-price">
              ${{ item.price.toFixed(2) }} × {{ item.quantity }}
            </p>

            <div class="cart__qty-controls">
              <button @click="$emit('remove-from-cart', item.id)">−</button>
              <span>{{ item.quantity }}</span>
              <button @click="$emit('add-to-cart', item)">+</button>
            </div>
          </div>
        </li>
      </ul>

      <div v-if="cartItems.length > 0" class="cart__footer">
        <p class="cart__total">Total: ${{ cartTotal.toFixed(2) }}</p>
        <button class="cart__checkout" @click="checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import { useCartItemsStore } from "@/store/modules/cartItems";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "add-to-cart", product: any): void;
  (e: "remove-from-cart", id: number): void;
}>();

const cartStore = useCartItemsStore();
const cartItems = computed(() => cartStore.cartItems);
const cartTotal = computed(() => cartStore.cartTotal);

function checkout() {
  alert("Checkout not implemented");
}
</script>

<style scoped>
.cart {
  position: fixed;
  top: 70px;
  right: 0;
  width: 300px;
  height: calc(100vh - 70px);
  background-color: #01013f;
  color: #fff;
  z-index: 1000;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  transition: transform 0.5s ease;
  display: flex;
  flex-direction: column;
}

.cart--open {
  transform: translateX(0);
}

.cart__content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

.cart__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.cart__title {
  font-size: 1.5rem;
  margin: 0;
}

.cart__close {
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #ea82b9;
  cursor: pointer;
}

.cart__empty {
  text-align: center;
  color: #999;
  margin-top: 2rem;
}

.cart__list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.cart__item {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.cart__item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
}

.cart__item-info {
  flex-grow: 1;
}

.cart__item-title {
  font-size: 0.9rem;
  margin: 0;
  color: #fff;
}

.cart__item-price {
  font-size: 0.85rem;
  color: #ea82b9;
}

.cart__qty-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
}

.cart__qty-controls button {
  background-color: #ea82b9;
  border: none;
  color: white;
  font-size: 1rem;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  text-align: center;
  line-height: 24px;
}

.cart__qty-controls span {
  font-weight: bold;
  min-width: 20px;
  text-align: center;
}

.cart__footer {
  border-top: 1px solid #333;
  padding-top: 1rem;
  margin-top: 1rem;
}

.cart__total {
  font-weight: bold;
  margin-bottom: 0.8rem;
}

.cart__checkout {
  width: 100%;
  background: #454545;
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 5px;
  cursor: pointer;
}
</style>
