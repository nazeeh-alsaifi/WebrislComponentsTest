// import Vue from "vue";

// ========================================== state ================================
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
        { id: 1, value: "4", edit: false },
        { id: 2, value: "6", edit: false },
        { id: 3, value: "8", edit: false },
      ],
    },
    {
      id: 1,
      rowObjects: [
        { id: 0, value: "2", edit: false },
        { id: 1, value: "3", edit: false },
        { id: 2, value: "6", edit: false },
        { id: 3, value: "9", edit: false },
      ],
    },
    {
      id: 2,
      rowObjects: [
        { id: 0, value: "3", edit: false },
        { id: 1, value: "8", edit: false },
        { id: 2, value: "12", edit: false },
        { id: 3, value: "16", edit: false },
      ],
    },
  ],
};

// ========================================== Getters ================================
const getters = {
  allHeaders: (state) => state.headers,
  allRows: (state) => state.rows,

  getAvailableXY: (state) => {
    const headersNames = [];
    state.headers
      .filter((header) => header.id != 0)
      .forEach((remainingHeaders) => headersNames.push(remainingHeaders.value));
    return headersNames;
  },

  getChartHeaderData: (state) => (headerName) => {
    // console.log("getChartHeaderData:", headerName);
    const headerID = state.headers.filter(
      (header) => header.value === headerName
    )[0].id;
    const headerData = [];
    state.rows.forEach((row) =>
      headerData.push(row.rowObjects[headerID].value)
    );
    // console.log("getChartHeaderData:", headerID, headerData);
    return headerData;
  },

  calculateHeadersData: (state, getters) => {
    const headerNameAndDataArray = [];
    getters.getAvailableXY.forEach((headerName) => {
      const headerNameAndDataObj = {};
      headerNameAndDataObj["name"] = headerName;
      headerNameAndDataArray.push(headerNameAndDataObj);
      headerNameAndDataObj["data"] = getters.getChartHeaderData(headerName);
    });
    return headerNameAndDataArray;
  },

  calculateScatterData: (state, getters) => (headerName1, headerName2) => {
    const h1 = getters.getChartHeaderData(headerName1);
    const h2 = getters.getChartHeaderData(headerName2);
    const data = [];
    for (var i = 0; i < h1.length; i++) {
      const temp = {};
      temp["x"] = h1[i];
      temp["y"] = h2[i];
      data.push(temp);
    }
    console.log("data:", data);
    return data;
  },
};
// ========================================== Actions ================================
const actions = {
  // -------------- Add Row Action ----------------
  addRow({ commit }) {
    /*
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
    */
    const len = state.rows.length;
    if (len != 0) {
      const lastRow = state.rows[len - 1];
      const newRow = {};
      const newRowId = lastRow.id + 1;

      newRow["id"] = newRowId;

      const newRowObjects = [];

      for (var i = 0; i < state.headers.length; i++) {
        const rowObject = {};
        if (i == 0) {
          rowObject["id"] = i;
          rowObject["value"] = newRowId + 1;
          rowObject["edit"] = false;
        } else {
          rowObject["id"] = i;
          rowObject["value"] = "col" + i;
          rowObject["edit"] = false;
        }
        newRowObjects.push(rowObject);
      }
      newRow["rowObjects"] = newRowObjects;
      console.log("len != 0");
      commit("newRow", newRow);
    } else {
      const defaultRow = {};
      defaultRow["id"] = 0;
      const newRowObjects = [];
      for (var d = 0; d < state.headers.length; d++) {
        const rowObject = {};
        if (d == 0) {
          rowObject["id"] = d;
          rowObject["value"] = d + 1;
          rowObject["edit"] = false;
        } else {
          rowObject["id"] = d;
          rowObject["value"] = "col" + d;
          rowObject["edit"] = false;
        }
        newRowObjects.push(rowObject);
      }
      defaultRow["rowObjects"] = newRowObjects;
      console.log("default row", defaultRow);
      // need to be deleted
      // id: 0,
      //   rowObjects: [
      //     //rowDataObj
      //     { id: 0, value: "1", edit: false },
      //     { id: 1, value: "col1", edit: false },
      //     { id: 2, value: "col2", edit: false },
      //     { id: 3, value: "col3", edit: false },
      //   ],
      commit("newRow", defaultRow);
    }
  },
  //----------------- Deleting Row Action ------------------
  deleteRow({ commit }) {
    commit("deleteRow");
    /*
    const numberOfRows = Object.keys(state.rows).length;
    if (numberOfRows != 0) {
      commit("deleteRow", "num" + (numberOfRows - 1));
    }
    */
  },
  //-------------------- Add Header Action -----------------
  addHeader({ commit }) {
    const len = state.headers.length;
    if (len != 0) {
      const newHeader = {};
      newHeader["id"] = len;
      newHeader["value"] = "header" + len;
      newHeader["edit"] = false;

      commit("addHeader", newHeader);
    } else {
      const defaultHeader = { id: 0, value: "#", edit: false };
      commit("addHeader", defaultHeader);
    }
    // console.log(state.rows["num0"]);
  },
  //------------------ Delete Header Action ---------------------
  deleteHeader({ commit }) {
    var len = state.headers.length;
    if (len !== 0) {
      commit("deleteHeader", state.headers[len - 1].id);
    }
  },
  //------------------ Update Header Action ------------
  updateHeader({ commit }, upHeader) {
    // we can construct a new header or evaluation
    commit("updateHeader", upHeader);
  },
  //-------------- Update Row Action -------
  updateRow({ commit }, rowDetails) {
    // console.log("rowDetails", rowDetails);
    commit("updateRow", rowDetails);
  },
};

