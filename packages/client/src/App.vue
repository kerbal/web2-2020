<template>
  <div>
    <router-view name="header"></router-view>
    Hello App
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s;
  opacity: 1;
}

.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 0.3s;
  opacity: 0;
}
</style>
