<template>
  <div class="small">
    <LineChart :chartData="datacollection" :options="{}"></LineChart>
    <div>
      <button type="button" class="btn btn-success mr-2" @click="fillData()">
        fillData
      </button>
      <button type="button" class="btn btn-success mr-2" @click="newData()">
        NewData
      </button>
      <button type="button" class="btn btn-success mr-2" @click="newChart()">
        new chart
      </button>
    </div>
    <div id="chart-controls" class="d-flex justify-content-around">
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
  </div>
</template>

<script>
import LineChart from "./LineChar.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    LineChart,
  },
  computed: { ...mapGetters(["getAvailableXY", "getChart"]) },
  data() {
    return {
      datacollection: null,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    ...mapActions(["changeChart"]),
    fillData() {
      this.datacollection = {
        labels: [1, 2, 3],
        datasets: [
          {
            label: "Data One",
            showLine: false,
            backgroundColor: "#f87979",
            data: [2, 4, 6],
          },
        ],
      };
    },
    newData() {
      this.datacollection = {
        labels: [1, 2, 3, 4],
        datasets: [
          {
            label: "Data One",
            showLine: false,
            backgroundColor: "#f87979",
            data: [2, 4, 6, 8],
          },
        ],
      };
    },
    newChart() {
      this.changeChart({
        labels: [1, 2, 3, 4],
        datasets: [
          {
            label: "Data One",
            showLine: false,
            backgroundColor: "#f87979",
            data: [2, 4, 6, 8],
          },
        ],
      });
    },

    // changeXaxis(e) {},
  },
};
</script>

<style scoped>
.small {
  max-width: 600px;
  margin: 75px auto;
}
</style>