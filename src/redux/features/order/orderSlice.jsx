import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl  } from "../../../Constants";
// Create new Order
export const saveOrder = createAsyncThunk(
  "cart/saveOrder",
  async ({ items, userid, newdatedo, newdatereturn,isbn, username,staff_user, }, thunkAPI) => {
    // alert("user=" + userid);
    try {
      const response = await axios.post(
        `${apiUrl }/borrow`,
        { items, userid, newdatedo, newdatereturn, username, isbn,staff_user, },
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

export const saveTransactions = createAsyncThunk(
  "cart/saveTransactions",
  async (
    { id, userid, newdatedo, newdatereturn, staff_user, username,items },
    thunkAPI
  ) => {
    // alert("user=" + id);
    // try {
    const response = await axios.post(
      `${apiUrl }/transactions`,
      { id, userid, newdatedo, newdatereturn, staff_user, username,items },
      {
        // headers: {
        //   authtoken,
        // },
      }
    );
    return response.data;
    // } catch (error) {
    //   const message =
    //     (error.response &&
    //       error.response.data &&
    //       error.response.data.message) ||
    //     error.message ||
    //     error.toString();
    //   return thunkAPI.rejectWithValue(message);
    // }
  }
);

export const saveTransactionreturns = createAsyncThunk(
  "cart/saveTransactionreturns",
  async (
    { id, userid, newdatedo, newdatereturn, staff_user, username,items },
    thunkAPI
  ) => {
    // alert("user=" + id);
    // try {
    const response = await axios.post(
      `${apiUrl }/transactionreturns`,
      { id, userid, newdatedo, newdatereturn, staff_user, username,items },
      {
        // headers: {
        //   authtoken,
        // },
      }
    );
    return response.data;
    // } catch (error) {
    //   const message =
    //     (error.response &&
    //       error.response.data &&
    //       error.response.data.message) ||
    //     error.message ||
    //     error.toString();
    //   return thunkAPI.rejectWithValue(message);
    // }
  }
);



export const saveReturn = createAsyncThunk(
  "cart/saveReturn",
  async ({ items, userid, newdatedo, newdatereturn }, thunkAPI) => {
    alert("user="+userid)
    try {
      const response = await axios.post(
        `${apiUrl }/borrow/` + userid,
        { items, userid, newdatedo, newdatereturn },
        {
          // headers: {
          //   authtoken,
          // },
        }
      );
      if((response.data.msg)==`success`){
        alert("บันทึกข้อมูลสำเร็จ");
      }else{
        alert("เกิดข้อผิดพลาด");
      }
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

// ******  Get a handleChangeStatus   handleChangeCompany
export const handleChangeStatus = createAsyncThunk(
  "cart/gethandleChangeStatus",
  async ({ authtoken, formData }, thunkAPI) => {
    try {
      const response = await axios.post(`${apiUrl }order/updateorder`, formData, {
        headers: {
          authtoken,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// handleChangeNoShip
// ******  Get a handleChangeNoShip
export const handleChangeNoShip = createAsyncThunk(
  "cart/gethandleChangeNoShip",
  async ({ authtoken, formData }, thunkAPI) => {
    try {
      const response = await axios.post(`${apiUrl }order/updateship`, formData, {
        headers: {
          authtoken,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ******  Get a  handleChangeCompany
export const handleChangeCompany = createAsyncThunk(
  "cart/handleChangeCompany",
  async ({ authtoken, formData }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${apiUrl }order/updateordercompany`,
        formData,
        {
          headers: {
            authtoken,
          },
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
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOrders = createAsyncThunk(
  "cart/getAll",
  async (authtoken, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl }order/getOrders`, {
        headers: {
          authtoken,
        },
      });

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ******  Get a order id
export const getOrder = createAsyncThunk(
  "cart/getOrderId",
  async ({ authtoken, id }, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl }order/getOrder/` + id, {
        headers: {
          authtoken,
        },
      });

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // alert("หมดเวลากรูณาloginใหม่")
      // console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    orders: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;

        state.order = action.payload;
        state.orderItems = action.payload;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.orders = action.payload;
      });
  },
});

export const selectOrder = (state) => state.order.orders;
export const selectUserOrder = (state) => state.order;
export default orderSlice.reducer;
