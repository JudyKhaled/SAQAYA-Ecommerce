import { mount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';

describe('Footer.vue', () => {
  it('renders footer links and copyright', () => {
    const wrapper = mount(Footer, {
      global: {
        stubs: ['router-link'],
      },
    });
    expect(wrapper.html()).toContain('to="/about"');
    expect(wrapper.html()).toContain('to="/contact"');
    expect(wrapper.text()).toContain('All Rights Reserved');
  });
});
