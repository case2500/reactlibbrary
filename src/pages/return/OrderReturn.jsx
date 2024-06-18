import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { URL } from "../../URL";
// import { imageUrl } from "../../Constants";
import { BACKEND_URL } from "../../constant";
import {
  // saveOrder,
  // selectOrder,
  saveReturn,
  saveTransactionreturns,
} from "../../redux/features/order/orderSlice";
const OrderReturn = ({
  // books,
  // setOpenBook,
  userid,
  username,
  id,
  setId,
  setUserId,
  setUserName,
  setBooks,
  addButton,
  // addId,
  // setAddId,
}) => {

  const dispatch = useDispatch();
  const history = useNavigate();
  const items = JSON.parse(localStorage.getItem("cart"));
  const API_URL = `${BACKEND_URL}/uploads/`;
  const [user, setUser] = useState("");
  const [oldborrow, setOldborrow] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [staff_user, setStaff_user] = useState("");

  const authname = JSON.parse(localStorage.getItem("name"));
  const { token, name } = authname;

  const deleteItem = (delid, delindex) => {
    const items = JSON.parse(localStorage.getItem("cart"));
    const newOrders = [...items];
    newOrders.splice(delindex, 1);
    localStorage.setItem("cart", JSON.stringify([...newOrders]));
    setBooks([newOrders]);
    addButton(delid);
  };

  const addOrderdatabase = async ({
    items,
    userid,
    newdatedo,
    newdatereturn,
    username,
  }) => {
    if (!userid) {
      alert("!กรุณาเลือกคนยีม");
      return;
    }
    dispatch(
      saveReturn({
        items,
        userid,
        newdatedo,
        newdatereturn,
        username,
        staff_user,
      })
    );
    dispatch(
      saveTransactionreturns({
        id,
        userid,
        newdatedo,
        newdatereturn,
        staff_user,
        username,
        items,
      })
    );
    localStorage.removeItem("cart");
    setRefresh(!refresh);
    setUserId("");
    setUserName("");
    setOldborrow("");
    setId("");
    history("/returnbook");
  };
  const cancelOrder = () => {
    localStorage.removeItem("cart");
    setBooks([]);
    setUserId("");
    setUserName("");
    setOldborrow("");
    setId("");
    setOldborrow("");
    alert("Cancel success");
  };
  var event = new Date();
  const newdatedo = new Date();
  const d = new Date();
  const newdatereturn = d.setDate(d.getDate() + 7);
  let datethai = event.toLocaleDateString("th-TH");

  const gotborrow = async (userid) => {
    const borrowgot = await axios.get(`${URL}/borrow/${userid}`);
    setOldborrow(borrowgot.data);
  };

  useEffect(() => {
    gotborrow(userid);
    setStaff_user(name);
  }, [userid, refresh]);

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <div className="text-center ">
      <div className="text-center  w-96 py-1  mb-2 -mt-10">
        <div className="mt-2">
          <button
            className="bg-blue-600  w-32 py-2 text-white mx-1 rounded-md"
            onClick={() =>
              addOrderdatabase({
                items,
                userid,
                newdatedo,
                newdatereturn,
                username,
              })
            }
          >
            บันทึก
          </button>
          <button
            className="bg-red-600  w-32 py-2 text-white mx-1 rounded-md"
            onClick={() => cancelOrder()}
          >
            ยกเลิก
          </button>{" "}
        </div>
      </div>

      <div className="w-96 text-start">
        {datethai} จำนวน : {items && items.length} รายการ staff: {staff_user}
      </div>
      <div className="w-96 h-[400px] overflow-y-scroll overflow-x-hidden  bg-green-50">
        {items?.map((borrowbook, index) => (
          <div className="px-5 mt-0 ">
            <table className="w-full  table-fixed  border border-slate-200  ">
              <tr key={index}>
                <td className="w-10">{index + 1}.</td>
                <td className=" w-40 ">
                  <div className="flex flex-row justify-start text-xs">
                    {shortenText(borrowbook.name, 20)}
                  </div>
                  <div className="flex flex-row justify-start text-gray-400 text-xs">
                    {borrowbook.isbn}
                  </div>
                </td>
                <td></td>
                <td className=" w-24">
                  <img
                    className=" h-12 object-fill"
                    src={
                      borrowbook._id
                        ? `${API_URL}` + borrowbook.image
                        : `${API_URL}` + download.png
                    }
                  />
                </td>
                <td className=" w-16">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(borrowbook._id, index);
                    }}
                  >
                    🗑
                  </span>
                </td>
              </tr>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderReturn;
