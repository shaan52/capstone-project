import { shallowMount } from '@vue/test-utils';
import DashboardView from '@/views/DashboardView.vue';
import ExpenseList from '@/components/ExpenseList.vue';

describe('DashboardView.vue', () => {
  it('renders the dashboard with ExpenseList component', () => {
    const wrapper = shallowMount(DashboardView);
    expect(wrapper.findComponent(ExpenseList).exists()).toBe(true);
  });
});
