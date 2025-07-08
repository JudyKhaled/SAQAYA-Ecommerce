import { mount } from '@vue/test-utils';
import SortDropdown from '@/components/SortDropdown.vue';

describe('SortDropdown.vue', () => {
  it('emits update:modelValue when option is clicked', async () => {
    const wrapper = mount(SortDropdown, {
      props: { modelValue: '' },
    });
    await wrapper.trigger('click');
    const option = wrapper.findAll('.dropdown-options li').find(li => li.text() === 'Price: Low to High');
    expect(option).toBeTruthy();
    await option!.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['price-asc']);
  });
});
