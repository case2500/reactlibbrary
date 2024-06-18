import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Modal.css";
import MemberForm from "../../Member/MemberForm";

import {
  createMember,
  getMembers,
  selectIsLoading,
} from "../../../redux/features/member/memberSlice";

export const Modal = ({ closeModal, defaultValue, rowToEdit }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      name: "",
      image: "",
      status: "1",
      bio:""
    }
  );
  // const initialState = {
  //   name: "",
  //   category: "",
  //   quantity: "",
  //   price: "",
  //   status: "",
  // };
  const [member, setMember] = useState("");
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);


  const [categoryImage, setCategoryImage] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };


  const { name, classroom, phone, status,bio } = member;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
    alert(JSON.stringify(e.target))
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveMember = async (e) => {
    e.preventDefault();
    alert("save");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("classroom", classroom);
    formData.append("phone", phone);

    if (status == undefined) {
      formData.append("status", "Enable");
    } else {
      formData.append("status", status);
    }

    formData.append("image", productImage);
    // console.log(...formData);
    await dispatch(createMember(formData));
    await dispatch(getMembers());
    closeModal();
    navigate("/member");
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
     {(JSON.stringify(member))}
      <MemberForm
        member={member}
        productImage={productImage}
        imagePreview={imagePreview}
        // bio={bio}
        // setBio={setBio}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveMember={saveMember}
      />
      </div>
    </div>
  );
};
