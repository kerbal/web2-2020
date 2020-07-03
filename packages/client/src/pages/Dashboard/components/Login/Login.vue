<template>
  <div>
    <p>Hello Dashborad Login</p>
    <button
      class="m-2 py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white"
      @click="onLogin">
      Login
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    onLogin() {
      this.$store.dispatch('login');
      this.$router.replace('dashboard');
    },
  },
};
</script>
