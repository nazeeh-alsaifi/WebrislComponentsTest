//---------------------- application state store
import Vue from "vue";
const state = {
  headers: [
    { id: 0, value: "#", edit: false },
    { id: 1, value: "header1", edit: false },
    { id: 2, value: "header2", edit: false },
    { id: 3, value: "header3", edit: false },
  ],
  /* 
  rows: [
    { id: 0, col1: "col1", col2: "col2", col3: "col3" },
    { id: 1, col1: "col1", col2: "col2", col3: "col3" },
    { id: 2, col1: "col1", col2: "col2", col3: "col3" },
  ],
   */
  /* 
  rows: {
    num0: [
      { id: 0, value: "1", edit: false },
      { id: 1, value: "col1", edit: false },
      { id: 2, value: "col2", edit: false },
      { id: 3, value: "col3", edit: false },
    ],
    num1: [
      { id: 0, value: "2", edit: false },
      { id: 1, value: "col1", edit: false },
      { id: 2, value: "col2", edit: false },
      { id: 3, value: "col3", edit: false },
    ],
    num2: [
      { id: 0, value: "3", edit: false },
      { id: 1, value: "col1", edit: false },
      { id: 2, value: "col2", edit: false },
      { id: 3, value: "col3", edit: false },
    ],
  }, 
  */
  rows: [
    // row1
    {
      id: 0,
      rowObjects: [
        //rowDataObj
        { id: 0, value: "1", edit: false },
        { id: 1, value: "col1", edit: false },
        { id: 2, value: "col2", edit: false },
        { id: 3, value: "col3", edit: false },
      ],
    },
    {
      id: 1,
      rowObjects: [
        { id: 0, value: "2", edit: false },
        { id: 1, value: "col1", edit: false },
        { id: 2, value: "col2", edit: false },
        { id: 3, value: "col3", edit: false },
      ],
    },
    {
      id: 2,
      rowObjects: [
        { id: 0, value: "3", edit: false },
        { id: 1, value: "col1", edit: false },
        { id: 2, value: "col2", edit: false },
        { id: 3, value: "col3", edit: false },
      ],
    },
  ],
};

const getters = {
  allHeaders: (state) => state.headers,
  allRows: (state) => state.rows,
  // allRows2: (state) => state.rows,
};
// ========================================== Actions ================================
const actions = {
  addRow({ commit }) {
    const rowArray = [];
    for (var i = 0; i < state.headers.length; i++) {
      const rowObject = {};
      if (i == 0) {
        rowObject["id"] = i;
        rowObject["value"] = Object.keys(state.rows).length + 1;
        rowObject["edit"] = false;
      } else {
        rowObject["id"] = i;
        rowObject["value"] = "col" + i;
        rowObject["edit"] = false;
      }
      rowArray.push(rowObject);
    }
    commit("newRow", rowArray);
  },

  deleteRow({ commit }) {
    const numberOfRows = Object.keys(state.rows).length;
    if (numberOfRows != 0) {
      commit("deleteRow", "num" + (numberOfRows - 1));
    }
  },

  addHeader({ commit }) {
    const newHeader = {};
    newHeader["id"] = state.headers.length;
    newHeader["value"] = "header" + state.headers.length;
    newHeader["edit"] = false;

    commit("addHeader", newHeader);
    // console.log(state.rows["num0"]);
  },

  deleteHeader({ commit }) {
    var length = state.headers.length;
    if (length !== 0) {
      commit("deleteHeader", state.headers[length - 1].id);
    }
  },

  updateHeader({ commit }, upHeader) {
    // we can construct a new header or evaluation
    commit("updateHeader", upHeader);
  },

  updateRow({ commit }, rowDetails) {
    // console.log("rowDetails", rowDetails);
    commit("updateRow", rowDetails);
  },
};

//============================================ Mutations =================================
const mutations = {
  // newRow: (state, row) => state.rows.push(row),
  newRow: (state, rowArray) => {
    const rowNumber = "num" + Object.keys(state.rows).length;
    Vue.set(state.rows, rowNumber, rowArray);
  },
  deleteRow: (state, name) => {
    Vue.delete(state.rows, name);
  },
  addHeader: (state, header) => {
    state.headers.push(header);
    Object.keys(state.rows).forEach((rowName) => {
      const newRow = {};
      newRow["id"] = header.id;
      newRow["value"] = "col" + header.id;
      newRow["edit"] = false;
      state.rows[rowName].push(newRow);
    });
  },
  deleteHeader: (state, id) => {
    state.headers = state.headers.filter((header) => header.id !== id);

    Object.keys(state.rows).forEach((rowName) => state.rows[rowName].pop());
  },

  updateHeader: (state, upHeader) => {
    const index = state.headers.findIndex(
      (header) => header.id === upHeader.id
    );
    if (index !== -1) {
      state.headers.splice(index, 1, upHeader);
    }
  },

  updateRow: (state, rowDetails) => {
    console.log("i am in mutation");
    console.log(rowDetails);
    const row = state.rows[rowDetails.id];
    row.rowObjects.splice(rowDetails.obj.id, 1, rowDetails.obj);
    console.log(row);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
