import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("Cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart,
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
      localStorage.setItem("Cart", JSON.stringify(state));
    },
    removeItem(state, action) {
      const updated = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("Cart", JSON.stringify(updated));
      return updated;
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem } = cartSlice.actions;
