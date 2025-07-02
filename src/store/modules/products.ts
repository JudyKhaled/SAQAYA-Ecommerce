import { Module } from "vuex";

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

const products: Module<ProductsState, any> = {
  namespaced: true,
  state: () => ({
    products: [],
    loading: false,
  }),
  mutations: {
    SET_PRODUCTS(state, products: Product[]) {
      state.products = products;
    },
    SET_LOADING(state, loading: boolean) {
      state.loading = loading;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit("SET_LOADING", true);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        commit("SET_PRODUCTS", data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    products: (state) => state.products,
    loading: (state) => state.loading,
  },
};

export default products;
