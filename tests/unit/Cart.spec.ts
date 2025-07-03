import { mount } from '@vue/test-utils';
import Cart from '@/components/Cart.vue';
import { createStore } from 'vuex';

describe('Cart.vue', () => {
  const cartItems = [
    {
      id: 1,
      title: 'Product One',
      price: 10.5,
      image: 'https://via.placeholder.com/100',
      quantity: 2,
    },
    {
      id: 2,
      title: 'Product Two',
      price: 20.0,
      image: 'https://via.placeholder.com/100',
      quantity: 1,
    },
  ];

  // Provide a mock Vuex store with cartItems module
  const store = createStore({
    modules: {
      cartItems: {
        namespaced: true,
        getters: {
          cartItems: () => cartItems,
          cartTotal: () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        },
        actions: {
          addToCart: jest.fn(),
          removeFromCart: jest.fn(),
        },
      },
    },
  });

  it('renders cart items with title, price, and quantity', () => {
    const wrapper = mount(Cart, {
      props: { isOpen: true },
      global: { plugins: [store] },
    });
    expect(wrapper.text()).toContain('Product One');
    expect(wrapper.text()).toContain('Product Two');
    expect(wrapper.text()).toContain('10.5');
    expect(wrapper.text()).toContain('20.0');
    expect(wrapper.text()).toContain('2');
    expect(wrapper.text()).toContain('1');
  });

  it('emits remove-from-cart when remove button is clicked', async () => {
    const wrapper = mount(Cart, {
      props: { isOpen: true },
      global: { plugins: [store] },
    });
    // Find the first remove button for the first cart item
    const removeButton = wrapper.findAll('.cart__qty-controls button')[0];
    await removeButton.trigger('click');
    expect(wrapper.emitted('remove-from-cart')).toBeTruthy();
    // @ts-expect-error: checked above
    expect(wrapper.emitted('remove-from-cart')[0][0]).toEqual(cartItems[0].id);
  });
});
