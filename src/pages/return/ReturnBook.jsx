import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../../URL";
import OrderReturn from "./OrderReturn.jsx";
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
  // const [search, setSearch] = useState("");
  //get products
  // const { products } = useSelector((state) => state.product);
  // const filteredProducts = useSelector(selectFilteredPoducts);
  const [userid, setUserId] = useState("");
  const [username, setUserName] = useState("");
  const [id, setId] = useState("");
  const [member, setMember] = useState("");
  const [books, setBooks] = useState([]);
  const [phone, setPhone] = useState("");
  const [value, setValue] = useState("");
  const [symbol, setSymbol] = useState("");
  const [oldborrow, setOldborrow] = useState([]);
  // set items เป็นค่าว่างถ้าไม่มี order
  const items = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const getmembers = async () => {
    const getMembers = await axios.get(`${URL}/members`);
    setMember(getMembers.data);
  };

  useEffect(() => {
    getmembers();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(oldborrow.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(oldborrow.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, oldborrow]);

  const handleOnSelect = (member) => {
    // แก้เป็นรหัสนักเรียน
    setUserId(member._id);
    setUserName(member.name);
    setId(member._id);
    setPhone(member.phone);
  };
  async function addToOrder(book, newindex) {
    const { _id, productname, image, isbn } = book;
    if (userid == "") {
      alert("กรุณาเลือกสมาชิกก่อน");
      return;
    }
    const newbook = {
      _id: _id,
      name: productname,
      image: image,
      isbn: isbn,
      newindex: newindex,
    };
    setBooks([...items, newbook]);
    localStorage.setItem("cart", JSON.stringify([...items, newbook]));
    removeButton(_id);
  }

  const onChangeSymbol = async (e) => {
    setSymbol(e.target.value);
    const search = e.target.value;

    const findisbn = currentItems.find((element) => element.isbn == search);
    if (!findisbn) {
      alert("ไม่มีในระบบ");
    } else {
      addToOrder(findisbn);
      setValue(findisbn);
      setSymbol("");
    }
  };

  const gotborrow = async (userid) => {
    const borrowgot = await axios.get(`${URL}/borrow/${userid}`);
    setOldborrow(borrowgot.data);
  };

  useEffect(() => {
    setOldborrow("");
    localStorage.removeItem("cart");
    gotborrow(userid);
  }, [userid]);

  const removeButton = (_id) => {
    const updatedButtons = currentItems.filter((i) => i._id !== _id);
    setCurrentItems(updatedButtons);
  };
  const addButton = (Id) => {
    const updatedButtons = oldborrow.filter((i) => i._id === Id);
    setCurrentItems([...currentItems, updatedButtons[0]]);
  };

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <div>
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
      <div className="flex flex-row justify-center my-5 ">
        <div className="flex flex-row justify-center mx-1  w-full -mt-1 "></div>
      </div>

      <div className="grid grid-cols-10 gap-x-1 mx-10 ">
        <div className="grid grid-cols-4 col-span-5 gap-x-12 -mt-2 p-2 h-[350px]   overflow-y-hidden ">
          {currentItems.length > 0 ? (
            currentItems.map((book, index) => (
              <div key={index}>
                <div>
                  <div className="flex flex-row justify-center">
                    <img
                      src={
                        book._id
                          ? `${API_URL}` + book.image
                          : `${API_URL}` + download.png
                      }
                      className=" h-20 object-fill"
                      onClick={() => {
                        addToOrder(book, index);
                      }}
                    />
                  </div>
                </div>
                <div className="text-center text-xs   ">ISBN:{book.isbn}</div>
                <div className="text-center text-xs  mb-2  ">
                  {book.productname && shortenText(book.productname, 20)}
                  {/* {book._id ? "-" : null}  */}
                </div>

                <hr></hr>
              </div>
            ))
          ) : (
            <div className="container  mx-auto   text-gray-400 ">
              <h1>ไม่มีรายการในระบบ</h1>
            </div>
          )}
        </div>

        {/*End Menu  */}

        <div className="mx-[150px] -mt-7  ">
          <div className="mx-16  mb-10 my-5 -mt-1">
            <input
              type="text"
              placeholder="ISBN"
              value={symbol}
              onChange={onChangeSymbol}
              className=" w-64  border border-gray-200  p-1 mx-2 "
            />
          </div>
          <OrderReturn
            userid={userid}
            username={username}
            setUserId={setUserId}
            setUserName={setUserName}
            id={id}
            addToOrder={addToOrder}
            setId={setId}
            setBooks={setBooks}
            addButton={addButton}
            // addId={addId}
            // setAddId={setAddId}
          />
        </div>
      </div>
      {/* end currentItems*/}

      {/* <div className="flex flex-row mx-96 -mt-2">
          <main>
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
        </div> */}
      {/*End grid grid-cols-10 */}
    </div>
  );
};

export default Startborrower;
