<template>
  <div class="d-flex justify-content-around">
    <div>
      x-Axis:
      <select @change="filterTodos($event)">
        <option value=""></option>
        <option v-for="(headerName, index) in getAvailableXY" :key="index">
          {{ headerName }}
        </option>
      </select>
    </div>
    <div>
      y-Axis:
      <select @change="filterTodos($event)">
        <option value=""></option>
        <option v-for="(headerName, index) in getAvailableXY" :key="index">
          {{ headerName }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ChartControls",
  computed: mapGetters(["getAvailableXY"]),
};
</script>

<style>
</style>