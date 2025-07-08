import { mount } from '@vue/test-utils';
import Cart from '@/components/Cart.vue';
import { createTestingPinia } from '@pinia/testing';

const cartItem = {
  id: 1,
  title: 'Test Product',
  price: 10,
  image: 'test.jpg',
  quantity: 2,
};

describe('Cart.vue', () => {
  it('renders cart title', () => {
    const wrapper = mount(Cart, {
      props: { isOpen: true },
      global: {
        plugins: [createTestingPinia({ initialState: { cartItems: { cart: [] } } })],
        stubs: ['font-awesome-icon'],
      },
    });
    expect(wrapper.text()).toContain('YOUR CART');
  });

  it('shows empty cart message', () => {
    const wrapper = mount(Cart, {
      props: { isOpen: true },
      global: {
        plugins: [createTestingPinia({ initialState: { cartItems: { cart: [] } } })],
        stubs: ['font-awesome-icon'],
      },
    });
    expect(wrapper.text()).toContain('YOUR CART IS EMPTY');
  });

  it('renders cart items and total', () => {
    const wrapper = mount(Cart, {
      props: { isOpen: true },
      global: {
        plugins: [createTestingPinia({ initialState: { cartItems: { cart: [cartItem] } } })],
        stubs: ['font-awesome-icon'],
      },
    });
    expect(wrapper.text()).toContain('Test Product');
    expect(wrapper.text()).toContain('$20.00');
    expect(wrapper.text()).toContain('Total: $20.00');
  });

  it('emits close event when backdrop or close button is clicked', async () => {
    const wrapper = mount(Cart, {
      props: { isOpen: true },
      global: {
        plugins: [createTestingPinia({ initialState: { cartItems: { cart: [cartItem] } } })],
        stubs: ['font-awesome-icon'],
      },
    });
    await wrapper.find('.cart-backdrop').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
    await wrapper.find('.cart__close').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('emits add-to-cart, remove-from-cart, and delete-from-cart events', async () => {
    const wrapper = mount(Cart, {
      props: { isOpen: true },
      global: {
        plugins: [createTestingPinia({ initialState: { cartItems: { cart: [cartItem] } } })],
        stubs: ['font-awesome-icon'],
      },
    });
    await wrapper.find('.cart__remove-btn').trigger('click');
    expect(wrapper.emitted('delete-from-cart')).toBeTruthy();
    await wrapper.findAll('.cart__qty-controls button')[0].trigger('click');
    expect(wrapper.emitted('remove-from-cart')).toBeTruthy();
    await wrapper.findAll('.cart__qty-controls button')[1].trigger('click');
    expect(wrapper.emitted('add-to-cart')).toBeTruthy();
  });
});
