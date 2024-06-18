import React, { useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate , useParams} from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../Product/ProductForm";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";



export default function MyModal() {
  let [isOpen, setIsOpen] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  function closeModal() {
    setIsOpen(false);
    navigate("/products");
  }

  function openModal() {
    setIsOpen(true);
  }

  const saveProduct = async (e) => {
    // e.preventDefault();
    // if (e.keyCode === 13) {
      // alert("click")+e.keyCode;
     
    // }
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("isbn", product?.isbn);
    formData.append("description",product?.description);
    formData.append("status", product?.status);
    if (productImage) {
      formData.append("image", productImage);
    }
    console.log(...formData);
    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/products");
  };

  return (
    <>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden  bg-white p-1 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg  text-center font-medium leading-6 text-gray-900"
                  >
                    แก้ไขรายการ
                  </Dialog.Title>
                  <div className="mt-2">
                    <ProductForm
                      product={product}
                      productImage={productImage}
                      imagePreview={imagePreview}
                      description={description}
                      setDescription={setDescription}
                      handleInputChange={handleInputChange}
                      handleImageChange={handleImageChange}
                      saveProduct={saveProduct}
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
