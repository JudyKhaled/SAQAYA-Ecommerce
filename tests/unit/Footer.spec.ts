import { mount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';

describe('Footer.vue', () => {
  it('renders About Us and Contact Us links', () => {
    const wrapper = mount(Footer, {
      global: {
        stubs: { 'router-link': { template: '<a><slot /></a>' } },
      },
    });
    expect(wrapper.text()).toContain('About Us');
    expect(wrapper.text()).toContain('Contact Us');
  });

  it('renders social links', () => {
    const wrapper = mount(Footer, {
      global: {
        stubs: { 'router-link': { template: '<a><slot /></a>' } },
      },
    });
    expect(wrapper.text()).toContain('Twitter');
    expect(wrapper.text()).toContain('Facebook');
    expect(wrapper.text()).toContain('Instagram');
  });

  it('shows copyright', () => {
    const wrapper = mount(Footer, {
      global: {
        stubs: { 'router-link': { template: '<a><slot /></a>' } },
      },
    });
    expect(wrapper.text()).toMatch(/All Rights Reserved/);
  });
});