//============================================ Mutations =================================
const mutations = {
  // ---------------- Add Row ----------------
  newRow: (state, newRow) => {
    console.log(newRow);
    //adding newRow object to the end of rows array
    state.rows.push(newRow);
  },
  /*
  newRow: (state, len) => {
    const rowNumber = "num" + Object.keys(state.rows).length;
    Vue.set(state.rows, rowNumber, rowArray);
    console.log(len);
  },
  */
  //---------------------- Deleting Row --------------
  deleteRow: (state) => {
    // Vue.delete(state.rows, name);

    //poping the last object from the rows array
    state.rows.pop();
  },
  //----------------------- Add Header ---------------
  addHeader: (state, newHeader) => {
    state.headers.push(newHeader);
    if (newHeader.id != 0) {
      state.rows.forEach((row) => {
        const rowObject = {};
        rowObject["id"] = newHeader.id;
        rowObject["value"] = "col" + newHeader.id;
        rowObject["edit"] = false;
        row.rowObjects.push(rowObject);
      });
    } else {
      state.rows.forEach((row, index) => {
        const rowObject = {};
        rowObject["id"] = 0;
        rowObject["value"] = index + 1;
        rowObject["edit"] = false;
        row.rowObjects.push(rowObject);
      });
    }

    /*
    Object.keys(state.rows).forEach((rowName) => {
      const newRow = {};
      newRow["id"] = header.id;
      newRow["value"] = "col" + header.id;
      newRow["edit"] = false;
      state.rows[rowName].push(newRow);
    });
    */
  },
  //------------------- Delete Header -------------------
  deleteHeader: (state, id) => {
    state.headers = state.headers.filter((header) => header.id !== id);
    state.rows.forEach((row) => row.rowObjects.pop());
    // Object.keys(state.rows).forEach((rowName) => state.rows[rowName].pop());
  },
  //------------------- Update Header -----------------
  updateHeader: (state, upHeader) => {
    const index = state.headers.findIndex(
      (header) => header.id === upHeader.id
    );
    if (index !== -1) {
      state.headers.splice(index, 1, upHeader);
    }
  },
  //------------------ Update Row -----------------
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
