import { createSlice } from '@reduxjs/toolkit'


const initialState = {
 filterCategories:[]
}

const filterSlice = createSlice({
  name: "filtercategory",
  initialState,
  reducers: {
    FILTER_CATEGORIES(state, action) {
      const { categories, search } = action.payload;

      const tempcategories = categories.filter(
        (category) =>
          category.name.toLowerCase().includes(search.toLowerCase()) 
        //   product.category.toLowerCase().includes(search.toLowerCase())
      );
  // alert("temp="+JSON.stringify(tempcategories))
      state.filterCategories = tempcategories;
   
    },
  },
});
export const {FILTER_CATEGORIES} = filterSlice.actions
export const selectFilteredCategories = (state) =>state.filtercategory.filterCategories
//filtercategory => app/store =>filtercategory
// export const store = configureStore({
//   reducer: {
//       product: productReducer,
//       filter:filterReducer,
//       category:categoryReducer,
//       filtercategory:filterCategoryReducer
//     },
// })



export default filterSlice.reducer