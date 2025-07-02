import { Module } from "vuex";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export interface SelectedProductState {
  product: Product | null;
}

const selectedProduct: Module<SelectedProductState, any> = {
  namespaced: true,
  state: () => ({
    product: null,
  }),
  mutations: {
    SET_SELECTED_PRODUCT(state, product: Product) {
      state.product = product;
    },
    CLEAR_SELECTED_PRODUCT(state) {
      state.product = null;
    },
  },
  actions: {
    selectProduct({ commit }, product: Product) {
      commit("SET_SELECTED_PRODUCT", product);
    },
    clearProduct({ commit }) {
      commit("CLEAR_SELECTED_PRODUCT");
    },
  },
  getters: {
    selectedProduct: (state) => state.product,
  },
};

export default selectedProduct;
