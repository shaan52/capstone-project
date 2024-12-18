<template>
  <div class="reports-view">
    <h1>Expense Reports</h1>

    <div class="charts">
      <!-- Pie Chart: Expenses by Category -->
      <div class="chart-container">
        <h2>Expenses by Category</h2>
        <canvas id="categoryChart"></canvas>
      </div>

      <!-- Bar Chart: Monthly Expenses -->
      <div class="chart-container">
        <h2>Monthly Expenses</h2>
        <canvas id="monthlyChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Chart from "chart.js/auto";

export default {
  computed: {
    ...mapState(["expenses"]),
    expensesByCategory() {
      return this.expenses.reduce((totals, expense) => {
        if (!totals[expense.category]) totals[expense.category] = 0;
        totals[expense.category] += expense.amount;
        return totals;
      }, {});
    },
    expensesByMonth() {
      return this.expenses.reduce((totals, expense) => {
        const month = new Date(expense.date).toLocaleString("default", { month: "long" });
        if (!totals[month]) totals[month] = 0;
        totals[month] += expense.amount;
        return totals;
      }, {});
    },
  },
  mounted() {
    this.renderCategoryChart();
    this.renderMonthlyChart();
  },
  methods: {
    renderCategoryChart() {
      const ctx = document.getElementById("categoryChart").getContext("2d");
      const data = {
        labels: Object.keys(this.expensesByCategory),
        datasets: [
          {
            label: "Expenses by Category",
            data: Object.values(this.expensesByCategory),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
          },
        ],
      };
      new Chart(ctx, {
        type: "pie",
        data: data,
      });
    },
    renderMonthlyChart() {
      const ctx = document.getElementById("monthlyChart").getContext("2d");
      const data = {
        labels: Object.keys(this.expensesByMonth),
        datasets: [
          {
            label: "Monthly Expenses",
            data: Object.values(this.expensesByMonth),
            backgroundColor: "#36A2EB",
          },
        ],
      };
      new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.reports-view {
  padding: 1rem;
}
.charts {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
.chart-container {
  flex: 1;
  min-width: 300px;
}
</style>
