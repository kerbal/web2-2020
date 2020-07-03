<template>
  <div>
    <p>  Hello Dashboard Homepage</p>
    <button
      class="m-2 py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white"
      @click="onLogout">
      Logout
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.replace('/');
    },
  },
};
</script>
