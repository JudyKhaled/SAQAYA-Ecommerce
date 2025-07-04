import { defineStore } from "pinia";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface SelectedProductState {
  product: Product | null;
}

export const useSelectedProductStore = defineStore("selectedProduct", {
  state: (): SelectedProductState => ({
    product: null,
  }),

  actions: {
    selectProduct(product: Product) {
      this.product = product;
    },
    clearProduct() {
      this.product = null;
    },
  },

  getters: {
    selectedProduct: (state) => state.product,
  },
});
