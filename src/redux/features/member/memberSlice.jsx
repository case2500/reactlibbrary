import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axios from "axios";
import { apiUrl } from "../../../Constants";
import { useState } from "react";
import Swal from "sweetalert2";

// const authname = JSON.parse(localStorage.getItem("name"));
// const {token,name}=(authname)
// const authtoken = JSON.parse(localStorage.getItem("token"));
// const [success, setSuccess] = useState("");
// const [error, setError] = useState("");
const initialState = {
  member: null,
  members: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
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
// Create New createmember
export const createMember = createAsyncThunk(
  "member/create",
  async (formData, thunkAPI) => {
    try {
      axios.post(`${apiUrl}/members/`, formData).then((result) => {
        if (result.data.msg === "success") {
          alert("บันทึกข้อมูลสำเร็จ");
        }
      });
      // return result.data.msg;
    } catch (error) {
      alert("เกิดข้อผิดพลาด" + error);
    }
  }
);

// Get Member
export const getMember = createAsyncThunk(
  "member/getMember",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl}/members/` + id, {
        headers: {
          token,
        },
      });
      // alert(JSON.stringify(response.data))
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

// Delete Member
export const deleteMember = createAsyncThunk(
  "members/delete",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await axios.delete(`${apiUrl}/members/` + id, {
        headers: {
          token,
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

// ***************** getCategories
export const getMembers = createAsyncThunk(
  "member/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl}/members`);
      // alert("get member=" + JSON.stringify(response.data));
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

// ***************** updateUser
export const updateMember = createAsyncThunk(
  "member/updateMember",
  async ({ token, id, formData }, thunkAPI) => {
    try {
      // alert(id)
      const response = await axios.patch(`${apiUrl}/members/` + id, formData, {
        headers: {
          token,
        },
      });

      response.data.result == "ok"
        ? Swal.fire("แก้ไข สำเร็จ", "success")
        : null;
      return response.data;
    } catch (error) {
      alert("!แก้ไขเกิดข้อผิดพลาด");
    }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState,
  isLoading: false,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        console.log(action.payload);
        Swal.fire("เพิ่มรายการ สำเร็จ", "success");
      })
      .addCase(createMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
        Swal.fire("เกิดข้อผิกพลาด", "Error");
      })
      .addCase(getMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = action.payload;
        console.log(action.payload);
        // alert(JSON.stringify(state.members));
      })
      .addCase(getMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.member = action.payload;
      })
      .addCase(getMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.isLoading = false;
        Swal.fire("แก้ไข สำเร็จ", "success");
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.isLoading = false;
        Swal.fire("เกิดข้อผิกพลาด การแก้ไข", "Error");
      });
  },
});
export const selectIsLoading = (state) => state.product.isLoading;
// export const selectCategory = (state) => state.member;
export const selectMembers = (state) => state.member.members;
export const selectMemberOne = (state) => state.member.member;
export default memberSlice.reducer;
