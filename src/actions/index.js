export const incriment = (id) => {
  return {
    type: "Add_Product",
    payload: id
  };
};
export const decriment = () => {
  return {
    type: "Remove_Product",
  };
};
