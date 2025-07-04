<template>
  <div class="app">
    <BaseHeader @toggle-cart="toggleCart" />
    <main class="main">
      <router-view
        :cartItems="cartItems"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
      />
      <Cart
        :isOpen="cartOpen"
        :cartItems="cartItems"
        @close="toggleCart"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
      />
    </main>
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useCartItemsStore } from "@/store/modules/cartItems";
import BaseHeader from "./components/Header.vue";
import BaseFooter from "./components/Footer.vue";
import Cart from "./components/Cart.vue";

const cartStore = useCartItemsStore();

const cartOpen = ref(false);

const toggleCart = () => {
  cartOpen.value = !cartOpen.value;
};

const addToCart = (product: any) => {
  cartStore.addToCart(product);
};

const removeFromCart = (productId: number) => {
  cartStore.removeFromCart(productId);
};

onMounted(() => {
  const stored = localStorage.getItem("my-cart");
  if (stored) {
    const parsed = JSON.parse(stored);
    parsed.forEach((item: any) => cartStore.addToCart(item));
  }
});

watch(
  () => cartStore.cartItems,
  (newCart) => {
    localStorage.setItem("my-cart", JSON.stringify(newCart));
  },
  { deep: true }
);

const cartItems = cartStore.cartItems;
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  padding-top: 0;
}
</style>
