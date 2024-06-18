import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../URL";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search.jsx";
import {
  FILTER_BookS,
  selectFilteredBooks,
} from "../../redux/features/showbookborrow/filterSlice.jsx";
import { Modal } from "./ModalShowBook/Modal.jsx";
import { useNavigate } from "react-router-dom";

const API_URL = `${URL}/checkbook`;
const Showbookborrow = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const filteredBooks = useSelector(selectFilteredBooks);
  const [rowToEdit, setRowToEdit] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const history = useNavigate();
  const [showbook, setShowBook] = useState([]);
  const getShowBookBorrow = async () => {
    const response = await axios.get(API_URL);
    setShowBook(response.data);
    // alert(JSON.stringify(response.data))
  };

  useEffect(() => {
    getShowBookBorrow();
  }, [refresh]);

  useEffect(() => {
    dispatch(FILTER_BookS({ showbook, search }));
  }, [showbook, search, dispatch]);

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  return (
    <div className="px-10">
      <div className="mx-2">
        <span>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </span>
      </div>
      <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className=" py-3 text-center">
              ลำดับที่
            </th>
            <th scope="col" className="w-48 px-10 py-3 text-center">
              รายชื่อหนังสือ
            </th>
            <th scope="col" className="w-64 px-10 py-3 text-center">
              ชื่อ-นามสกุล
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              วันที่ยืม
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              วันที่กำหนดส่ง
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              action
            </th>
          </tr>
        </thead>
        {/* {JSON.stringify(filteredBooks)} */}
        {filteredBooks &&
          filteredBooks.map((show, index) => (
            <tbody>
              <tr key={index} className="text-md">
                <td className=" text-center  border-b py-1 border-slate-200">
                  {index + 1}
                  {/* {show._id} */}
                </td>
                <td className=" text-start  border-b py-1 border-slate-200">
                  {show.product_id.name}
                </td>
                <td className=" text-start border-b py-1 border-slate-200">
                  {show.username}
                </td>
                <td className=" text-center border-b py-1 border-slate-200">
                  {show.borrow_datedo.slice(8, 10) +
                    "-" +
                    show.borrow_datedo.slice(5, 7) +
                    "-" +
                    (Number(show.borrow_datedo.slice(0, 4)) + 543)}
                </td>
                <td className=" text-center border-b py-1 border-slate-200">
                  {show.borrow_datereturn.slice(8, 10) +
                    "-" +
                    show.borrow_datereturn.slice(5, 7) +
                    "-" +
                    (Number(show.borrow_datereturn.slice(0, 4)) + 543)}
                </td>
                <td className=" text-center">
                  <button
                    className="bg-green-500 rounded-sm px-5 py-2 text-white"
                    onClick={() => handleEditRow(show)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>

      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
            setRefresh(!refresh);
          }}
          // onSubmit={handleSubmit}
          // defaultValue={rowToEdit !== null && rows[rowToEdit]}
          rowToEdit={rowToEdit}
        />
      )}
    </div>
  );
};

export default Showbookborrow;
