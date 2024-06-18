import { createSlice } from '@reduxjs/toolkit'


const initialState = {
 filterUsers:[],
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_USERS(state, action) {
      const {users, search } = action.payload;
    //   alert("search ="+search)
      const tempUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        //     ||
        //   user.idcard.toLowerCase().includes(search.toLowerCase())
          ||
          user.phone?.toLowerCase().includes(search.toLowerCase())
          ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      console.log(JSON.stringify(tempUsers))
      state.filterUsers = tempUsers;

    },
  },
});
export const {FILTER_USERS} = filterSlice.actions
export const selectFilteredUsers = (state) =>state.user.filterUsers  //user => store => user:userReducer

export default filterSlice.reducer
