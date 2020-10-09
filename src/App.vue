<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <TableControl />
    <Datatable1v />
    <!-- 
    <ChartControls />
    <Chart1V /> 
    -->

    <Chart2V />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Datatable1v from "./components/Datatable1v";
import TableControl from "./components/TableControl";
// import Chart1V from "./components/Chart1V";
// import ChartControls from "./components/ChartControls";
import Chart2V from "./components/Chart2V";
export default {
  name: "App",
  components: {
    HelloWorld,
    Datatable1v,
    TableControl,
    // Chart1V,
    // ChartControls,
    Chart2V,
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
