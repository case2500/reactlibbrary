import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../components/loader/Loader.jsx";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../components/search/Search.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_MEMBERS,
  selectFilteredMembers,
} from "../../redux/features/member/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteMember,
  getMembers,
} from "../../redux/features/member/memberSlice.jsx";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../constant";
import DOMPurify from "dompurify";
import MyDialog from "./MyDialog.tsx";
import { Modal } from "./ModalCategory/Modal.jsx";

const MemberList = ({ members, isLoading }) => {
  const authname = JSON.parse(localStorage.getItem("name"));
  const { token } = authname;
  //
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredMembers);
  //
  const API_URL = `${BACKEND_URL}/uploads/`;
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delMember = async (id) => {
    // alert(id)
    await dispatch(deleteMember({ token, id }));
    await dispatch(getMembers());
  };

  const confirmDelete = (id) => {
    // alert(id)
    confirmAlert({
      title: "ลบ สมาชิก",
      message: "Are you sure you want to delete this member.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delMember(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_MEMBERS({ members, search }));
  }, [members, search, dispatch]);

  return (
    <div className="container">
      {/* {token} */}
      {/* isLoading:{isLoading} */}
      {/* <Link to="/add-member">
        <button className="bg-green-500 px-2 py-1 rounded-md text-white">
          เพิ่มรายการMember
        </button>
      </Link> */}
      <div className=" ">
        <MyDialog value={search} onChange={(e) => setSearch(e.target.value)} />
        {/* <div className="-mt-10 ">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div> */}
      </div>

      {/* <div className="text-start  my-3">
        <button
          onClick={() => setModalOpen(true)}
          className="btn  py-2 px-5 bg-green-400 text-white"
        >
          เพิ่มรายการ
        </button>
      </div> */}

      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
            setRefresh(!refresh);
          }}
          // onSubmit={handleSubmit}
          // defaultValue={rowToEdit !== null && rows[rowToEdit]}
          // rowToEdit={rowToEdit}
        />
      )}

      <div>
        {/* <div className="mx-2">
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div> */}
        {isLoading && <SpinnerImg />}
        <div className="container ">
          <table className="container  border-collapse border border-slate-400">
            <thead className=" border border-slate-300">
              <tr className="bg-gray-200">
                <th className=" px-1 py-2 text-center text-md">No</th>
                <th className=" px-1 py-2 text-center text-md  ">ชื่อ</th>
                <th className=" px-1 py-2 text-center text-md   ">
                  รายละเอียด
                </th>
                <th className=" px-1 py-2 text-center text-md   ">ชั้นเรียน</th>
                <th className=" px-1 py-2 text-center text-md  ">
                  เบอร์โทรศัพท์
                </th>
                <th className=" px-1 py-2 text-center text-md  ">Action</th>
                <th className=" px-1 py-2 text-center text-md  ">รูปภาพ</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product, index) => {
                const { _id, name, bio, classroom, phone } = product;
                return (
                  <tr
                    key={_id}
                    className="  text-cente text-md border border-slate-300"
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>{shortenText(name, 40)}</td>
                    <td className="text-start">
                      <div>{bio}</div>
                    </td>
                    <td className="text-center">{classroom}</td>
                    <td className="text-center">{phone}</td>
                    <td>
                      <div className=" flex flex-row">
                        <div className="mx-2">
                          <Link to={`/edit-member/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </div>
                        <div className="mx-1">
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      {product?.image ? (
                        <img
                          src={`${API_URL}` + product.image.fileName}
                          className="h-16 ml-6 object-cover object-center"
                          // alt={product.image.fileName}
                        />
                      ) : (
                        <p>No image set for this product</p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
    </div>
  );
};

export default MemberList;
