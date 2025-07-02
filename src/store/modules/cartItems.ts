import { Module } from "vuex";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
}

const cartItems: Module<CartState, any> = {
  namespaced: true,
  state: () => ({
    cart: [],
  }),
  mutations: {
    ADD_TO_CART(state, product: CartItem) {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    REMOVE_FROM_CART(state, productId: number) {
      const item = state.cart.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else {
        state.cart = state.cart.filter((item) => item.id !== productId);
      }
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
  },
  actions: {
    addToCart({ commit }, product: CartItem) {
      commit("ADD_TO_CART", product);
    },
    removeFromCart({ commit }, productId: number) {
      commit("REMOVE_FROM_CART", productId);
    },
    clearCart({ commit }) {
      commit("CLEAR_CART");
    },
  },
  getters: {
    cartItems: (state) => state.cart,
    cartTotal: (state) =>
      state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
};

export default cartItems;
