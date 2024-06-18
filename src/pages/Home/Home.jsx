import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ProductList from "../../components/product/productList/ProductList";
// import ProductSummary from "../../components/product/productSummary/ProductSummary";
// import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../redux/features/auth/authSlice";
// import { getProducts } from "../../redux/features/product/productSlice";
import {
  SET_NAME,
} from "../../redux/features/auth/authSlice.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const isselectName = useSelector((state) => state.auth.name);
  // const { products, isLoading, isError, message } = useSelector(
  //   (state) => state.product
  // );

  useEffect(() => {
    if (!token) {
      alert("please login")
      navigate("/login");
    }
  }, [ dispatch]);

  const logout = async () => {
    localStorage.removeItem("token");
    await dispatch(SET_NAME(""));
    navigate("/login");
  };

  return (
    <div>
      {/* {name} */}
      <button
      className="bg-red-500 px-4 py-2 rounded-md text-white"
        onClick={() => {
          logout();
        
        }}
      >
        Logout
      </button>
      {JSON.stringify(isselectName)}
      {/* <br></br> */}
      {/* {JSON.stringify(profileRedux)} */}
      {/* <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} /> */}
    </div>
  );
};

export default Dashboard;
