import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../components/loader/Loader.jsx";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
import Search from "../../components/search/Search.jsx";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../redux/features/product/filterSlice.jsx";
import {
  deleteProduct,
  getProducts,
} from "../../redux/features/product/productSlice.jsx";

import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../constant";
import MyDialog from "./MyDialog.tsx";

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);
  const API_URL = `${BACKEND_URL}/uploads/`;
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
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
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);




  return (
    <div className="container">
      <div className=" ">
        <MyDialog value={search} onChange={(e) => setSearch(e.target.value)} />
        {/* <div className="-mt-10 ">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div> */}
      </div>
      {/* <div className="px-5 py-2">
         <MyDialog  />
      </div>   */}
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
          {!isLoading && products.length === 0 ? (
            <p>-- No product found, please add a product...</p>
          ) : (
            <>
              <table className="container  border-collapse border border-slate-400">
                <thead className=" border border-slate-300">
                  <tr className="bg-gray-200">
                    <th className=" px-1 py-2 text-center text-md">No</th>

                    <th className=" px-1 py-2 text-center text-md  ">ชื่อ</th>
                    <th className=" px-1 py-2 text-center text-md   ">
                      หมวดหมู่
                    </th>
                    <th className=" px-1 py-2 text-center text-md   ">ราคา</th>
                    <th className=" px-1 py-2 text-center text-md  ">จำนวน</th>
                    <th className=" px-1 py-2 text-center text-md  ">ISBN</th>
                    <th className="  px-1 py-2 text-center text-md  ">
                      Action
                    </th>
                    <th className=" px-1 py-2 text-center text-md  ">รูปภาพ</th>
                  </tr>
                </thead>

                <tbody>
            
                  {currentItems.map((product, index) => {
                    const { _id, name, category, price, quantity } = product;
                    return (
                      <tr
                        key={_id}
                        className="  text-cente text-md border border-slate-300"
                      >
                        <td className="text-center">{index + 1+itemOffset}</td>
                        <td>{shortenText(name, 16)}</td>
                        <td className="text-center">{category}</td>
                        <td className="text-center">{price}</td>
                        <td className="text-center">{quantity}</td>
                        <td className="text-center">{price * quantity}</td>
                        <td>
                          <div className=" flex flex-row">
                            <div className="mx-2">
                              <Link to={`/edit-product/${_id}`}>
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
            </>
          )}
        </div>
        <div className="mx-10"> รวม  {filteredProducts.length} รายการ</div>
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

export default ProductList;
