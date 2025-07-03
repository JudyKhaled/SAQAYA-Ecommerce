import { mount } from '@vue/test-utils';
import Products from '@/views/Products.vue';
import { createStore } from 'vuex';

describe('Products.vue', () => {
  const products = [
    { id: 1, title: 'Product A', price: 10, image: 'a.jpg' },
    { id: 2, title: 'Product B', price: 20, image: 'b.jpg' },
  ];
  const cartItems = [{ id: 1, title: 'Product A', price: 10, image: 'a.jpg', quantity: 1 }];

  const store = createStore({
    modules: {
      products: {
        namespaced: true,
        getters: {
          products: () => products,
          loading: () => false,
        },
        actions: {
          fetchProducts: jest.fn(),
        },
      },
      cartItems: {
        namespaced: true,
        getters: {
          cartItems: () => cartItems,
        },
        actions: {
          addToCart: jest.fn(),
          removeFromCart: jest.fn(),
        },
      },
    },
  });

  it('renders product cards for each product', () => {
    const wrapper = mount(Products, {
      global: { plugins: [store] },
    });
    expect(wrapper.text()).toContain('Product A');
    expect(wrapper.text()).toContain('Product B');
  });

  it('shows loading message if loading', () => {
    const loadingStore = createStore({
      modules: {
        products: {
          namespaced: true,
          getters: {
            products: () => [],
            loading: () => true,
          },
          actions: {
            fetchProducts: jest.fn(),
          },
        },
        cartItems: {
          namespaced: true,
          getters: {
            cartItems: () => [],
          },
          actions: {
            addToCart: jest.fn(),
            removeFromCart: jest.fn(),
          },
        },
      },
    });
    const wrapper = mount(Products, {
      global: { plugins: [loadingStore] },
    });
    expect(wrapper.text()).toContain('Loading products...');
  });
});
