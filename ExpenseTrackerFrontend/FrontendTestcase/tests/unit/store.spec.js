import { createStore } from 'vuex';

describe('Vuex Store', () => {
  let store;

  beforeEach(() => {
    store = createStore({
      state: {
        expenses: [],
      },
      mutations: {
        ADD_EXPENSE(state, expense) {
          state.expenses.push(expense);
        },
      },
      actions: {
        addExpense({ commit }, expense) {
          commit('ADD_EXPENSE', expense);
        },
      },
    });
  });

  it('adds an expense to the state', () => {
    store.dispatch('addExpense', { title: 'New Expense', amount: 100 });
    expect(store.state.expenses).toHaveLength(1);
    expect(store.state.expenses[0].title).toBe('New Expense');
  });
});
