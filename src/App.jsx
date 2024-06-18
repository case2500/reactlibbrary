import react, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
// import Navbar from "./component/navbar";
import Home from "./pages/Home/Home.jsx";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

import Dashboard from "./pages/Home/Dashboard.jsx";
import Layout from "./components/shared/Layout.jsx";
import Profile from "./pages/Home/Profile.jsx";

//product
import Products from "./pages/Product/Products.jsx";
import AddProduct from "./pages/Product/AddProduct.jsx";
import UpdateProduct from "./pages/Product/UpdateProduct.jsx";

//Category
// import Category from "./pages/Category/Category";
import Category from "./pages/Category/Category";
// import UpdateCategory from './pages/Category/UpdateCategory'

import Member from "./pages/Member/Member.jsx";
import AddMember from "./pages/Member/AddMember.jsx";
import EditMember from "./pages/Member/EditMember.jsx";

import { getLoginStatus } from "./redux/services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";

import Starborrower from "./pages/borrow/StarborrowDashboard.jsx";
import ReturnBook from './pages/return/ReturnBook.jsx'
import Transactions from './pages/Transaction/TransactionsDashboard.jsx'
import TransactionsReturn from './pages/Transactionreturn/TransactionsDashboard.jsx'
// Showbookborrow
import Showbookborrow from './pages/Showbook/Showbookborrow.jsx'

import EditProduct from "./pages/Product/EditProduct.jsx";

function App() {
  const dispatch = useDispatch();
  const name = JSON.parse(localStorage.getItem("name"));

  useEffect(() => {}, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />} />

            {/* <Route path="category" element={<Category />} /> */}
            <Route path="/category" element={<Category />} />

            <Route path="/products" element={<Products />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/add-product" element={<AddProduct />} />
            {/* <Route path="/update-product/:id" element={<UpdateProduct />} /> */}

            {/* //startborrower */}
            <Route path="/starborrower" element={<Starborrower />} />
            <Route path="/returnbook" element={<ReturnBook />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactionreturn" element={<TransactionsReturn />} />


            <Route path="showbookborrow" element={<Showbookborrow/>} />

            <Route path="/member" element={<Member />} />
            <Route path="/add-member" element={<AddMember />} />
            <Route path="/edit-member/:id" element={<EditMember />} />

            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
