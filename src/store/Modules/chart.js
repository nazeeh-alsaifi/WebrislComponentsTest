const state = {
  chartData: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      //   {
      //     label: "Data One",
      //     backgroundColor: "#f87979",
      //     data: [this.getRandomInt(), this.getRandomInt()],
      //   },
      {
        label: "Data two",
        backgroundColor: "#f87979",
        showLine: false,
        data: [1, 2, 3, 4, 8, 5, 7, 8, 9, 10],
      },
    ],
  },
  chartOptions: {
    // showLine: false,
  },
};

const getters = {
  allChartData: (state) => state.chartData,
  allChartOptions: (state) => state.chartOptions,
};

const actions = {};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
