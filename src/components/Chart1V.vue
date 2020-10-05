<template>
  <div class="small">
    <LineChart :chartData="datasetsfull" :options="allChartOptions"></LineChart>
    <button type="button" class="btn btn-success mr-2" @click="increment">
      Increment
    </button>
  </div>
</template>

<script>
import LineChart from "./LineChar.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    LineChart,
  },
  computed: {
    datasetsfull() {
      return {
        labels: this.getyAxes,
        datasets: [
          {
            label: "Data One",
            showLine: false,
            backgroundColor: "#f87979",
            data: this.getxAxes,
          },
        ],
      };
    },
    ...mapGetters(["allChartOptions", "getxAxes", "getyAxes"]),
  },
  methods: mapActions(["increment"]),
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>