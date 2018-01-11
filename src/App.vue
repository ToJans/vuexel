<template>
  <div id="app">
      <h1>
        <router-link to="/" >Vuexel</router-link>
        <span class="subtitle">A toy spreadsheet implemented in Vue.js</span>
      </h1>
    <p>This was hacked together in a day for 
      <a href="https://docs.google.com/presentation/d/1gFyTFZPf9sF3LEjaDi8KHlcL7O0IkRCiJSuDCrnXMk8/edit?usp=sharing" target="_new">a presentation about Vue.js</a>, 
      and finished the day after.
      It is fun to see what is possible with a few hundred lines of code.</p>
    <p>Sheets are saved in localstorage.</p>
    <p>Pull requests are welcome!</p>
    <p>Enjoy! - <a href="https://twitter.com/tojans" target="_new">@ToJans</a></p>
    <div class="disclaimer">Uses Javascript function invocation, so not safe!</div>
    <router-view>
    </router-view>


    <a href="https://github.com/ToJans/vuexel"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>
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
    {path:"/", component: Home },
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
  font-size: 0.5em;
  padding-bottom: 1em;
  text-decoration: none;
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
