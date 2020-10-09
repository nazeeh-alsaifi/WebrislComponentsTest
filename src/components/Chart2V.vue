<template>
  <div class="small">
    <ScatterChart
      :chartData="datacollection"
      :options="this.options"
    ></ScatterChart>
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
  </div>
</template>

<script>
import ScatterChart from "./ScatterChart.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    ScatterChart,
  },
  data() {
    return {
      // datacollection: null,

      options: { responsive: true, maintainAspectRatio: false },
      Xheader: "header1",
      Yheader: "header2",
    };
  },
  computed: {
    ...mapGetters(["calculateScatterData", "getAvailableXY"]),
    datacollection: {
      get: function () {
        return {
          datasets: [
            {
              label: "My First dataset",
              borderColor: "#2196f3",
              backgroundColor: "#2196f3",
              data: this.calculateScatterData(this.Xheader, this.Yheader),
            },
          ],
        };
      },
      set: function (newHeaders) {
        this.Xheader = newHeaders.x;
        this.Yheader = newHeaders.y;
      },
    },
  },

  mounted() {},
  methods: {
    changeXaxis(e) {
      const headerName =
        e.target.options[e.target.options.selectedIndex].innerText;
      this.Xheader = headerName.trim();
    },
    changeYaxis(e) {
      const headerName =
        e.target.options[e.target.options.selectedIndex].innerText;
      this.Yheader = headerName.trim();
    },
  },
};
</script>

<style scoped>
.small {
  max-width: 600px;
  margin: 75px auto;
}
</style>