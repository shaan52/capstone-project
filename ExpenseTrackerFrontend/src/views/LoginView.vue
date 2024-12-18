<template>
  <div class="login-view">
    <h1>Welcome to Expense Tracker</h1>
    <p>Please log in to continue.</p>
    <Login @login-success="onLoginSuccess" />
  </div>
</template>

<script>
import Login from "@/components/Login.vue";

export default {
  components: {
    Login,
  },
  methods: {
    onLoginSuccess() {
      // Redirect to the dashboard after successful login
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

h1 {
  margin-bottom: 1rem;
}

p {
  margin-bottom: 2rem;
  color: #555;
}
</style>
