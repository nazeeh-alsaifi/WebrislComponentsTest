// import Vue from "vue";

// ========================================== State  ================================
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

  chart: {
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        label: "Data One",
        showLine: false,
        backgroundColor: "#f87979",
        data: [2, 4, 6, 8, 10],
      },
    ],
  },

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

  xAxesData: [2, 4, 6],
  yAxesData: [1, 2, 3],
};

// ========================================== Getters ================================
const getters = {
  //   allChartData: (state) => state.chartData,
  allChartOptions: (state) => state.chartOptions,
  getxAxes: (state) => state.xAxesData,
  getyAxes: (state) => state.yAxesData,
  getChart: (state) => state.chart,
};

// ========================================== Actions ================================
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

  changeXaxis({ commit, rootGetters }, e) {
    const headerName =
      e.target.options[e.target.options.selectedIndex].innerText;
    // console.log("changeXaxis", headerName, headerData);
    const headerData = rootGetters.getChartHeaderData(headerName.trim());
    commit("changeXaxis", headerData);
  },
  changeChart({ commit }, newChart) {
    commit("changeChart", newChart);
  },
};

//============================================ Mutations =================================
const mutations = {
  updateData: (state) => {
    // console.log("newData", newData);
    // console.log("newLabels", newLabels);
    // Vue.set(state.chartData, newChartData);
    // Vue.set(state.chartData.datasets[0].data, newData);
    state.xAxesData = [6, 7, 8, 9];
    state.yAxesData = [6, 7, 8, 10];
  },

  changeXaxis: (state, headerData) => {
    // emptying the array
    // console.log(state.xAxes.length);
    // state.xAxes.length = 0;
    // state.yAxes.length = 0;
    state.xAxesData.splice(0, state.xAxesData.length);
    state.yAxesData.splice(0, state.yAxesData.length);
    headerData.forEach((data) => {
      state.xAxesData.push(data);
      state.yAxesData.push(data);
    });
    console.log("changed the axis", headerData);
  },
  changeChart: (state, newChart) => (state.chart = newChart),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
