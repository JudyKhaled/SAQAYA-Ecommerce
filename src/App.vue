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

<script lang="ts">
import { defineComponent } from "vue";
import BaseHeader from "./components/Header.vue";
import BaseFooter from "./components/Footer.vue";
import Cart from "./components/Cart.vue";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number;
}

export default defineComponent({
  name: "App",
  components: {
    BaseHeader,
    BaseFooter,
    Cart,
  },
  data() {
    return {
      cartOpen: false,
      cartItems: [] as Product[],
    };
  },
  created() {
    const stored = localStorage.getItem("my-cart");
    if (stored) {
      this.cartItems = JSON.parse(stored);
    }
  },
  watch: {
    cartItems: {
      handler(newCart) {
        localStorage.setItem("my-cart", JSON.stringify(newCart));
      },
      deep: true,
    },
  },
  methods: {
    toggleCart() {
      this.cartOpen = !this.cartOpen;
    },
    addToCart(product: Product) {
      const existing = this.cartItems.find((p) => p.id === product.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId: number) {
      const index = this.cartItems.findIndex((item) => item.id === productId);
      if (index !== -1) {
        const item = this.cartItems[index];
        if ((item.quantity || 1) > 1) {
          item.quantity!--;
        } else {
          this.cartItems.splice(index, 1);
        }
      }
    },
  },
});
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
  padding-top: 70px; /* match fixed header height */
}
</style>
