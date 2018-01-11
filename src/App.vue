<template>
  <div id="app">
    <router-link to="/home"><h1>Vuexel</h1></router-link>
    <div class="subtitle">A toy spreadsheet implemented in Vue.js</div>
    <div class="disclaimer">Uses Javascript function invocation, so not safe!</div>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Sheet from "./Sheet.vue";
import Home from "./Home.vue"
import store from "./store";

Vue.use(VueRouter);

var router = new VueRouter({
  routes: [
    {path:"/home", component: Home },
    {path:"/sheets/new", component: Sheet},
    {path: "/sheets/:uuid",component: Sheet}
  ]
})

export default {
  name: 'app',
  router,
  store
}
</script>

<style >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.subtitle {
  font-size: larger;
  padding-bottom: 1em;
}

.disclaimer {
  background-color:red;
  color:white;
  font-weight: bold;
  display: block;
  position: absolute;
  top:0px;
}

</style>
