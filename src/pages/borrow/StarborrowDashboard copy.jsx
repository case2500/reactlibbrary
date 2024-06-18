import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../redux/features/product/filterSlice.jsx";
import { getProducts } from "../../redux/features/product/productSlice.jsx";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { URL } from "../../URL";
import Orderborrow from "./../borrow/Orderborrow.jsx";
import { BACKEND_URL } from "../../constant";
import SearchUser from "./../borrow/SearchUser.jsx";

const Startborrower = () => {
  const dispatch = useDispatch();
  const API_URL = `${BACKEND_URL}/uploads/`; // orders setOrders openfood setOpenFood
  //pagingate
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 16;
  const [search, setSearch] = useState("");
  //get products
  const { products } = useSelector((state) => state.product);
  const filteredProducts = useSelector(selectFilteredPoducts);
  const [userid, setUserId] = useState("");
  const [username, setUserName] = useState("");
  const [id, setId] = useState("");
  const [member, setMember] = useState("");
  const [books, setBooks] = useState([]);
  const [phone, setPhone] = useState("");
  const [value, setValue] = useState("");

  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [oldborrow, setOldborrow] = useState([]);

  // set items เป็นค่าว่างถ้าไม่มี order
  const items = localStorage.getItem("cartbrower")
    ? JSON.parse(localStorage.getItem("cartbrower"))
    : [];

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  const getmembers = async () => {
    const getMembers = await axios.get(`${URL}/members`);
    setMember(getMembers.data);
  };

  useEffect(() => {
    getmembers();
  }, []);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handleOnSelect = (member) => {
    // แก้เป็นรหัสนักเรียน
    setUserId(member._id);
    setUserName(member.name);
    setId(member._id);
    setPhone(member.phone);
  };
  const handleFocus = (event) => event.target.select();
  const setSelect = (e) => {
    // alert("set" + e);
    setSearch(e.target.value);
    e.target.value.target.select();
  };

  async function addToOrder(book) {
    const { _id, name, image,isbn } = book;
    if (userid == "") {
      alert("กรุณาเลือกสมาชิกก่อน");
      return;
    }
    const limit = (oldborrow.length+items.length+1);
    if(limit >7){
      alert("!หนังสือเกินจำนวนที่ยืมได้")
      return
    }
    const newbook = {
      _id: _id,
      name: name,
      image: image.fileName,
      isbn:isbn
    };
    setBooks([...items, newbook]);
    localStorage.setItem("cartbrower", JSON.stringify([...items, newbook]));
  }

  const onChangeSymbol = async (e) => {
    setSymbol(e.target.value);
    const isbn = e.target.value;
    const response = await axios.put(URL + "/products/" + isbn);
    addToOrder(response.data[0]);
    setValue(response.data);
    setSymbol("");
  };

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  let currentDate = new Date();
  console.log(currentDate);

  return (
    <div >
       {/* <div className="flex flex-row justify-center py-2 bg-gray-200"> รายการยืมหนังสือ </div> */}

            <SearchUser
              member={member}
              setMember={setMember}
              userid={userid}
              setUserId={setUserId}
              username={username}
              setUserName={setUserName}
              handleOnSelect={handleOnSelect}
              id={id}
              phone={phone}
              setId={setId}
            />

        {/* end searchUser*/}
<hr></hr>

        <div className="flex flex-row justify-center my-2 ">
          <div className="flex flex-row justify-center mx-1  w-full -mt-1 ">
            <input
              type="text"
              placeholder="ค้นหาหนังสือ"
              // value={search}
              onFocus={handleFocus}
              onChange={(e) => setSelect(e)}
              className=" w-96   border border-gray-200 mt-1 p-1 text-xl"
            />
          </div>
          <div className="flex flex-row justify-center mx-1  w-full ">
            <input
              type="text"
              placeholder="ISBN"
              value={symbol}
              onChange={onChangeSymbol}
              className=" w-64  border border-gray-200 mt-1 p-1 mx-2 "
            />
          </div>
        </div>

        <div className="grid grid-cols-9 gap-x-1 mx-5 ">
          <div className="grid grid-cols-4 col-span-5 gap-x-10 -mt-2 p-2 h-[440px]   overflow-y-hidden ">
            {/* {JSON.stringify(currentItems)} */}
            {currentItems.length > 0
              ? currentItems.map((book, index) => (
                  <div key={index}>
                    <div>
                      <div className="flex flex-row justify-center">
                        <img
                          src={
                            book._id
                              ? `${API_URL}` + book.image.fileName
                              : `${API_URL}` + download.png
                          }
                          className=" h-24 object-fill"
                          onClick={() => {
                            addToOrder(book);
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-center text-xs text-gray-400  ">
                      ISBN:{book.isbn}
                    </div>
                    <div className="text-center text-xs  mb-2  ">
                    {shortenText( book.name,20)}
                      {/* {book._id ? "-" : null}  */}
                    </div>

                    <hr></hr>
                  </div>
                ))
              : null}
          </div>

          {/*End Menu  */}
          <div className="mt-10">
            <Orderborrow
              userid={userid}
              username={username}
              setUserId={setUserId}
              setUserName={setUserName}
              id={id}
              addToOrder={addToOrder}
              setId={setId}
              setBooks={setBooks}
              oldborrow={oldborrow} 
              setOldborrow={setOldborrow}
            />
          </div>
        </div>
        {/* end currentItems*/}

       
          <main className="flex flex-row mx-96 -mt-2">
            <ReactPaginate
              nextLabel="next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="previous"
              pageClassName="page-item px-5 py-1 leading-tight  rounded-md bg-white border border-blue-600    "
              pageLinkClassName="page-link "
              previousClassName="page-item px-3 py-0   rounded-md bg-white border border-blue-600 "
              previousLinkClassName="page-link"
              nextClassName="page-item px-3 py-1  rounded-md bg-white border border-blue-600  "
              nextLinkClassName="page-link  "
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active px-2 py-1 leading-tight text-red-500 rounded-md  bg-blue-600"
              renderOnZeroPageCount={null}
              className="flex flex-row justify-center gap-2"
            />
          </main>
       
        {/*End grid grid-cols-10 */}
    
    </div>
  );
};

export default Startborrower;
