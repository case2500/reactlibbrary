import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import MemberForm from "../Member/MemberForm";
import {
  createMember,
  getMembers,
  selectIsLoading,
} from "../../redux/features/member/memberSlice";

const initialState = {
  name: "",
  bio: "",
  classroom: "",
  detail:""
};

const AddMember = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [member, setMember] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  // const [bio, setBio] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, classroom, phone, status ,detail,bio} = member;

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
    navigate("/member");
    // window.location.replace("/member");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">เพิ่มรายการ</h3>
    {/* {(JSON.stringify(member))} */}
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
  );
};

export default AddMember;
