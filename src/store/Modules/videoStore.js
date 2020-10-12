const state = {
  source: {
    id: "video-1",
    src: require("@/assets/oceans.mp4"),
    poster: require("@/assets/oceans.png"),
    type: "video/mp4",
    dataSetup: "{}",
  },
};

// ========================================== Getters ================================
const getters = {
  getSource: (state) => state.source,
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
    const newSource = {};
    state.source = newSource;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
