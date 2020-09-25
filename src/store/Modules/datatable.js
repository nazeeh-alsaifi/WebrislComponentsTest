//---------------------- application state store

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
};

const getters = {
  allHeaders: (state) => state.headers,
  allRows: (state) => state.rows,
};

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

const mutations = {
  newRow: (state, row) => state.rows.push(row),
  deleteRow: (state, id) => {
    state.rows = state.rows.filter((row) => row.id !== id);
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
