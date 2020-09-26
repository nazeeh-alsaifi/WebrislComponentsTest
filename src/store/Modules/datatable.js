//---------------------- application state store
import Vue from "vue";
const state = {
  headers: [
    { id: 0, value: "#", edit: false },
    { id: 1, value: "header1", edit: false },
    { id: 2, value: "header2", edit: false },
    { id: 3, value: "header3", edit: false },
  ],
  rows: [
    { id: 0, col1: "col1", col2: "col2", col3: "col3" },
    { id: 1, col1: "col1", col2: "col2", col3: "col3" },
    { id: 2, col1: "col1", col2: "col2", col3: "col3" },
  ],
  rows2: {
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
};

const getters = {
  allHeaders: (state) => state.headers,
  allRows: (state) => state.rows,
  allRows2: (state) => state.rows2,
};
// ========================================== Actions ================================
const actions = {
  addRow({ commit }) {
    //length of headers
    const hLen = state.headers.length;
    // last obj in rows
    var lastRow;
    try {
      lastRow = state.rows[state.rows.length - 1];
    } catch (error) {
      console.log(error);
    }
    //----constructing new row
    const row = {};
    row["id"] = lastRow.id + 1;
    for (var i = 1; i < hLen; i++) row["col" + i] = "col" + i;

    console.log(row);
    commit("newRow", row);
  },

  addRow2({ commit }) {
    const rowArray = [];
    for (var i = 0; i < state.headers.length; i++) {
      const rowObject = {};
      if (i == 0) {
        rowObject["id"] = i;
        rowObject["value"] = Object.keys(state.rows2).length + 1;
        rowObject["edit"] = false;
      } else {
        rowObject["id"] = i;
        rowObject["value"] = "col" + i;
        rowObject["edit"] = false;
      }
      rowArray.push(rowObject);
    }
    commit("newRow2", rowArray);
  },

  deleteRow({ commit }) {
    var lastRow;
    try {
      lastRow = state.rows[state.rows.length - 1];
    } catch (error) {
      console.log(error);
    }
    console.log(lastRow.id);
    commit("deleteRow", lastRow.id);
  },

  deleteRow2({ commit }) {
    const numberOfRows = Object.keys(state.rows2).length;
    if (numberOfRows != 0) {
      commit("deleteRow2", "num" + (numberOfRows - 1));
    }
  },

  addHeader({ commit }) {
    var lastHeader;
    try {
      lastHeader = state.headers[state.headers.length - 1];
    } catch (error) {
      console.log(error);
    }

    const newHeader = {};
    newHeader["id"] = lastHeader.id + 1;
    newHeader["value"] = "Header" + (lastHeader.id + 1);
    newHeader["edit"] = false;

    commit("addHeader", newHeader);
  },

  addHeader2({ commit }) {
    const newHeader = {};
    newHeader["id"] = state.headers.length;
    newHeader["value"] = "header" + state.headers.length;
    newHeader["edit"] = false;

    commit("addHeader2", newHeader);
    // console.log(state.rows2["num0"]);
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
};

//============================================ Mutations =================================
const mutations = {
  newRow: (state, row) => state.rows.push(row),
  newRow2: (state, rowArray) => {
    const rowNumber = "num" + Object.keys(state.rows2).length;
    Vue.set(state.rows2, rowNumber, rowArray);
  },

  deleteRow: (state, id) => {
    state.rows = state.rows.filter((row) => row.id !== id);
  },
  deleteRow2: (state, name) => {
    Vue.delete(state.rows2, name);
  },

  addHeader: (state, header) => {
    state.headers.push(header);
    // number of rows
    var length = state.rows.length;
    if (length != 0) {
      for (var i = 0; i < length; i++) {
        var row = state.rows[i];
        row["col" + header.id] = "col" + header.id;
        console.log(row);
        state.rows.splice(i, 1, row);
      }
    }
  },

  addHeader2: (state, header) => {
    state.headers.push(header);
    const newRow = {};
    newRow["id"] = header.id;
    newRow["value"] = "col" + header.id;
    newRow["edit"] = false;

    // number of rows
    Object.keys(state.rows2).forEach((rowName) =>
      state.rows2[rowName].push(newRow)
    );
  },

  deleteHeader: (state, id) => {
    state.headers = state.headers.filter((header) => header.id !== id);

    var length = state.rows.length;
    if (length != 0) {
      for (var i = 0; i < length; i++) {
        var row = state.rows[i];
        delete row["col" + id];
        state.rows.splice(i, 1, row);
      }
    }
  },

  updateHeader: (state, upHeader) => {
    const index = state.headers.findIndex(
      (header) => header.id === upHeader.id
    );
    if (index !== -1) {
      state.headers.splice(index, 1, upHeader);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
