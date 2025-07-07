import { defineStore } from "pinia";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  isCartOpen: boolean;
}

export const useCartItemsStore = defineStore("cartItems", {
  state: (): CartState => ({
    cart: [],
    isCartOpen: false,
  }),

  getters: {
    cartItems: (state) => state.cart,
    cartTotal: (state) =>
      state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    addToCart(product: CartItem) {
      const existing = this.cart.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.cart.push({
          ...product,
          quantity:
            product.quantity && product.quantity > 0 ? product.quantity : 1,
        });
      }
    },
    removeFromCart(productId: number) {
      const item = this.cart.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else {
        this.cart = this.cart.filter((item) => item.id !== productId);
      }
    },
    deleteFromCart(productId: number) {
      this.cart = this.cart.filter((item) => item.id !== productId);
    },
    clearCart() {
      this.cart = [];
    },
    openCart() {
      this.isCartOpen = true;
    },
    closeCart() {
      this.isCartOpen = false;
    },
  },
});
