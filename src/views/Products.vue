<template>
  <div class="products-view">
    <center>
      <h1 style="font-size: 5rem; color: #01013f">Products</h1>
    </center>

    <div v-if="loading">Loading products...</div>

    <div v-else-if="selectedProduct" class="products-view__detail">
      <img
        :src="selectedProduct.image"
        :alt="selectedProduct.title"
        class="products-view__detail-image"
      />
      <h2 class="products-view__detail-title">{{ selectedProduct.title }}</h2>
      <p class="products-view__detail-price">
        ${{ selectedProduct.price.toFixed(2) }}
      </p>
      <p class="products-view__detail-desc">
        This is a sample product description. You can customize this text based
        on your data.
      </p>
      <button
        class="products-view__add-btn"
        @click="addToCart(selectedProduct)"
      >
        Add to Cart
      </button>
      <div class="products-view__back-container">
        <button class="products-view__back-btn" @click="closeProductView">
          ← Back
        </button>
      </div>
    </div>

    <div v-else class="products-view__grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="products-view__card"
        @click="viewProduct(product)"
        style="cursor: pointer"
      >
        <img
          :src="product.image"
          :alt="product.title"
          class="products-view__image"
        />
        <h3 class="products-view__title">{{ product.title }}</h3>
        <p class="products-view__price">${{ product.price.toFixed(2) }}</p>

        <div class="products-view__actions" @click.stop>
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
    const selectedProduct = ref<Product | null>(null);

    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      products.value = await res.json();
      loading.value = false;
    };

    const isInCart = (id: number) =>
      props.cartItems.some((item) => item.id === id);

    const addToCart = (product: Product) => emit("add-to-cart", product);
    const removeFromCart = (id: number) => emit("remove-from-cart", id);

    const viewProduct = (product: Product) => {
      selectedProduct.value = product;
    };

    const closeProductView = () => {
      selectedProduct.value = null;
    };

    onMounted(fetchProducts);

    return {
      products,
      loading,
      selectedProduct,
      viewProduct,
      closeProductView,
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
  transition: box-shadow 0.2s ease;
}

.products-view__card:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.12);
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
  gap: 0.5rem;
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

.products-view__detail {
  text-align: center;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
  background-color: white;
  border-radius: 25px;
}

.products-view__detail-image {
  height: 250px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.products-view__detail-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.products-view__detail-price {
  color: #333;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.products-view__detail-desc {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.products-view__back-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.products-view__back-btn {
  background: none;
  border: none;
  font-size: 1rem;
  color: #4d4d4d;
  cursor: pointer;
  padding: 0;
}
</style>
