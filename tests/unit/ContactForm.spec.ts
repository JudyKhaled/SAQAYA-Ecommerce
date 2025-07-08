import { mount } from '@vue/test-utils';
import ContactForm from '@/views/ContactForm.vue';

describe('ContactForm.vue', () => {
  it('renders contact form placeholders', () => {
    const wrapper = mount(ContactForm);
    expect(wrapper.html()).toContain('placeholder="Full Name"');
    expect(wrapper.html()).toContain('placeholder="Email Address"');
    expect(wrapper.html()).toContain('placeholder="Organization / Business (optional)"');
    expect(wrapper.html()).toContain('placeholder="What\'s on your mind?"');
    expect(wrapper.text()).toContain('SUBMIT');
  });
});
