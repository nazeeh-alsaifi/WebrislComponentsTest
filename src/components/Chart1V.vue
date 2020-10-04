<template>
  <div class="small">
    <LineChart :chartData="allChartData" :options="allChartOptions"></LineChart>
  </div>
</template>

<script>
import LineChart from "./LineChar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    LineChart,
  },
  computed: mapGetters(["allChartData", "allChartOptions"]),
  methods: {},
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>