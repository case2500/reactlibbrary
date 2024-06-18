import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../../redux/features/product/productSlice";
import filterReducer from '../../redux/features/product/filterSlice.jsx'
import categoryReducer from '../../redux/features/category/categorySlice.jsx'
import filterCategoryReducer from '../../redux/features/category/filterSlice.jsx'
import orderReducer from '../../redux/features/order/orderSlice.jsx'
import userReducer from "../../redux/features/user/filterSlice.jsx";
import memberReducer from "../../redux/features/member/memberSlice.jsx";
import filtermemberReducer from "../../redux/features/member/filterSlice.jsx";
import authReducer from "../../redux/features/auth/authSlice";
import filterShowBookReducer from '../../redux/features/showbookborrow/filterSlice.jsx'

import filterEditShowReducer from '../../redux/features/showbookborrow/showbookSlice.jsx'

import filtertransactionReducer from "../../redux/features/transaction/filterSlice.jsx";
export const store = configureStore({
    reducer: {
        product: productReducer,
        filter:filterReducer,
        category:categoryReducer,
        filtercategory:filterCategoryReducer,
        order:orderReducer,
        user:userReducer,
        member:memberReducer,
        filtermember:filtermemberReducer,
        auth: authReducer,
        filtershowbook: filterShowBookReducer,
        filtertrans:filtertransactionReducer,
        editshowbook:filterEditShowReducer,
      },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch