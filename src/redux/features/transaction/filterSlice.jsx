import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterTransaction: [],
};

const filterSlice = createSlice({
  name: "filtertrans",
  initialState,
  reducers: {
    FILTER_TRA(state, action) {
      const {trans,search} = action.payload;
        const tempTrans = trans.filter(
        (tran) =>
          tran.username.toLowerCase().includes(search.toLowerCase())
          //  ||
          // tran.isbn?.toLowerCase().includes(search.toLowerCase())
      )
        state.filterTransaction = tempTrans;
    },
  },
});

export const {FILTER_TRA} = filterSlice.actions;
//filtertrans ==> store.js ==>filtertrans:filtertransactionReducer
export const selectFilteredTrans = (state) => state.filtertrans.filterTransaction;
export default filterSlice.reducer;
