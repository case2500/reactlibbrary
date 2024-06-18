import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { URL } from "../../URL";
import axios from "axios";
import { apiUrl } from "../../Constants";
import { useState } from "react";
import Swal from "sweetalert2";

const authtoken = JSON.parse(localStorage.getItem("token"));
// const [success, setSuccess] = useState("");
// const [error, setError] = useState("");
const initialState = {
  member: null,
  members: [],
  isError: false,
  isSuccess: false,
};

const confirmDelete = () => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "อีเมล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง",
  });
};
// Create New Product
export const createmember = createAsyncThunk(
  "member/create",
  async ({ authtoken, formData }, thunkAPI) => {
    //  Swal.fire("อีเมล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง")
    // console.log(data);
    // const apiUrl = "https://api.codingthailand.com/api/register";
    await axios
      .post(`${URL}/user/`, formData, {
        // headers: {
        //   authtoken,
        // },
      })
      .then((result) => {
        // Swal.fire({
        //   title: "The Internet?",
        //   text: "That thing is still around?",
        //   icon: "question"
        // });

        // alert("result"+JSON.stringify(result))
        if (result.data === "registered") {
          //  confirmDelete()
          alert("อีเมล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง");
        } 
        if (result.data === "success") {
          //  confirmDelete()
          alert("success");
        }
      });
  }
);

// Delete a Member
export const deleteMember = createAsyncThunk(
  "members/delete",
  async ({ authtoken, id }, thunkAPI) => {
    alert("authtoken" + id);
    // try {
    const response = await axios.delete(`${apiUrl}/user/` + id, {
      headers: {
        authtoken,
      },
    });
    return response.data;
    // } catch (error) {
    //     const message =
    //         (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    //     console.log(message)
    //     return thunkAPI.rejectWithValue(message)
    // }
  }
);

// ***************** getCategories
export const getMember = createAsyncThunk(
  "member/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/user`);
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

// ***************** getCategories
export const updateUser = createAsyncThunk(
  "member/updateUser",
  async ({ formData }, thunkAPI) => {
    // try {
    alert(authtoken);
    const response = await axios.put(`${URL}/user/member`, formData, {
      // headers:{
      //   authtoken
      // }
    });
    alert(JSON.stringify(response));
    return response.data;
    // } catch (error) {
    //   const message =
    //     (error.response &&
    //       error.response.data &&
    //       error.response.data.message) ||
    //     error.message ||
    //     error.toString();
    //   console.log(message);
    //   return thunkAPI.rejectWithValue(message);
    // }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMember.fulfilled, (state, action) => {
      // state.isSuccess = true;
      // state.isError = false;
      // console.log(action.payload);
      state.members = action.payload;
      // alert(JSON.stringify(state.members))
    });
    //   .addCase(getCategories.rejected, (state, action) => {

    //     state.isError = true;
    //     state.message = action.payload;
    //     toast.error(action.payload);
    //   })
    //   .addCase(getCategory.fulfilled, (state, action) => {

    //     state.isSuccess = true;
    //     state.isError = false;
    //     // console.log(action.payload);
    //     state.category = action.payload;
    //   })
    //   .addCase(getCategory.rejected, (state, action) => {

    //     state.isError = true;
    //     state.message = action.payload;
    //     toast.error(action.payload);
    //   })
  },
});

// export const selectCategory = (state) => state.member;
export const selectMembers = (state) => state.member.members;
export default memberSlice.reducer;
