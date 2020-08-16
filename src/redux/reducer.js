const initialState = {
  todos: ["1"],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD": {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }
    default:
      return state;
  }
};

export default reducer;
