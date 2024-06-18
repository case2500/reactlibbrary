import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../../components/loader/Loader.jsx";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
 import Search from "../../../components/search/Search.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
    FILTER_MEMBERS,
    selectFilteredMembers,
} from "../../../redux/features/member/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
    deleteMember,
    getMembers,
} from "../../../redux/features/member/memberSlice.jsx";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../../constant";
import DOMPurify from "dompurify";


const MemberList = ({ members, isLoading, membermodal, setMemberModal,closeModal,userid, setUserId }) => {

    //   const authname = JSON.parse(localStorage.getItem("name"));
    //   const {token}=(authname)
    //
    const [search, setSearch] = useState("");
    const filteredProducts = useSelector(selectFilteredMembers);
    //
    const API_URL = `${BACKEND_URL}/uploads/`;
    const dispatch = useDispatch();

    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...");
            return shortenedText;
        }
        return text;
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

    const setName = (id) => {
        // alert(JSON.stringify(id))
        setMemberModal(id)
        closeModal()
    }

    return (
        <div className="container ">
            <br></br>
            <div className="modal1">
                <div className=" text-center text-md  mt-2">
                    <h1>รายชื่อ</h1>
                </div>
                <div className="mx-2 mt-1">
                    <span>
                        <Search
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}

                        />
                    </span>
                </div>
                {isLoading && <SpinnerImg />}
                <div className="container ">
                    <table className="container  border-collapse border border-slate-400">
                        <thead className=" border border-slate-300">
                            <tr className="bg-gray-200">
                                <th className=" px-1 py-2 text-center text-xl">No</th>
                                <th className=" px-1 py-2 text-center text-xl  ">ชื่อ</th>
                                {/* <th className=" px-1 py-2 text-center text-xl   ">ชั้นเรียน</th> */}
                                <th className=" px-1 py-2 text-center text-xl  ">เบอร์โทรศัพท์</th>


                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((member, index) => {
                                const { _id, name, bio, classroom, phone } = member;
                                return (
                                    <tr
                                        onClick={() => { setName(member) }}
                                        key={_id}
                                        className="  text-center text-md border border-slate-300"
                                    >
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-start">{shortenText(name, 40)}</td>
                                        {/* <td className="text-center">{classroom}</td> */}
                                        <td className="text-center">{phone}</td>


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
