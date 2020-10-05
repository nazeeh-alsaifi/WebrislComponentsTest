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
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Dropdown button
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
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