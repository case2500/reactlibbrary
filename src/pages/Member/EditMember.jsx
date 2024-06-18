import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import MemberForm from "./MemberForm";
import {
  createMember,
  deleteMember,
  getMembers,
  updateMember,
  getMember,
  selectIsLoading,
  selectMembers,
  selectMemberOne,
} from "../../redux/features/member/memberSlice";

const EditMember = () => {
  let [isOpen, setIsOpen] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const memberEdit = useSelector(selectMemberOne);

  const [member, setMember] = useState(memberEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  // const [bio, setBio] = useState("");

  const authname = JSON.parse(localStorage.getItem("name"));
  const { token, name } = authname;

  useEffect(() => {
    dispatch(getMember({ token, id }));
    //
  }, [dispatch, id]);

  useEffect(() => {
    setMember(memberEdit);
    setImagePreview(
      memberEdit && memberEdit.image ? `${memberEdit.image.filePath}` : null
    );
    // setBio(memberEdit && memberEdit ? memberEdit.bio : "");
  }, [memberEdit]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
    // alert(JSON.stringify(member))
  };
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const saveMember = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", member?.name);
    formData.append("classroom", member?.classroom);
    formData.append("bio", member?.bio);
    formData.append("phone", member?.phone);
    formData.append("status", member?.status);
    if (productImage) {
      formData.append("image", productImage);
    }
    console.log(...formData);
    await dispatch(updateMember({ token, id, formData }));
    await dispatch(getMembers());
    navigate("/member");
  };
  function closeModal() {
    setIsOpen(false);
    navigate("/member");
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div>
      {/* {(JSON.stringify(member))} */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-1 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg  text-center font-medium leading-6 text-gray-900"
                  >
                    แก้ไขรายการ
                  </Dialog.Title>
                  <div className="mt-2">
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* {isLoading && <Loader />} */}
      {/* mEdit:  {JSON.stringify(memberEdit)} */}
      {/* <h3 className="--mt">Edit member</h3> */}
      {/* bio {(memberEdit[0].bio)} */}
      {/* <MemberForm
        member={member}
        productImage={productImage}
        imagePreview={imagePreview}
        bio={bio}
        setBio={setBio}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveMember={saveMember}
      /> */}
    </div>
  );
};

export default EditMember;
