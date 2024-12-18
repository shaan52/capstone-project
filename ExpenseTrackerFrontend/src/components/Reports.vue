<template>
  <div>
    <canvas id="expense-chart"></canvas>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Chart from 'chart.js/auto';

export default {
  mounted() {
    this.fetchSummary().then(() => {
      const ctx = document.getElementById('expense-chart');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(this.expensesByCategory),
          datasets: [
            {
              data: Object.values(this.expensesByCategory),
              backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple'],
            },
          ],
        },
      });
    });
  },
  computed: {
    ...mapGetters(['expensesByCategory']),
  },
  methods: {
    ...mapActions(['fetchSummary']),
  },
};
</script>
