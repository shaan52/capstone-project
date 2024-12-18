<template>
  <div>
    <h1>Expense List</h1>

    <!-- Filters -->
    <div class="filters">
      <label for="category">Filter by Category:</label>
      <select v-model="selectedCategory">
        <option value="">All</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>

      <label for="startDate">Start Date:</label>
      <input type="date" v-model="startDate" />

      <label for="endDate">End Date:</label>
      <input type="date" v-model="endDate" />

      <button @click="applyFilters">Apply Filters</button>
    </div>

    <!-- Expense List -->
    <ul>
      <li v-for="expense in filteredExpenses" :key="expense.id">
        <div>
          <strong>{{ expense.title }}</strong> - {{ expense.category }} - {{ expense.amount | currency }}
          <small>({{ expense.date }})</small>
        </div>
        <button @click="editExpense(expense)">Edit</button>
        <button @click="deleteExpense(expense.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      selectedCategory: '',
      startDate: '',
      endDate: '',
    };
  },
  computed: {
    ...mapState(['expenses']),
    filteredExpenses() {
      return this.expenses.filter(expense => {
        const matchesCategory =
            !this.selectedCategory || expense.category === this.selectedCategory;
        const matchesDateRange =
            (!this.startDate || new Date(expense.date) >= new Date(this.startDate)) &&
            (!this.endDate || new Date(expense.date) <= new Date(this.endDate));
        return matchesCategory && matchesDateRange;
      });
    },
  },
  methods: {
    ...mapActions(['deleteExpense']),
    applyFilters() {
      // Trigger UI to reflect applied filters (filters are reactive).
    },
    editExpense(expense) {
      this.$emit('edit-expense', expense); // Emits event to open the edit form.
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
.filters {
  margin-bottom: 1rem;
}
.filters label {
  margin-right: 0.5rem;
}
.filters select,
.filters input {
  margin-right: 1rem;
}
</style>
