import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredBooks: [],
};

const filterSlice = createSlice({
  name: "filtershowbook",
  initialState,
  reducers: {
    FILTER_BookS(state, action) {
      const { showbook, search } = action.payload;
// const {name} = showbook

      const tempBooks = showbook.filter(
        (book) =>
          book.product_id.name.toLowerCase().includes(search.toLowerCase())
           ||
          book.username?.toLowerCase().includes(search.toLowerCase())
      );
// alert("tempBooks=="+JSON.stringify(tempBooks))
      state.filteredBooks = tempBooks;
    },
  },
});

export const { FILTER_BookS } = filterSlice.actions;
export const selectFilteredBooks = (state) => state.filtershowbook.filteredBooks;
export default filterSlice.reducer;
