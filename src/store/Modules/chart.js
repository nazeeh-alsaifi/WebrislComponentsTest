// import Vue from "vue";
const state = {
  //   chartData: {
  //     labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  //     datasets: [
  //       //   {
  //       //     label: "Data One",
  //       //     backgroundColor: "#f87979",
  //       //     data: [this.getRandomInt(), this.getRandomInt()],
  //       //   },
  //       {
  //         label: "Data two",
  //         backgroundColor: "#f87979",
  //         showLine: false,
  //         data: [1, 2, 3, 4, 8, 5, 7, 8, 9, 10],
  //       },
  //     ],
  //   },
  chartOptions: {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Y-Axis",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "X-Axis",
          },
        },
      ],
    },
  },

  xAxesData: [2, 4, 6, 8, 10, 12],
  yAxesData: [1, 2, 3, 4, 5, 6],
};

const getters = {
  //   allChartData: (state) => state.chartData,
  allChartOptions: (state) => state.chartOptions,
  getxAxes: (state) => state.xAxesData,
  getyAxes: (state) => state.yAxesData,
};

const actions = {
  increment({ commit }) {
    // const newChartData = state.chartData;
    // newChartData.labels.push(newChartData.labels.length + 1);
    // newChartData.datasets[0].data.push(newChartData.labels.length + 1);
    // console.log("newChartData", newChartData);
    /* 
    const newLabels = state.chartData.labels;
    newLabels.push(state.chartData.labels.length + 1);
    const newData = state.chartData.datasets[0].data;
    newData.push(state.chartData.datasets[0].data.length + 1);
    console.log("newLabels", newLabels); 
    */
    commit("updateData");
  },
};

const mutations = {
  updateData: (state) => {
    // console.log("newData", newData);
    // console.log("newLabels", newLabels);
    // Vue.set(state.chartData, newChartData);
    // Vue.set(state.chartData.datasets[0].data, newData);
    state.xAxesData.push(state.xAxesData.length + 2);
    state.yAxesData.push(state.yAxesData.length + 1);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
