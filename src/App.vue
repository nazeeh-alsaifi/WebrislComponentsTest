<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <addRow />
    <Datatable1v />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Datatable1v from "./components/Datatable1v";
import addRow from "./components/addRow";
export default {
  name: "App",
  components: {
    HelloWorld,
    Datatable1v,
    addRow,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
