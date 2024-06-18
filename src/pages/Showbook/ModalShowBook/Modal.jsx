import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import {
  saveEditShowBook,
  // saveTransactionreturns,
} from "../../../redux/features/showbookborrow/showbookSlice.jsx";

export const Modal = ({ closeModal, defaultValue, rowToEdit }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [formState, setFormState] = useState(
    defaultValue || {
      _id: "",
      name: "",
      image: "",
      borrow_returnStatus: "1",
    }
  );
  const handleChange = (e) => {
    alert(e.target.name+e.target.value);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const saveedit = async (e) => {
    const { borrow_returnStatus } = formState;
    e.preventDefault();
    alert(_id +"="+ borrow_returnStatus);
    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("borrow_returnStatus", borrow_returnStatus);
    await dispatch(saveEditShowBook({_id,borrow_returnStatus}));
    history("/showbookborrow");
    // window.location.replace('/showbookborrow')
    closeModal();
    
  };

  const { _id, username, product_id, borrow_returnStatus } = rowToEdit;
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <table>
            <tr>
              <td>ชื่อสมาชิก :</td>
              <td>{username} </td>
            </tr>
            <tr>
              <td>ชื่อหนังสือ :</td>
              <td>{product_id.name}</td>
            </tr>
          </table>
          <div className="mb-5">
            <select
              name="borrow_returnStatus"
              // value={borrow_returnStatus}
              value={formState.borrow_returnStatus}
              onChange={handleChange}
              required
              className="flex p-1  font-bold w-36 text-center text-gray-500 text-md md:text-left md:mb-0"
            >
              <option value="2"> ยกเลิกรายการ </option>
              <option value="1"> สถานะยืม </option>
              <option value="0"> สถานะส่งคืน </option>
            </select>
          </div>
        </form>

        <button
          type="submit"
          className="btn bg-green-500 px-5 py-2 rounded-md"
          onClick={saveedit}
        >
          แก้ไขรายการ
        </button>

        {borrow_returnStatus}
      </div>
    </div>
  );
};
