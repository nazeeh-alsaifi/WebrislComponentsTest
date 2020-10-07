<template>
  <div class="small">
    <LineChart :chartData="datasetsfull" :options="allChartOptions"></LineChart>
    <button type="button" class="btn btn-success mr-2" @click="fillData()">
      fillData
    </button>
    <button type="button" class="btn btn-success mr-2" @click="render()">
      render
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
        labels: this.calculateHeadersData[0].data,
        datasets: [
          {
            label: "Data One",
            showLine: false,
            backgroundColor: "#f87979",
            data: this.calculateHeadersData[1].data,
          },
        ],
      };
    },

    ...mapGetters([
      "allChartOptions",
      "getxAxes",
      "getyAxes",
      "getAvailableXY",
      "calculateHeadersData",
    ]),
  },
  methods: {
    ...mapActions(["increment"]),
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 75px auto;
}
</style>