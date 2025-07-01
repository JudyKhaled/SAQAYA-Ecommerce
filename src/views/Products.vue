<template>
  <div class="products-view">
    <center>
      <h1 style="font-size: 5rem; color: #01013f">Products</h1>
    </center>

    <div v-if="loading">Loading products...</div>

    <div v-else class="products-view__grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="products-view__card"
      >
        <img
          :src="product.image"
          :alt="product.title"
          class="products-view__image"
        />
        <h3 class="products-view__title">{{ product.title }}</h3>
        <p class="products-view__price">${{ product.price.toFixed(2) }}</p>

        <div class="products-view__actions">
          <button
            class="products-view__add-btn"
            @click="handleAddToCart(product)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default defineComponent({
  name: "ProductsView",
  setup() {
    const products = ref<Product[]>([]);
    const loading = ref<boolean>(true);

    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        products.value = data;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        loading.value = false;
      }
    };

    const handleAddToCart = (product: Product) => {
      console.log("Added to cart:", product);
    };

    onMounted(() => {
      fetchProducts();
    });

    return {
      products,
      loading,
      handleAddToCart,
    };
  },
});
</script>

<style scoped>
.products-view {
  padding: 2rem;
}

.products-view__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.products-view__card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  background: white;
  height: 100%;
  min-height: 360px;
}

.products-view__image {
  height: 150px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.products-view__title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.products-view__price {
  color: #333;
  font-weight: bold;
  margin-bottom: 0.75rem;
}

.products-view__actions {
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
}

.products-view__add-btn {
  background-color: #01013f;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
}
</style>
