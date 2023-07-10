const changeProduct = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "Add_Product":
      console.log("state", state.count, action);
      return { ...state, count: (state.count + action.payload) };

    case "Remove_Product":
      return (state = state - 1);
    default:
      console.log("statedefault", state);
      return state;
  }
};

export default changeProduct;
