//---------------------- application state store

const state = {
  headers: [
    { id: 0, value: "#" },
    { id: 1, value: "header1" },
    { id: 2, value: "header2" },
    { id: 3, value: "header3" },
  ],
  rows: [
    { id: 1, col1: "col1", col2: "col2", col3: "col3" },
    { id: 2, col1: "col1", col2: "col2", col3: "col3" },
    { id: 3, col1: "col1", col2: "col2", col3: "col3" },
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
    const latestRow = state.rows[state.rows.length - 1];
    //----constructing new row
    const row = {};
    row["id"] = latestRow.id + 1;
    for (var i = 1; i < hLen; i++) row["col" + i] = "col" + i;

    console.log(row);
    commit("newRow", row);
  },
};

const mutations = {
  newRow: (state, row) => state.rows.push(row),

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
