import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    user: null,
    expenses: [],
    summary: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_EXPENSES(state, expenses) {
      state.expenses = expenses;
    },
    ADD_EXPENSE(state, expense) {
      state.expenses.push(expense);
    },
    UPDATE_EXPENSE(state, updatedExpense) {
      const index = state.expenses.findIndex(exp => exp.id === updatedExpense.id);
      if (index !== -1) state.expenses.splice(index, 1, updatedExpense);
    },
    DELETE_EXPENSE(state, id) {
      state.expenses = state.expenses.filter(exp => exp.id !== id);
    },
    SET_SUMMARY(state, summary) {
      state.summary = summary;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const { data } = await axios.post('/api/auth/login', credentials);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      commit('SET_USER', data.user);
    },
    async fetchExpenses({ commit }) {
      const { data } = await axios.get('/api/expenses');
      commit('SET_EXPENSES', data);
    },
    async addExpense({ commit }, expense) {
      const { data } = await axios.post('/api/expenses', expense);
      commit('ADD_EXPENSE', data);
    },
    async updateExpense({ commit }, expense) {
      const { data } = await axios.put(`/api/expenses/${expense.id}`, expense);
      commit('UPDATE_EXPENSE', data);
    },
    async deleteExpense({ commit }, id) {
      await axios.delete(`/api/expenses/${id}`);
      commit('DELETE_EXPENSE', id);
    },
    async fetchSummary({ commit }) {
      const { data } = await axios.get('/api/expenses/summary');
      commit('SET_SUMMARY', data);
    },
  },
  getters: {
    totalExpenses: state => state.expenses.reduce((sum, exp) => sum + exp.amount, 0),
    expensesByCategory: state => {
      return state.expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
      }, {});
    },
  },
});

export default store;
