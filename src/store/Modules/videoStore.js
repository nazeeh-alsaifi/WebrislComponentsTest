// ========================================== State  ================================
const state = {
  source: {
    id: "video-1",
    src: "http://vjs.zencdn.net/v/oceans.mp4",
    poster: "http://vjs.zencdn.net/v/oceans.png",
    type: "video/mp4",
    dataSetup: "{}",
  },
};

// ========================================== Getters ================================
const getters = {
  getSource: (state) => state.source,
};

// ========================================== Actions ================================
const actions = {};

//============================================ Mutations =================================
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
