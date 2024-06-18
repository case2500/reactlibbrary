import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useNavigate, Link } from "react-router-dom";

import { saveOrder, selectOrder } from "../../redux/features/order/orderSlice";
import {
  FILTER_PRODUCTS,
  // selectFilteredProduct
} from "../../redux/features/product/filterSlice.jsx"
import { deleteProduct, getProducts } from "../../redux/features/product/productSlice";

// import Search from "./Product/Search";
// import Table from "./Product/Table";
// import Navbar from "./Food/Navbar";

// orders setOrders openfood setOpenFood
// import { useOrders } from "./Hooks/useOrders";
// import { useOpenFood } from "./Hooks/useOpenFood";
// import FoodDialog from "./FoodDialog/FoodDialog";
// import Menu from "./Food/Menu";
// import OrderReturn from "./Food/OrderReturn";
// import Sidebar from "../pages/Food/Category.jsx";
// import { imageUrl } from "../../constant.jsx";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
// import SearchUser from "./Food/SearchUser.jsx";
// import MenuReturn from "./Food/MenuReturn.jsx";

const BookReturn = ({ editOrders, setEditOrder }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  // orders setOrders openfood setOpenFood
  // const orders = useOrders();
  // const openFood = useOpenFood();
  const [search, setSearch] = useState("");
  //get products
  const { products } = useSelector((state) => state.product);
  const [userid, setUserId] = useState("");
  const [username, setUserName] = useState("");
  const [items, setItem] = useState([]);
  const [bookreturn, setBookReturn] = useState([]);
  const [oldborrow, setOldborrow] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getuser = async () => {
    const userget = await axios.get("http://127.0.0.1:4000/api/user");
    setItem(userget.data);
  };

  useEffect(() => {
    getuser();
  }, []);

  const handleOnSelect = (item) => {
    // alert(JSON.stringify(item))
    setUserId((item.phone));
    setUserName(item.name);
  };
  const gotborrow = async (userid) => {
    const borrowgot = await axios.get(`${URL}/borrow/${userid}`);
    setOldborrow(borrowgot.data);
  };

  return (
    <div className="container h-fit mx-auto px-2 test-4xl   overflow-y-hidden ">
      <div className="flex mx-auto bg-white  ">
    
        <div className="w-2/3  h-12 p-5 ">
          {/* <FoodDialog {...openFood} {...orders} />
          <SearchUser
            items={items}
            setItem={setItem}
            userid={userid}
            setUserId={setUserId}
            username={username}
            setUserName={setUserName}
            handleOnSelect={handleOnSelect}
            // handleOnSearch={handleOnSearch}
            // handleOnHover={handleOnHover}
            // handleOnFocus={handleOnFocus}
          /> */}
          <hr className="mt-2"></hr>
          got= {JSON.stringify(oldborrow)}
          <MenuReturn 
          bookreturn={bookreturn} 
          setBookReturn={setBookReturn} 
          userid={userid} 
          oldborrow={oldborrow} 
          setOldborrow={setOldborrow} 
          refresh={refresh} setRefresh={setRefresh}
          
          />
        </div>
        {/* <div className="w-2/6 bg-gray-50 my-8  h-[750px] ">
          <OrderReturn
            {...orders}
            {...openFood}
            editOrders={editOrders}
            userid={userid}
            username={username}
            setUserId={setUserId}
            setUserName={setUserName}
            bookreturn={bookreturn} 
            setBookReturn={setBookReturn}
            oldborrow={oldborrow}
            setOldborrow={setOldborrow}
            refresh={refresh} setRefresh={setRefresh}
          />
        </div> */}
      </div>
    </div>
  );
};

export default BookReturn;
