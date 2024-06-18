import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Modal.css";
import { imageUrl } from "../../../Constants";

import {
  createCategory,
  updateCategory,
} from "../../../redux/features/category/categorySlice";
import { BiExit } from "react-icons/bi";
export const Modal = ({ closeModal, defaultValue, rowToEdit }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      name: "",
      image: "",
      status: "1",
    }
  );

  const [categoryImage, setCategoryImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setCategoryImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveCategory = async (e) => {
    const { name, _id, status, description } = formState;
    e.preventDefault();
    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("name", name);

    if (categoryImage) {
      formData.append("image", categoryImage);
    }

    //Update
    await dispatch(updateCategory({ _id, formData })); // await dispatch(getCategories());
    closeModal();
    // window.location.reload();
    history("/add-category");
  };
  const addCategory = async (e) => {
    const { name, description, status } = formState;
    if (name == "") {
      alert("กรุณาป้อนชื่อ");
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", categoryImage);
    await dispatch(createCategory(formData));
    closeModal();
    // history("/add-category");
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        {/* {JSON.stringify(formState)} */}
        {/* editRow={rowToEdit} */}
        <form>
          <div className="form-group">
            <label htmlFor="page">
              {rowToEdit != null ? "แก้ไขรายการหมวดหมู่" : "เพิ่มหมวดหมู่"}
            </label>
            <input name="name" onChange={handleChange} value={formState.name} />
          </div>
          <div className="">
            <div className="mt-5 text-xs text-gray-400">
              ชนิดของรูปภาพ: jpg, jpeg, png
            </div>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview != null ? (
              <div className="my-2 mx-5 ">
                <img
                  src={imagePreview}
                  alt="category"
                  className="cover-fill max-w-[100px] max-h-[100px] "
                />
              </div>
            ) : (
              <p className="my-10"></p>
            )}
          </div>

          {rowToEdit != null ? (
            <div className=" mx-5  -mt-6">
              <img
                src={`${imageUrl}/uploads/${formState.image.fileName}`}
                className="object-center h-16  "
              />
            </div>
          ) : (
            <div></div>
          )}
          {rowToEdit !== null ? (
            <button type="submit" className="btn bg-green-500 px-5 py-2 rounded-md" onClick={saveCategory}>
              แก้ไขรายการ
            </button>
          ) : (
            <button
              type="submit"
              className="btn bg-green-500 px-5 py-2 rounded-md"
              onClick={addCategory}
            >
              เพิ่มรายการ
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
