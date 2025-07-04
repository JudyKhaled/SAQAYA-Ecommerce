<template>
  <div class="products-view">
    <div v-if="loading">Loading products...</div>

    <div v-else class="products-view__grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :isInCart="isInCart(product.id)"
        :hovered="hoveredProduct === product.id"
        @add-to-cart="cartStore.addToCart"
        @remove-from-cart="cartStore.removeFromCart"
        @hover="hoveredProduct = $event"
        @click="goToProduct(product)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useProductsStore } from "@/store/modules/products";
import { useCartItemsStore } from "@/store/modules/cartItems";
import { useSelectedProductStore } from "@/store/modules/selectedProduct";
import { useRouter } from "vue-router";
import ProductCard from "@/components/ProductCard.vue";

const productsStore = useProductsStore();
const cartStore = useCartItemsStore();
const selectedProductStore = useSelectedProductStore();
const router = useRouter();
const hoveredProduct = ref<number | null>(null);

onMounted(() => {
  productsStore.fetchProducts();
});

const isInCart = (id: number) => {
  return cartStore.cartItems.some((item) => item.id === id);
};

const goToProduct = (product: any) => {
  selectedProductStore.selectProduct(product);
  router.push({ name: "ProductDetails", params: { id: product.id } });
};

const products = computed(() => productsStore.products);
const loading = computed(() => productsStore.loading);
const cartItems = computed(() => cartStore.cartItems);
</script>

<script lang="ts">
export default {
  name: "ProductsView",
};
</script>

<style scoped>
.products-view {
  padding: 2rem;
  background: linear-gradient(135deg, #031b34, #0288d1);
}

.products-view__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 1rem;
  margin-top: 4rem;
}
</style>
