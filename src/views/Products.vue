<template>
  <div class="products-view">
    <center>
      <h1 style="font-size: 5rem; color: #01013f">Products</h1>
    </center>

    <div v-if="loading">Loading products...</div>

    <div v-else class="products-view__grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :isInCart="isInCart(product.id)"
        :hovered="hoveredProduct === product.id"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
        @hover="hoveredProduct = $event"
        @click="goToProduct(product)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import ProductCard from "@/components/ProductCard.vue";
import ProductDetails from "./ProductDetails.vue";

export default defineComponent({
  name: "ProductsView",
  components: { ProductCard },
  data() {
    return {
      hoveredProduct: null as number | null,
    };
  },
  computed: {
    ...mapGetters("products", ["products", "loading"]),
    ...mapGetters("cartItems", ["cartItems"]),
  },
  methods: {
    ...mapActions("products", ["fetchProducts"]),
    ...mapActions("cartItems", ["addToCart", "removeFromCart"]),
    isInCart(id: number) {
      return this.cartItems.some((item: any) => item.id === id);
    },
    // eslint-disable-next-line
    goToProduct(product: any) {
      this.$store.dispatch("selectedProduct/selectProduct", product);
      this.$router.push({ name: "ProductDetails", params: { id: product.id } });
    },
  },
  mounted() {
    this.fetchProducts();
  },
});
</script>

<style scoped>
.products-view {
  padding: 2rem;
}

.products-view__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}
</style>
