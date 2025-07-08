import { mount } from '@vue/test-utils';
import Header from '@/components/Header.vue';
import { createTestingPinia } from '@pinia/testing';

describe('Header.vue', () => {
  it('renders logo and navigation router-link stubs', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [createTestingPinia()],
        stubs: ['router-link'],
      },
    });
    const stubs = wrapper.findAll('router-link-stub');
    expect(stubs.length).toBeGreaterThanOrEqual(1);
    expect(stubs.some(stub => stub.attributes('to') === '/')).toBe(true);
    expect(stubs.some(stub => stub.attributes('to') === '/products')).toBe(true);
    expect(stubs.some(stub => stub.attributes('to') === '/contact')).toBe(true);
  });
});
