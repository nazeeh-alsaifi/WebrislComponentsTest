const state = {
  sources: [
    {
      id: "video-1",
      src: require("@/assets/oceans.mp4"),
      poster: require("@/assets/oceans.png"),
      type: "video/mp4",
      dataSetup: "{}",
    },
    {
      id: "video-1",
      src: require("@/assets/bunny.mp4"),
      poster: require("@/assets/bunny.png"),
      type: "video/mp4",
      dataSetup: "{}",
    },
  ],
  currentSourceIndex: 0,
  currentSource: {
    id: "video-1",
    src: require("@/assets/oceans.mp4"),
    poster: require("@/assets/oceans.png"),
    type: "video/mp4",
    dataSetup: "{}",
  },
};

// ========================================== Getters ================================
const getters = {
  getSources: (state) => state.sources,
  getCurrentSource: (state) => state.currentSource,
};

// ========================================== Actions ================================
const actions = {
  changeSource({ commit }) {
    commit("changeSource");
  },
};

//============================================ Mutations =================================
const mutations = {
  changeSource: (state) => {
    const newSource = state.sources[1];
    state.currentSource = newSource;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
