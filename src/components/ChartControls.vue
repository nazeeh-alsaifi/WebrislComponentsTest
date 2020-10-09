<template>
  <div class="d-flex justify-content-around">
    <div>
      x-Axis:
      <select @change="changeXaxis($event)">
        <option value=""></option>
        <option v-for="(headerName, index) in getAvailableXY" :key="index">
          {{ headerName }}
        </option>
      </select>
    </div>
    <div>
      y-Axis:
      <select @change="changeYaxis($event)">
        <option value=""></option>
        <option v-for="(headerName, index) in getAvailableXY" :key="index">
          {{ headerName }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ChartControls",
  computed: mapGetters(["getAvailableXY"]),
  methods: mapActions(["changeXaxis"]),
};
</script>

<style>
</style>