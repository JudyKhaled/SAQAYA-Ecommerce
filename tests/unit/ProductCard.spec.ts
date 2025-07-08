import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard.vue';

describe('ProductCard.vue', () => {
  const product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    image: 'test.jpg',
  };

  it('renders product info', () => {
    const wrapper = mount(ProductCard, {
      props: { product, isInCart: false, hovered: false },
    });
    expect(wrapper.text()).toContain('Test Product');
    expect(wrapper.text()).toContain('99.99');
  });
});
