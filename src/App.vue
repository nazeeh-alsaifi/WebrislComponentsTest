<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <TableControl />
    <Datatable1v />
    <Chart1v />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Datatable1v from "./components/Datatable1v";
import TableControl from "./components/TableControl";
import Chart1v from "./components/Chart1V";
export default {
  name: "App",
  components: {
    HelloWorld,
    Datatable1v,
    TableControl,
    Chart1v,
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
