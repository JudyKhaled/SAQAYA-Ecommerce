<!-- eslint-disable -->
<template>
  <div>
    <div v-if="isOpen" class="cart-backdrop" @click="$emit('close')"></div>
    <div :class="['cart', { 'cart--open': isOpen }]">
      <div class="cart__content">
        <div class="cart__header">
          <h2 class="cart__title">YOUR CART</h2>
          <button class="cart__close" @click="$emit('close')">&times;</button>
        </div>

        <div v-if="cartItems.length === 0" class="cart__empty">
          <p>YOUR CART IS EMPTY</p>
        </div>

        <ul v-else class="cart__list">
          <li
            v-for="(item, index) in cartItems"
            :key="index"
            class="cart__item"
          >
            <img :src="item.image" :alt="item.title" class="cart__item-image" />

            <div class="cart__item-info">
              <div class="cart__item-header">
                <h4 class="cart__item-title">{{ item.title }}</h4>
                <button
                  class="cart__remove-btn"
                  @click="$emit('delete-from-cart', item.id)"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>

              <div class="cart__item-price">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </div>

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
          <button class="cart__checkout" @click="checkout">CHECKOUT</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import { useCartItemsStore } from "@/store/modules/cartItems";

const props = defineProps<{ isOpen: boolean }>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "add-to-cart", product: any): void;
  (e: "remove-from-cart", id: number): void;
  (e: "delete-from-cart", id: number): void;
}>();

const cartStore = useCartItemsStore();
const cartItems = computed(() => cartStore.cartItems);
const cartTotal = computed(() => cartStore.cartTotal);

function checkout() {
  alert("Checkout not implemented");
}
</script>

<style scoped>
@font-face {
  font-family: "Lulo Clean One";
  src: url("@/assets/fonts/Lulo Clean One.otf") format("opentype");
}

@font-face {
  font-family: "SANS";
  src: url("@/assets/fonts/OpenSans-Light.ttf") format("opentype");
}

@font-face {
  font-family: "Bubble Rainbow";
  src: url("@/assets/fonts/Bubble Rainbow.ttf") format("opentype");
}

.cart-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.cart {
  position: fixed;
  top: 10px;
  bottom: 10px;
  right: 0;
  width: 570px;
  background-color: #ffffff;
  color: #000;
  z-index: 1001;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  transform: translateX(100%);
  transition: transform 0.4s ease;
  overflow: hidden;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
}

.cart__title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: Lulo Clean One;
}

.cart__close {
  position: absolute;
  right: 20px;
  font-size: 30px;
  background: none;
  border: none;
  color: #494646;
  cursor: pointer;
}

.cart__empty {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  height: 80%;
  font-family: Lulo Clean One;
  font-size: 1rem;
}

.cart__list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.cart__item {
  display: flex;
  gap: 16px;
  margin-bottom: 25px;
  align-items: flex-start;
}

.cart__item-image {
  width: 80px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
}

.cart__item-info {
  flex-grow: 1;
  position: relative;
}

.cart__item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart__item-title {
  font-size: 1.3rem;
  margin: 0;
  color: #000;
  font-weight: 600;
  font-family: "SANS";
}

.cart__remove-btn {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #444;
  margin-left: auto;
}

.cart__item-price {
  font-size: 1.1rem;
  color: #ea82b9;
  font-weight: bold;
  margin-top: 0.6rem;
}

.cart__qty-controls {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  font-size: 1rem;
  height: 32px;
  width: fit-content;
  margin-top: 8px;
}

.cart__qty-controls button {
  background: white;
  border: none;
  border-right: 1px solid #ccc;
  width: 48px;
  height: 100%;
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart__qty-controls span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 100%;
  font-weight: bold;
  font-size: 1.2rem;
  border-right: 1px solid #ccc;
  color: #000;
}

.cart__qty-controls button:last-child {
  border-right: none;
}

.cart__footer {
  border-top: 1px solid #333;
  padding-top: 1rem;
  margin-top: 1rem;
}

.cart__total {
  font-weight: bold;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

.cart__checkout {
  width: 100%;
  background: black;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.3rem;
  font-family: "Bubble Rainbow";
}

@media (max-width: 1024px) {
  .cart {
    width: 420px;
    top: 10px;
    bottom: 10px;
    border-radius: 16px;
  }

  .cart__item-title {
    font-size: 1.1rem;
  }

  .cart__item-price {
    font-size: 1rem;
  }

  .cart__checkout {
    font-size: 1.1rem;
    padding: 0.7rem;
  }
}

@media (max-width: 768px) {
  .cart {
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    border-radius: 0;
    transform: translateX(100%);
  }

  .cart--open {
    transform: translateX(0);
  }

  .cart__content {
    padding: 16px;
  }

  .cart__title {
    font-size: 1.1rem;
  }

  .cart__item {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart__item-image {
    width: 100%;
    height: auto;
    max-height: 200px;
  }

  .cart__item-title {
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  .cart__qty-controls {
    font-size: 0.9rem;
    height: 28px;
  }

  .cart__qty-controls button,
  .cart__qty-controls span {
    width: 40px;
    font-size: 1.1rem;
  }

  .cart__total {
    font-size: 1rem;
  }

  .cart__checkout {
    font-size: 1rem;
    padding: 0.6rem;
  }
}

@media (max-width: 480px) {
  .cart__title {
    font-size: 1rem;
  }

  .cart__close {
    font-size: 24px;
    right: 16px;
  }

  .cart__item-title {
    font-size: 0.95rem;
  }

  .cart__item-price {
    font-size: 0.95rem;
  }

  .cart__checkout {
    font-size: 0.95rem;
  }
}
</style>
