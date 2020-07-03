<template>
  <nav class="flex flex-wrap bg-teal-500 p-4">
    <div class="nav-item m-1">
      <router-link to="/" exact>
        Home
      </router-link>
    </div>
    <div class="nav-item m-1">
      <router-link to="/about">
        About
      </router-link>
    </div>
    <div class="nav-item m-1" v-if="!$store.state.isAuth">
      <router-link to="/login">
        Login
      </router-link>
    </div>
    <div class="nav-item m-1" v-if="$store.state.isAuth">
      <router-link to="/dashboard">
        Dashboard
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
a.router-link-active {
  color: red;
}
</style>
