import { createSlice } from '@reduxjs/toolkit'


const initialState = {
 filterMembers:[]
}

const filterSlice = createSlice({
  name: "filtermember",
  initialState,
  reducers: {
    FILTER_MEMBERS(state, action) {
      const { members, search } = action.payload;
      // alert("search="+members)
      const tempmembers = members.filter(
        (member) =>
          member.name.toLowerCase().includes(search.toLowerCase()) 
          //  ||
          // member.email.toLowerCase().includes(search.toLowerCase())
      );
//  alert(JSON.stringify(tempmembers))
      state.filterMembers = tempmembers;
   
    },
  },
});
export const {FILTER_MEMBERS} = filterSlice.actions
export const selectFilteredMembers = (state) =>state.filtermember.filterMembers

export default filterSlice.reducer