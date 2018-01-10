<template>
  <div id="app">
    <h1>Vuexel</h1>
    <sheet></sheet>
  </div>
</template>

<script>
import Sheet from "./Sheet.vue";

export default {
  name: 'app',
  components: {
    sheet: Sheet
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
