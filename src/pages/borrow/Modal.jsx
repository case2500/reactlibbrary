import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Modal.css";

import { BACKEND_URL } from "../../constant";






export const Modal = ({ closeModal, oldborrow }) => {
    const API_URL = `${BACKEND_URL}/uploads/`;
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        {/* oldborrow: {JSON.stringify(oldborrow)} */}
        <div className=" mt-1 w-84 h-[450px] overflow-y-scroll overflow-x-hidden bg-gray-100 ">
        รายการหนังสือที่ยืม จำนวน : {oldborrow.length} รายการ
          {oldborrow &&
            oldborrow.map((bor, index) => (
              // eslint-disable-next-line react/jsx-key
              <div className="px-5 mt-0">
                <table className="w-full  table-fixed   border border-slate-5200 bg-slate-200">
                  <tr key={index}>
                    <td className="w-10">{index + 1}.</td>
                    <td className=" w-40 ">
                      <div className="flex flex-row justify-start">
                        {" "}
                        {bor.productname}
                      </div>{" "}
                    </td>
                    <td className=" w-40">
                      <img className=" h-8 object-fill" src={`${API_URL}` + bor.image} />
                    </td>
                  </tr>
                </table>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
