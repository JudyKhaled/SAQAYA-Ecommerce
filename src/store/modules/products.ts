import { defineStore } from "pinia";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
}

export const useProductsStore = defineStore("products", {
  state: (): ProductsState => ({
    products: [],
    loading: false,
  }),
  getters: {
    allProducts: (state) => state.products,
    isLoading: (state) => state.loading,
  },
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        this.products = data;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
