import { mount } from '@vue/test-utils';
import Header from '@/components/Header.vue';

describe('Header.vue', () => {
  it('renders logo and navigation links', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: { 'router-link': { template: '<a><slot /></a>' } },
      },
    });
    expect(wrapper.text()).toContain("JUJU'S");
    expect(wrapper.text()).toContain('Home');
    expect(wrapper.text()).toContain('Products');
    expect(wrapper.text()).toContain('Contact');
  });

  it('emits toggle-cart when cart button is clicked', async () => {
    const wrapper = mount(Header, {
      global: {
        stubs: { 'router-link': { template: '<a><slot /></a>' } },
      },
    });
    const cartBtn = wrapper.find('.header__cart-button');
    await cartBtn.trigger('click');
    expect(wrapper.emitted('toggle-cart')).toBeTruthy();
  });

  it('has a search input', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: { 'router-link': { template: '<a><slot /></a>' } },
      },
    });
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });
});
