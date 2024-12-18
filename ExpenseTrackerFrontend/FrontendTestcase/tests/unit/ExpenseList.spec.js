import { shallowMount } from '@vue/test-utils';
import ExpenseList from '@/components/ExpenseList.vue';
import Vuex from 'vuex';

describe('ExpenseList.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        expenses: [
          { id: 1, title: 'Groceries', amount: 50, category: 'Food' },
          { id: 2, title: 'Bus Ticket', amount: 10, category: 'Transport' },
        ],
      },
    });
  });

  it('renders a list of expenses', () => {
    const wrapper = shallowMount(ExpenseList, { global: { plugins: [store] } });
    const expenseItems = wrapper.findAll('li');
    expect(expenseItems).toHaveLength(2);
    expect(expenseItems[0].text()).toContain('Groceries');
    expect(expenseItems[1].text()).toContain('Bus Ticket');
  });

  it('triggers delete action when delete button is clicked', async () => {
    const actions = { deleteExpense: jest.fn() };
    store.dispatch = actions.deleteExpense;

    const wrapper = shallowMount(ExpenseList, { global: { plugins: [store] } });
    await wrapper.find('button').trigger('click');

    expect(actions.deleteExpense).toHaveBeenCalled();
  });
});
