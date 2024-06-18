import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../Constants";
// saveEditShowBook
export const saveEditShowBook = createAsyncThunk(
  "showbook/saveEditShowBook",
  async ({ _id,borrow_returnStatus }, thunkAPI) => {
    try {
   
      // alert("pacth="+_id +"status="+borrow_returnStatus);
      const response = await axios.patch(`${apiUrl}/borrow/${_id}`,{borrow_returnStatus},
        {
          // headers: {
          //   authtoken,
          // },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const editshowbookSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    orders: [],
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getOrder.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(getOrder.fulfilled, (state, action) => {
  //       state.isSuccess = true;
  //       state.isError = false;

  //       state.order = action.payload;
  //       state.orderItems = action.payload;
  //     })
  //     .addCase(getOrders.fulfilled, (state, action) => {
  //       state.isSuccess = true;
  //       state.isError = false;
  //       console.log(action.payload);
  //       state.orders = action.payload;
  //     });
  // },
});

export const selectOrder = (state) => state.order.orders;
export const selectUserOrder = (state) => state.order;
export default editshowbookSlice.reducer;
