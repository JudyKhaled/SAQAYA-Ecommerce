<template>
  <div class="app">
    <BaseHeader @toggle-cart="toggleCart" />
    <main class="main">
      <router-view
        :cartItems="cartItems"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
      />
      <Cart :isOpen="cartOpen" :cartItems="cartItems" @close="toggleCart" />
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
      if (!this.cartItems.find((p) => p.id === product.id)) {
        this.cartItems.push(product);
      }
    },
    removeFromCart(productId: number) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    },
  },
});
</script>
