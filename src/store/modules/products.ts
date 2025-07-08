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
  searchQuery: string;
  sortOrder: string; // add sortOrder to state
}

export const useProductsStore = defineStore("products", {
  state: (): ProductsState => ({
    products: [],
    loading: false,
    searchQuery: "",
    sortOrder: "",
  }),
  getters: {
    filteredProducts(state): Product[] {
      let filtered = state.products;
      const q = state.searchQuery.trim().toLowerCase();
      if (q) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(q)
        );
      }
      // Sort logic
      switch (state.sortOrder) {
        case "price-asc":
          filtered = [...filtered].sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filtered = [...filtered].sort((a, b) => b.price - a.price);
          break;
        case "name-asc":
          filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "name-desc":
          filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
          break;
      }
      return filtered;
    },
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
    setSortOrder(order: string) {
      this.sortOrder = order;
    },
  },
});
