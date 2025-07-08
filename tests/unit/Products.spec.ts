import { mount } from '@vue/test-utils';
import Products from '@/views/Products.vue';
import { createTestingPinia } from '@pinia/testing';

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  go: jest.fn(),
};

describe('Products.vue', () => {
  it('renders products view and SortDropdown', () => {
    const wrapper = mount(Products, {
      global: {
        plugins: [createTestingPinia()],
        stubs: ['ProductCard', 'SortDropdown'],
        mocks: {
          $router: mockRouter,
        },
        provide: {
          router: mockRouter,
        },
      },
    });
    expect(wrapper.findComponent({ name: 'SortDropdown' }).exists()).toBe(true);
  });
});
