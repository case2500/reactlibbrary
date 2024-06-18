import React, { useState, useEffect } from "react";
import "./Modal.css";
import axios from "axios";
import { URL, URL_IMAGE } from "../../../URL";

export const ModalTransaction = ({ closeModalTransaction, showID }) => {
  const API_URL = `${URL}/transactionreturns`;
  const [showtransaction, setShowtransaction] = useState([]);
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB");

  const gettranactions = async (showID) => {
    const response = await axios.get(`${API_URL}/` + showID);
    setShowtransaction(response.data);
  };

  useEffect(() => {
    gettranactions(showID);
  }, []);

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModalTransaction();
      }}
    >
      <div className="modal w-[600px] text-md">
        <div className=" ">
          <div className="container mx-auto text-gray-600">
            ชื่อ : {showtransaction.username}
          </div>
          <hr />
          <table className="text-md">
            <>
              {showtransaction.items?.map((book, index) => (
                <tr>
                  <td className="text-md text-gray-400">{index + 1}.</td>
                  <td className="text-md text-gray-400">{book.name}</td>
                  <td>
                    <img
                      src={`${URL_IMAGE}/` + book.image}
                      className="h-10 ml-6 object-cover object-center"
                    />
                  </td>
                  <td className="text-md text-gray-400">ISBN : {book.isbn}</td>
                </tr>
              ))}
            </>
          </table>
        </div>
      </div>
      <hr />
    </div>
  );
};
