<template>
  <form @submit.prevent="submitExpense">
    <input type="text" v-model="title" placeholder="Title" required />
    <input type="number" v-model="amount" placeholder="Amount" required />
    <select v-model="category">
      <option value="Food">Food</option>
      <option value="Transport">Transport</option>
      <option value="Utilities">Utilities</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Miscellaneous">Miscellaneous</option>
    </select>
    <input type="date" v-model="date" required />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['expense'],
  data() {
    return {
      title: this.expense?.title || '',
      amount: this.expense?.amount || 0,
      category: this.expense?.category || 'Food',
      date: this.expense?.date || '',
    };
  },
  methods: {
    ...mapActions(['addExpense', 'updateExpense']),
    submitExpense() {
      const expense = {
        title: this.title,
        amount: this.amount,
        category: this.category,
        date: this.date,
        id: this.expense?.id,
      };
      if (expense.id) {
        this.updateExpense(expense);
      } else {
        this.addExpense(expense);
      }
    },
  },
};
</script>
