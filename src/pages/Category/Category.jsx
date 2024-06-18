import { Table } from "./ModalCategory/Table.jsx";
import { Modal } from "./ModalCategory/Modal.jsx";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  deleteCategory,
  getCategories,
} from "../../redux/features/category/categorySlice";
import axios from "axios";
import { URL } from "../../URL";
const API_URL = `${URL}/category/`;

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState();
  const [rowToEdit, setRowToEdit] = useState(null);
  const authtoken = JSON.parse(localStorage.getItem("token"));
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };
  const getCategory = async () => {
    try {
      const response = await axios.get(API_URL);
      setRows(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, [search, dispatch, refresh]);

  const delCategory = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(id));
        window.location.replace("/add-category");
        // setRefresh(!refresh)
        // getCategory()
        // dispatch(getCategories());
      }
    });
  };

  return (
    <div >
      <div className="ml-10  my-4  text-end">
        <button
          onClick={() => setModalOpen(true)}
          className=" py-1 px-6  bg-green-500 text-white"
        >
          เพิ่มรายการ
        </button>
      </div>

      <div className="h-screen ">
        <Table rows={rows} editRow={handleEditRow} delCategory={delCategory} />
      </div>

      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
            setRefresh(!refresh);
          }}
          // onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
          rowToEdit={rowToEdit}
        />
      )}
    </div>
  );
}

export default App;
