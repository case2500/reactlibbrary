import React, { useEffect, useState } from "react";
//import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import { BACKEND_URL } from "../../constant";
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// const API_URL = `${BACKEND_URL}/api/products/`;
// import "./ProductForm.scss";
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/uploads/`;
import axios from "axios";
import { apiUrl } from "../../Constants";
const ProductForm = ({
  product,
  productImage,
  imagePreview,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  const [cat, setCat] = useState("");
  const LoadCatergory = async () => {
    const loadcategory = await axios.get(`${apiUrl}/category`);
    setCat(loadcategory.data);
  };
  useEffect(() => {
    LoadCatergory();
  }, []);
  // const check = (e) => {
  //   alert(e);
  //   if (e.keyCode === 13) {
  //     alert("click");

      
  //   }
  // };
  return (
    <div className="container flex flex-row justify-center ">
{/* {(product.status)} */}
      <form
        className="w-full max-w-[5oopx] mx-64 bg-gray-100 px-6 py-4 rounded-md"
        onSubmit={saveProduct}
      >
        <div className="flex flex-wrap -mx-3 mb-1 ">
          <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-md border-gray-300  font-bold ">
              ชื่อสินค้า 
            </label>
            <input
              className=" block w-[350px] text-md text-gray-700 border border-gray-300 py-1 px-2 mb-1 "
              type="text"
              name="name"
              value={product?.name}
              onChange={handleInputChange}
              placeholder="ชื่อสินค้า"
            />
            {/* <p className="text-red-500 text-md italic">
              Please fill out this field.
            </p> */}
          </div>
          {/* <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0 text-md"></div> */}
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-md border-gray-300 rounded font-bold ">
              ราคา
            </label>
            <input
              className="block w-full  text-gray-700 border border-gray-300 text-md rounded py-1 px-4 mb-1 "
              type="text"
              name="price"
              value={product?.price}
              onChange={handleInputChange}
              placeholder=" ราคา"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-md border-gray-300 rounded font-bold ">
              จำนวน
            </label>
            <input
              className="block w-full  text-gray-700 border border-gray-300 text-md rounded py-1 px-4 mb-1 "
              type="text"
              name="quantity"
              value={product?.quantity}
              onChange={handleInputChange}
              placeholder="จำนวน"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-md border-gray-300 rounded font-bold ">
              สถานะ
            </label>
            <select
              className=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-1 text-md pr-8 rounded-md"
              name="status"
              value={product?.status}
              onChange={handleInputChange}
            >
              <option value={product?.status}>{product?.status}</option>
              <option value="Enable">Enable</option>
              <option value="Disable">Disable</option>
            </select>

          </div>
         
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-md border-gray-300 rounded font-bold ">
                ISBN
              </label>
              <input
                className="block w-full  text-gray-700 border border-gray-300 rounded py-1 px-2 text-md mb-1 "
                type="text"
                name="isbn"
                value={product?.isbn}
                onChange={handleInputChange}
                placeholder="ISBN"
              />
            </div>
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-md border-gray-300 rounded font-bold ">
                หมวดหมู่
              </label>
            </div>

            <div className="mb-5">
              <select
                name="category"
                value={product?.category}
                onChange={handleInputChange}
                required
                className="flex p-1  font-bold w-36 text-center text-gray-500 text-md md:text-left md:mb-0"
              >
                <option>หมวดหนังสือ</option>
                {cat.length > 0 &&
                  cat.map((item) => (
                    <option key={item._id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3 text-md">
              <div>
                <code className="flex flex-row">
                  {product?.image ? (
                    <img
                      src={`${API_URL}` + product.image.fileName}
                      className="h-24 ml-3  my-1 object-cover object-center"
                      alt={product.image.fileName}
                    />
                  ) : (
                    <p></p>
                  )}

                  {/* {product?.image ? <></> : <p></p>} */}
                  {imagePreview != null ? (
                    <div>
                      <img
                        src={imagePreview}
                        className="h-32 ml-6 my-1 object-cover object-center"
                      />
                    </div>
                  ) : (
                    <p></p>
                  )}
                </code>
                <input
                  type="file"
                  name="image"
                  className="px-3 mt-2"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>
          </div>
          <div className="text-md">
            <label>รายละเอียด:</label>
            <textarea
              rows="2" cols="50"
              name="description"
              value={product?.description}
              onChange={handleInputChange}

            />

            <div className="--my">
              <button
                type="button"
                onClick={saveProduct}
                className="bg-green-500 px-5 py-2 my-2 rounded-md text-white"
              >
               บันทึก
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};




export default ProductForm;
