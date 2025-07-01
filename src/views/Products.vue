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
            v-if="!isInCart(product.id)"
            class="products-view__add-btn"
            @click="addToCart(product)"
          >
            Add to Cart
          </button>
          <button
            v-else
            class="products-view__remove-btn"
            @click="removeFromCart(product.id)"
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default defineComponent({
  name: "ProductsView",
  props: {
    cartItems: {
      type: Array as () => Product[],
      required: true,
    },
  },
  emits: ["add-to-cart", "remove-from-cart"],
  setup(props, { emit }) {
    const products = ref<Product[]>([]);
    const loading = ref(true);

    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      products.value = await res.json();
      loading.value = false;
    };

    const isInCart = (id: number) =>
      props.cartItems.some((item) => item.id === id);

    const addToCart = (product: Product) => emit("add-to-cart", product);
    const removeFromCart = (id: number) => emit("remove-from-cart", id);

    onMounted(fetchProducts);

    return {
      products,
      loading,
      isInCart,
      addToCart,
      removeFromCart,
    };
  },
});
</script>

<style scoped>
.products-view {
  padding: 2rem;
}

.products-view__toggle-cart {
  background: #ea82b9;
  border: none;
  color: white;
  font-weight: bold;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1rem;
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

.products-view__add-btn,
.products-view__remove-btn {
  background-color: #0d0c4f;
  color: rgb(209, 199, 199);
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.9rem;
  height: 2.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.products-view__remove-btn {
  background-color: #444242;
  color: rgb(243, 235, 235);
}

.products-view__add-btn:hover,
.products-view__remove-btn:hover {
  transform: perspective(400px) translateZ(5px) scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}
</style>
