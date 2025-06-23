<template>
  <div class="app">
    <BaseHeader @toggle-cart="toggleCart" />
    <main class="main">
      <router-view />
      <Cart :isOpen="cartOpen" @toggle-cart="toggleCart" />
    </main>
    <BaseFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseHeader from "./components/Header.vue";
import BaseFooter from "./components/Footer.vue";
import Cart from "./components/Cart.vue";

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
    };
  },
  methods: {
    toggleCart() {
      this.cartOpen = !this.cartOpen;
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
}

router-view {
  flex: 1;
  display: block;
}
</style>
