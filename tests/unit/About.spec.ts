import { mount } from '@vue/test-utils';
import About from '@/views/About.vue';

describe('About.vue', () => {
  it('renders About Us content', () => {
    const wrapper = mount(About);
    expect(wrapper.text()).toContain('About Us');
    expect(wrapper.text()).toContain('Welcome to KART');
  });
});