<template>
  <div class="products-view">
    <SortDropdown v-model="productsStore.sortOrder" />
    <div v-if="loading">Loading products...</div>

    <div v-else class="products-view__grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :isInCart="isInCart(product.id)"
        :hovered="hoveredProduct === product.id"
        @add-to-cart="
          (p) => {
            cartStore.addToCart(p);
            $emit && $emit('open-cart');
          }
        "
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
import SortDropdown from "@/components/SortDropdown.vue";

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

const products = computed(() => productsStore.filteredProducts);
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
  background-color: #041e3a;
}

.products-view__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 1rem;
  margin-top: 4rem;
}

@media (max-width: 1024px) {
  .products-view {
    padding: 1.5rem;
  }

  .products-view__grid {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .products-view {
    padding: 1rem;
  }

  .products-view__grid {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    gap: 1.25rem;
  }
}

@media (max-width: 480px) {
  .products-view {
    padding: 0.75rem;
  }

  .products-view__grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 2rem;
  }
}
</style>
