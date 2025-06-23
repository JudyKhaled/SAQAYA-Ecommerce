<template>
  <header class="header">
    <!-- First row: logo + nav + search + cart -->
    <div class="header__top-row">
      <div class="header__logo">JUJU'S</div>

      <nav class="header__nav">
        <router-link to="/"><b>Home</b></router-link>
        <router-link to="/products"><b>Products</b></router-link>
        <router-link to="/contact"><b>Contact</b></router-link>
      </nav>

      <div class="header__search-container">
        <input
          type="text"
          class="header__search"
          placeholder="Search..."
          v-model="searchQuery"
        />
      </div>

      <button class="header__cart-button" @click="$emit('toggle-cart')">
        <i
          class="fa-solid fa-cart-shopping fa-sm"
          style="color: #ea82b9; font-size: 17px"
        ></i>
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import "../assets/styles/main.css";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BaseHeader",
  setup() {
    const searchQuery = ref("");
    return { searchQuery };
  },
});
</script>

<style scoped>
/* === Desktop-First Styles === */
.header {
  background-color: #01013f;
  color: #ea82b9;
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
}

.header__top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  gap: 1rem;
}

.header__logo {
  font-weight: bold;
  font-size: 1.2rem;
  /* margin-left: -20rem; */
}

.header__nav {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.header__nav a {
  color: #ea82b9;
  text-decoration: none;
  font-weight: bold;
}

.header__nav a:hover {
  text-decoration: underline;
}

.header__search-container {
  flex-shrink: 0;
}

.header__search {
  width: 200px;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  outline: none;
  font-size: 0.9rem;
  color: #333;
}

.header__cart-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: 1rem;
  /* margin-right: -20rem; */
}

/* === Mobile Adjustments === */
@media (max-width: 480px) {
  .header__top-row {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  .header__logo {
    font-weight: bold;
    font-size: 1.2rem;
    flex-basis: 100%;
  }

  .header__nav {
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .header__search-container {
    width: 100%;
  }

  .header__search {
    width: 100%;
  }

  .header__cart-button {
    margin-left: auto;
  }
}
</style>
