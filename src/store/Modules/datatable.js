//---------------------- application state store

const state = {
  headers: [
    { id: 0, value: "#" },
    { id: 1, value: "header1" },
    { id: 2, value: "header2" },
    { id: 3, value: "header3" },
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
  /* 
  async fetchTodos({ commit }) {
    // const response = await axios.get(
    //   "https://jsonplaceholder.typicode.com/todos"
    // );
    // commit("setTodos", response.data);
  },
  function addTodo({ commit }, title) {
    // const response = await axios.post(
    //   "https://jsonplaceholder.typicode.com/todos",
    //   { title, completed: false }
    // );
    // commit("newTodo", response.data);
  },
  async deleteTodo({ commit }, id) {
    // await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    // commit("removeTodo", id);
  },
  async filterTodos({ commit }, e) {
    // // get selected number
    // const limit = parseInt(
    //   e.target.options[e.target.options.selectedIndex].innerText
    // );
    // const response = await axios.get(
    //   `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    // );
    // commit("setTodos", response.data);
  },
  async updateTodo({ commit }, upTodo) {
    // const response = await axios.put(
    //   `https://jsonplaceholder.typicode.com/todos/${upTodo.id}`,
    //   upTodo
    // );
    // commit("updateTodo", response.data);
  }, 
*/
  addRow({ commit }) {
    // const response = await axios.post(
    //   "https://jsonplaceholder.typicode.com/todos",
    //   { title, completed: false }
    // );
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

    commit("addHeader", newHeader);
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

    // state.rows.splice(0, 1, {
    //   id: 1,
    //   col1: "col1",
    //   col2: "col2",
    //   col3: "col3",
    //   col4: "col4",
    // });
    // state.rows.splice(1, 1, {
    //   id: 2,
    //   col1: "col1",
    //   col2: "col2",
    //   col3: "col3",
    //   col4: "col4",
    // });
    // state.rows.splice(2, 1, {
    //   id: 3,
    //   col1: "col1",
    //   col2: "col2",
    //   col3: "col3",
    //   col4: "col4",
    // });

    // var length = state.rows.length;

    // for (var i = 0; i < length; i++) {
    //   const index = state.rows.findIndex((row) => row.id === i + 1);
    //   if (index !== -1) {
    //     const row = state.rows[i];
    //     state.rows.splice(i, 1, row);
    //   }
    // }
    // console.log(state.rows);
    // state.rows= state.rows.forEach(row => row["col" + header.id] = "col" + header.id);
    // state.rows.forEach((row) => {
    //   row["col" + header.id] = "col" + header.id;
    //   console.log(row);
    // });
  },

  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  updateTodo: (state, upTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === upTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, upTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
