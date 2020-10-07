<template>
  <div class="small">
    <LineChart
      :chartData="dataCollection"
      :options="allChartOptions"
    ></LineChart>
    <button type="button" class="btn btn-success mr-2" @click="fillData()">
      fillData
    </button>
    <button type="button" class="btn btn-success mr-2" @click="render()">
      render
    </button>
    <button
      type="button"
      class="btn btn-success mr-2"
      @click="testComputerSetter()"
    >
      set computed property
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
  data() {
    return {
      // header number (0 means the first header is the label in chart)
      label: 0,
      // header number (1 means the second header is the data in chart)
      data: 1,
    };
  },
  computed: {
    dataCollection: {
      // getter
      get: function () {
        return {
          labels: this.calculateHeadersData[this.label].data,
          datasets: [
            {
              label: "Data One",
              showLine: false,
              backgroundColor: "#f87979",
              data: this.calculateHeadersData[this.data].data,
            },
          ],
        };
      },
      // setter
      set: function (newLabelAndData) {
        this.label = newLabelAndData.label;
        this.data = newLabelAndData.data;
        // {
        //   labels: newValue1.labels,
        //   datasets: [
        //     {
        //       label: "Data One",
        //       showLine: false,
        //       backgroundColor: "#f87979",
        //       data: newValue1.data,
        //     },
        //   ],
        // };
      },
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
    testComputerSetter: function () {
      console.log("testComputerSetter");
      this.dataCollection = { label: 1, data: 2 };
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 75px auto;
}
</style>