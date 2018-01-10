<template>
  <div id="app">
    <h1>Vuexel</h1>
    <router-link to="/home">All sheets</router-link>
    <router-link to="/sheets/new">New sheet</router-link>
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
