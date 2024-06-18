import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../URL";
import { ModalTransaction } from "./TransactionModal/ModalTransaction.jsx";
import Search from "../../components/search/Search.jsx";
import ReactPaginate from "react-paginate";
import {
  FILTER_TRA,
  selectFilteredTrans,
} from "../../redux/features/trans/filterSlice.jsx";
import { useDispatch, useSelector } from "react-redux";

const TransactionsDashboard = () => {
  const dispatch = useDispatch();
  const API_URL = `${URL}/transactions`;
  const [trans, setTrans] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [showID, setShowID] = useState("");
  const [tblname, setTblname] = useState("");
  const [billnomodal, seBillNoModal] = useState("");
  const [modalOpenPrint, setModalOpenPrint] = useState(false);
  const [search, setSearch] = useState("");
  const filteredtrans = useSelector(selectFilteredTrans);

  const getTransactions = async () => {
    const response = await axios.get(API_URL);
    setTrans(response.data.data);
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredtrans.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredtrans.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredtrans]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredtrans.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const showModal = (e, seat_NO, bill_NO) => {
    seBillNoModal(bill_NO);
    setTblname(seat_NO);
    setShowID(e);
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(FILTER_TRA({ trans, search }));
  }, [trans, search, , dispatch]);

  return (
    <div className="px-10">
      <div className="mt-10 ">
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <table className="w-full text-md max-h-[350px] text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-1 py-2 text-center text-md">
              ลำดับที่
            </th>
            <th scope="col" className="w-48 px-1 py-2 text-md text-center">
              วันที่ทำรายการ
            </th>
            <th scope="col" className="w-64 px-1 py-2 text-md text-center">
              ชื่อ-นามสกุล
            </th>
            <th scope="col" className="px-1 py-2 text-md text-center">
              ชื่อผู้ทำรายการ
            </th>
            <th scope="col" className="px-1 py-2 text-md text-center">
              จำนวนหนังสือที่ยืม
            </th>
            <th scope="col" className="px-1 py-2 text-md text-center">
              Action
            </th>
          </tr>
        </thead>

        {currentItems.map((tran, index) => (
          <tbody className="text-gray-700">
            <tr key={index}>
              <td className="px-1 py-1 text-center  border-b border-slate-200">
                {index + 1}
              </td>
              <td className="px-1 py-1 text-center border-b  border-slate-200">
                {tran.updatedAt.slice(8, 10) +
                  "-" +
                  tran.updatedAt.slice(5, 7) +
                  "-" +
                  (Number(tran.updatedAt.slice(0, 4)) + 543)}
              </td>
              <td className="px-1 py-1 text-start border-b  border-slate-200">
                {tran.username}
              </td>
              <td className="px-1 py-1 text-center border-b border-slate-200">
                {tran.staff_user}
              </td>

              <td className="px-1 py-1 text-center border-b border-slate-200">
                {tran.items.length}
              </td>
              <td className="px-1 py-1 text-center border-b border-slate-200">
                <button
                  onClick={() => {
                    showModal(tran._id, tran.seat_NO, tran.bill_NO);
                  }}
                >
                  {/* {tran._id} */}
                  {tran.status === "open" ? (
                    <div className="text-green-500 text-md">Show</div>
                  ) : (
                    <div className="text-white px-4 rounded-sm py-1 text-md bg-green-500">
                      แสดงรายการ{" "}
                    </div>
                  )}
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      {modalOpenPrint && (
        <ModalPrint
          closeModalPrint={() => {
            setModalOpenPrint(false);
          }}
          showID={showID}
          tblname={tblname}
          billnomodal={billnomodal}
          setModalOpenPrint={setModalOpenPrint}
          modalOpenPrint={modalOpenPrint}
        />
      )}
      {modalOpen && (
        <ModalTransaction
          closeModalTransaction={() => {
            setModalOpen(false);
          }}
          showID={showID}
          tblname={tblname}
          billnomodal={billnomodal}
          setModalOpenPrint={setModalOpenPrint}
          modalOpenPrint={modalOpenPrint}
        />
      )}
      <main className="max-w-[1240px]  mx-auto max-h-[550px] mt-5">
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
    </div>
  );
};

export default TransactionsDashboard;
