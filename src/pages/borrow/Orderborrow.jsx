import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveOrder,
  saveTransactions,
} from "../../redux/features/order/orderSlice";
import axios from "axios";
import { URL } from "../../URL";
import { imageUrl } from "../../Constants";
import { BACKEND_URL } from "../../constant";
import { Modal } from "./Modal.jsx";

const Orderborrow = ({
  books,
  setOpenBook,
  userid,
  username,
  id,
  setId,
  setUserId,
  setUserName,
  setBooks,
  oldborrow,
  setOldborrow,
  membermodal,
  setMemberModal,
}) => {
  const API_URL = `${BACKEND_URL}/uploads/`;
  const items = JSON.parse(localStorage.getItem("cartbrower"));
  const dispatch = useDispatch();
  const history = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState("");
  // const [oldborrow, setOldborrow] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [staff_user, setStaff_user] = useState("");

  const authname = JSON.parse(localStorage.getItem("name"));
  const { token, name } = authname;

  const deleteItem = (index) => {
    // alert(index);
    const items = JSON.parse(localStorage.getItem("cartbrower"));
    const newOrders = [...items];
    newOrders.splice(index, 1);
    localStorage.setItem("cartbrower", JSON.stringify([...newOrders]));
    setBooks([newOrders]);
  };

  const addOrderdatabase = async ({
    items,
    userid,
    newdatedo,
    newdatereturn,
    username,
    membermodal,
  }) => {
    // if (!membermodal) {
    //   alert("!กรุณาเลือกคนยีม"+membermodal._id);
    //   return;
    // }
    dispatch(
      saveOrder({
        items,
        userid,
        newdatedo,
        newdatereturn,
        username,
        staff_user,
      })
    );
    dispatch(
      saveTransactions({
        id,
        userid,
        newdatedo,
        newdatereturn,
        staff_user,
        username,
        items,
      })
    );
    localStorage.removeItem("cartbrower");
    alert("บันทึกข้อมูลสำเร็จ");
    setRefresh(!refresh);
    // setBooks([]);
    setUserId("");
    setUserName("");
    setOldborrow("");
    setId("");
    history("/starborrower");
  };
  const cancelOrder = () => {
    // alert("can")
    // setBooks([]);
    localStorage.removeItem("cartbrower");
    setBooks([]);
    alert("Cancel success");
    setUserId("");
    setUserName("");
    setOldborrow("");
    setId("");
    // setUserId("");
    // setUserName("");
    // history("/starborrower");

    setOldborrow("");
  };

  var days = 1;
  var event = new Date();
  const newdatedo = new Date(Date.now());
  //const newdatedo = new Date(Date.now() + days*24*60*60*1000);
  const d = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  // alert(newdatedo)
  const newdatereturn = d.setDate(d.getDate() + 7);
  let datethai = event.toLocaleDateString("th-TH");
  
  const gotborrow = async (userid) => {
    const borrowgot = await axios.get(`${URL}/borrow/${userid}`);
    setOldborrow(borrowgot.data);
  };

  useEffect(() => {
    gotborrow(userid);
    setStaff_user(name);
    localStorage.removeItem("cartbrower");
  }, [userid, refresh]);

  const showModel = () => {
    if (userid == "") {
      alert("กรุณาเลือกสมาชิกก่อน");
      return;
    }

    setModalOpen(true);
  };

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <div className="mx-[50px]">
      {/* <div className="text-center px-5 w-96"> {datethai} </div> */}
      {/* {JSON.stringify(items)} */}
      <div className="text-center  w-96  mx  mb-2 -mt-10">
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
            className="bg-red-600  w-32 py-1 text-white mx-1 rounded-md"
            onClick={() => cancelOrder()}
          >
            ยกเลิก
          </button>{" "}
        </div>
      </div>

      <div className="w-96">
        {datethai} จำนวน : {items && items.length} รายการ staff: {staff_user}
      </div>
      <div className="w-96 h-[350px] overflow-y-scroll overflow-x-hidden bg-gray-100">
        {/* {JSON.stringify(membermodal)} */}
        {items?.map((borrowbook, index) => (
          // eslint-disable-next-line react/jsx-key
          <div className="px-5 mt-0 ">
            <table className="w-full  table-fixed  border border-slate-200  ">
              <tr key={index}>
                <td className="w-10">{index + 1}.</td>{" "}
                <td className=" w-40 ">
                  <div className="flex flex-row justify-start text-xs">
                    {shortenText(borrowbook.name, 15)}
                  </div>
                  <div className="flex flex-row justify-start text-gray-400 text-xs">
                    {borrowbook.isbn}
                  </div>
                </td>
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
                      deleteItem(index);
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
      <div className="w-96 mt-1">
        {" "}
        รายการค้างส่ง จำนวน : {oldborrow.length} รายการ
      </div>
      <div className="w-96 flex flex-row justify-center ">
        {userid !== "" ? (
          <button
            onClick={() => showModel()}
            className="bg-green-400 px-5 py-1 rounded-md w-48 "
          >
            รายการหนังสือที่ยืม
          </button>
        ) : null}
      </div>

      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
          }}
          oldborrow={oldborrow}
        />
      )}
    </div>
  );
};

export default Orderborrow;
