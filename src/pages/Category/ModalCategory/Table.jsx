import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { imageUrl } from "../../../Constants";
import ReactPaginate from "react-paginate";

export const Table = ({ rows, editRow, delCategory }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % rows.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(rows?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(rows?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, rows]);

  useEffect(() => {}, [itemOffset, itemsPerPage, rows]);
  return (
    <div className="table-wrapper  ">
      <table className="px-1 py-2 text-sm text-left text-gray-500 bg-blue-200  w-full">
        <thead className="text-md text-gray-700 uppercase ">
          <tr className="w-32  text-md ">
            <th className="w-32 px-2 py-2">No</th>
            <th className="w-64  px-5">รายชื่อ</th>
            <th></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((row, idx) => (
            <tr
              key={idx}
              className=" bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="w-16 mx-auto px-5  text-md ">
                {" "}
                {idx + itemOffset + 1}.
              </td>
              <td className="w-64 mx-auto text-md ">{row.name}</td>

              <td className="w-64 mx-auto text-md ">
                {row?.image ? (
                  <>
                    {/* {`${imageUrl}/uploads/` + row.image.fileName} */}

                    <img
                      src={`${imageUrl}/uploads/` + row.image.fileName}
                      className="h-16 ml-6 object-cover object-center"
                      // alt={product.image.fileName}
                    />
                  </>
                ) : (
                  <p>No image set for this product</p>
                )}
              </td>
              <td className="w-10">
                <span className="actions">
                  <BsFillTrashFill
                    className="delete-btn"
                    onClick={() => delCategory(row._id)}
                  />
                </span>
              </td>
              <td className="w-10">
                <span className="actions mx-4">
                  <BsFillPencilFill
                    className="edit-btn "
                    onClick={() => editRow(idx + itemOffset)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-16">
        {" "}
        รายการทั้งหมด{rows?.length}{" "}
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
  );
};
