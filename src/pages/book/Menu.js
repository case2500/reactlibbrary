import React, { useEffect, useState } from "react";
import { getProducts } from "../../store/product/productSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../store/product/filterSlice.jsx";
import { imageUrl } from "../../Constants.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Menu = ({ setOpenBook, selectedCategory }) => {
  const dispatch = useDispatch();
  //paginaate
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 16;
  const [search, setSearch] = useState("");
  //get products
  const { products } = useSelector((state) => state.product);
  const filteredProducts = useSelector(selectFilteredProducts);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  const getPro = () => {
    dispatch(getProducts());
  };

  useEffect(() => {
    getPro();
  }, []);

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  const filterPRo = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const tempProducts = currentItems.filter((product) =>
    product.category.toLowerCase().includes(selectedCategory)
  );

  //รูปภาพเปล่า 16รูป
  let temp = [];
  const pic = { image: "657572d03710c6436b8cbaf5.webp" };
  for (let i = 0; i < itemsPerPage; i++) {
    tempProducts.push(...temp, pic);
  }
  return (
    <div>
      <div className="flex flex-row justify-center">
        <input
          type="text"
          placeholder="ค้นหาหนังสือ"
          value={search}
          onChange={filterPRo}
          className="mx-2 w-96 py-2 px-2 mt-2 bg-gray-100  "
        />
      </div>
      <div class="grid grid-cols-4 gap-x-2  p-5 h-[700px]  rounded-xl shadow-md overflow-y-hidden">
        {tempProducts.length > 0
          ? tempProducts.map((book, index) => (
              <div key={index}>
                <div>
                <div className="text-center text-xs h-8 py-2  bg-gray-100">
                  ISBN:{book.ISBN}
                </div>
                  <img
                    src={
                      book._id
                        ? `${imageUrl}/uploads/products/${book.image}`
                        : `${imageUrl}/uploads/products/download.png`
                    }
                    className="h-32 w-64 cursor-pointer "
                    onClick={() => setOpenBook(book._id ? book : null)}
                  />
                </div>
                <div className="text-center text-xs my-2 h-12 bg-gray-300">
                  {book.name}
                  {/* {book._id ? "-" : null}  */}
                </div>
              
              </div>
            ))
          : null}
      </div>
      <div className="py-5 ">
        <main className="max-w-[1240px]  mx-auto min-h-[550px]  ">
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
            activeClassName="active px-2 py-1 leading-tight text-white rounded-md  bg-blue-600"
            renderOnZeroPageCount={null}
            className="flex flex-row justify-center gap-2"
          />
        </main>
      </div>
    </div>
  );
};

export default Menu;
