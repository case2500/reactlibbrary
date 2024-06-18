import React, { useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MemberForm from "../Member/MemberForm";

import {
  createMember,
  getMembers,
  selectIsLoading,
} from "../../redux/features/member/memberSlice";

const initialState = {
  name: "",
  classroom: "",
  phone: "",
  status: "",
  bio:"",
};

export default function MyModal({ value, onChange }) {
  let [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [member, setMember] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  // const [bio, setBio] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, classroom, phone, status,bio } = member;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
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

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
     <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={value}
                onChange={onChange}
                className=" border border-gray-100 text-gray-900 text-sm   block w-full pl-10 p-2  "
                placeholder="Search"
                required
              />
            </div>
          </form>
        </div>

        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            type="button"
            onClick={openModal}
            className="flex bg-green-500 items-center justify-center text-white   text-sm px-4 py-2 "
          >
            เพิ่มรายการ
          </button>
        </div>
      </div> 



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
                    เพิ่มรายการ
                  </Dialog.Title>
                  <div className="mt-2">
                    <MemberForm
                      member={member}
                      productImage={productImage}
                      imagePreview={imagePreview}
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
    </>
  );
}
