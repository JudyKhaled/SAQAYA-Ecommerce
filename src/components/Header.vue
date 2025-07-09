<!-- Header.vue -->
<!-- eslint-disable -->
<!-- prettier-ignore -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="header">
    <div class="nav-container">
      <button class="hamburger" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <i class="fa fa-bars"></i>
      </button>

      <router-link to="/" class="logo-wrapper">
        <img src="@/assets/imgs/logo.png" alt="Logo" class="logo" />
      </router-link>

      <nav class="nav-links">
        <router-link to="/" exact-active-class="active">Home</router-link>
        <router-link to="/products" exact-active-class="active">Products</router-link>
        <router-link to="/contact" exact-active-class="active">Contact</router-link>
      </nav>

      <div class="nav-actions">
        <input
          type="text"
          placeholder="Search Products..."
          class="search-input"
          v-model="searchQuery"
        />
        <button
          @click="$emit('toggle-cart')"
          class="cart-button"
          title="Open Cart"
        >
          <i class="fa-solid fa-cart-shopping fa-sm"></i>
        </button>
      </div>
    </div>

    <div v-if="isMobileMenuOpen" class="mobile-menu">
      <router-link to="/" exact-active-class="active" @click="isMobileMenuOpen = false">Home</router-link>
      <router-link to="/products" exact-active-class="active" @click="isMobileMenuOpen = false">Products</router-link>
      <router-link to="/contact" exact-active-class="active" @click="isMobileMenuOpen = false">Contact</router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useProductsStore } from "@/store/modules/products";

const productStore = useProductsStore();
const { searchQuery } = storeToRefs(productStore);
const isMobileMenuOpen = ref(false);
</script>

<style scoped>
@font-face {
  font-family: "Bubble Rainbow";
  src: url("@/assets/fonts/Bubble Rainbow.ttf") format("truetype");
}

.header,
.header *:not(i):not(.fa):not(.fa-solid) {
  font-family: "Bubble Rainbow", cursive, sans-serif;
}

.header {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  background: #000;
  border-radius: 999px;
  padding: 20px 40px;
  display: flex;
  justify-content: center;
  z-index: 999;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  height: 6rem;
}

.nav-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  justify-content: space-between;
  position: relative;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
  border-radius: 999px;
  background: white;
  padding: 6px;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: white;
  cursor: pointer;
  z-index: 1001;
}

.nav-links {
  display: flex;
  gap: 6rem;
  padding: 10px 24px;
  margin-left: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 2rem;
}

.nav-links a.active {
  color: #ea82b9;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  border-radius: 999px;
}

.search-input {
  border: none;
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 1rem;
  outline: none;
  width: 230px;
}

.cart-button {
  background-color: #000;
  color: #ea82b9;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  transition: background 0.2s, color 0.2s;
  border: none;
}

.cart-button i {
  font-family: "Font Awesome 6 Free", "FontAwesome", sans-serif !important;
  font-weight: 900 !important;
  font-size: 1.3rem;
  color: inherit;
}

@media (max-width: 768px) {
  .nav-links,
  .search-input {
    display: none;
  }

  .hamburger {
    display: block;
  }

  .logo-wrapper {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .mobile-menu {
    position: absolute;
    top: 6rem;
    left: 0;
    width: 100%;
    background-color: #000;
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    z-index: 998;
  }

  .mobile-menu a {
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem 0;
    text-decoration: none;
  }

  .mobile-menu a.active {
    color: #ea82b9;
  }
}
</style>
