import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard.vue';

describe('ProductCard.vue', () => {
  const product = {
    id: 42,
    title: 'Sample Product',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
  };

  it('displays title, price, and image', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product,
        isInCart: false,
        hovered: false,
      },
    });

    expect(wrapper.text()).toContain('Sample Product');
    expect(wrapper.text()).toContain('19.99');
    expect(wrapper.find('img').attributes('src')).toBe(product.image);
  });

  it('emits add-to-cart when button is clicked', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        product,
        isInCart: false,
        hovered: false,
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('add-to-cart')).toBeTruthy();
    // @ts-expect-error: checked above
    expect(wrapper.emitted('add-to-cart')[0]).toEqual([product]);
  });
});
