<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

// <script>
// import myHome from './components/Home.vue'

export default {
  name: 'app',
  components: {
    // myHome
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
