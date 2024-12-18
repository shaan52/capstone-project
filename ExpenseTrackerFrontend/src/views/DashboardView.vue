<template>
  <div class="dashboard-view">
    <h1>Dashboard</h1>

    <!-- Expense Summary -->
    <div class="summary">
      <h2>Expense Summary</h2>
      <div class="summary-item" v-for="(total, category) in categoryTotals" :key="category">
        <strong>{{ category }}</strong>: {{ total | currency }}
      </div>
      <div class="summary-item">
        <strong>Total Expenses</strong>: {{ totalExpenses | currency }}
      </div>
    </div>

    <!-- Filters and Expense List -->
    <ExpenseList @edit-expense="openEditForm" />

    <!-- Expense Form -->
    <div v-if="isEditing" class="expense-form">
      <h2>Edit Expense</h2>
      <ExpenseForm :expense="currentExpense" @close="closeEditForm" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ExpenseList from '@/components/ExpenseList.vue';
import ExpenseForm from '@/components/ExpenseForm.vue';

export default {
  components: {
    ExpenseList,
    ExpenseForm,
  },
  data() {
    return {
      isEditing: false,
      currentExpense: null,
    };
  },
  computed: {
    ...mapState(['expenses']),
    totalExpenses() {
      return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    },
    categoryTotals() {
      return this.expenses.reduce((totals, expense) => {
        if (!totals[expense.category]) totals[expense.category] = 0;
        totals[expense.category] += expense.amount;
        return totals;
      }, {});
    },
  },
  methods: {
    openEditForm(expense) {
      this.isEditing = true;
      this.currentExpense = { ...expense }; // Clone the expense to prevent direct state mutation
    },
    closeEditForm() {
      this.isEditing = false;
      this.currentExpense = null;
    },
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    },
  },
};
</script>

<style scoped>
.dashboard-view {
  padding: 1rem;
}
.summary {
  margin-bottom: 2rem;
}
.summary-item {
  margin-bottom: 0.5rem;
}
.expense-form {
  margin-top: 2rem;
}
</style>
