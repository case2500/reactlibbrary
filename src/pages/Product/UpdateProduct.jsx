import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";
import axios from "axios";
import { apiUrl } from "../../Constants";
//  import { URL } from "../../../URL.js";

function UpdateProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [categorys, setCategorys] = useState([]);
  const [images, setImages] = useState("");
  const [values, setFieldValue] = useState("");
  const [product, setProduct] = useState("");
//   const [isbn, setIsbn] = useState("");

  const authtoken = JSON.parse(localStorage.getItem("authtoken"));

  const saveProduct = async () => {

    const formData = new FormData();
    formData.append("_id", id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("isbn", isbn);
    // formData.append("supplier", supplier);
    formData.append("status", status);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", images);
    await dispatch(updateProduct({ formData }))
    getproduct(id);
    history("/products")
    window.location.replace('/products')
    // window.location.reload(false);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const showPreviewImage = (values) => {
    if (values) {
      return <img src={values} style={{ height: 100, marginTop: 16 }} />;
    } else if (values.image) {
      return (
        <img
          // src={`${imageUrl}/images/${values.image}`}
          style={{ height: 100 }}
        />
      );
    }
  };

  const LoadCatergory = async () => {
    try {
      const loadcategory = await axios.get(`${apiUrl}/category`);
      setCategorys(loadcategory.data);
    } catch (error) {
      alert(error);
    }
  };

  const getproduct = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/products/product/` + id
      );
      //  alert(JSON.stringify(response.data[0]));
      setProduct(response.data[0]);
    } catch (error) {
      alert(error);
    }
  };

  //load category
  useEffect(() => {
    LoadCatergory();
  }, []);

  //load product ตาม _id
  useEffect(() => {
    getproduct(id);
  }, [dispatch]);

  //กำหนดค่า product loadตาม _id
  const {
    name,
    price,
    stock,
    category,
    description,
    isbn,
    // supplier,
    status,
  } = product;
  return (
    <div className="flex flex-row justify-center">
    
    {/* {JSON.stringify(product)}  */}
      <div >
          <div className="flex flex-row justify-center text-xl mt-10" >แก้ไขรายการหนังสือ</div>
        <form className="w-full max-w-lg bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  text-gray-500 mt-5 text-md font-bold mb-2"
                htmlFor="grid-first-name"
              >
                ชื่อสินค้า
              </label>
              <input
                type="text"
                name="name"
                value={product?.name}
                onChange={handleChange}
                placeholder="ชื่อ"
                className="w-96  rounded border-[1.5px] text-left  py-1 px-5 text-md  "
              />
            </div>

            <div className="w-full md:w-1/2 px-3"></div>

            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  text-gray-500 mt-5 text-md font-bold mb-2"
     
              >
                ราคา
              </label>
              <input
                type="number"
                name="price"
                value={product?.price}
                onChange={handleChange}
                className="w-48  text-md rounded text-center border-[1.5px] py-1 px-5  "
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  text-gray-500 mt-5 text-md font-bold mb-2"
     
              >
                จำนวน
              </label>
              <input
                type="text"
                name="stock"
                value={product?.stock}
                onChange={handleChange}
                className="w-48  text-md rounded text-center border-[1.5px] py-1 px-5  "
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  text-gray-500 mt-5 text-md font-bold mb-2"
     
              >
                ISBN :
              </label>
              <input
                type="text"
                name="isbn"
                value={product?.isbn}
                onChange={handleChange}
                className="w-48  text-md rounded text-center border-[1.5px] py-1 px-5  "
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block  text-gray-500 mt-5 text-md font-bold mb-2"   
              >
                สถานะ
              </label>
              <input
                type="text"
                name="status"
                value={product?.status}
                onChange={handleChange}
                className="w-48  text-md rounded text-center border-[1.5px] py-1 px-5  "
              />
            </div>
            <div className="w-full mx-2 ">
              <label className="block  tracking-wide text-gray-500 my-3 mx-2">
                หมวดสินค้า
              </label>
              <select
                name="category"
                onChange={handleChange}
                value={product?.category}
                className="flex  mb-2 mx-2 font-bold w-64 text-center text-gray-500 border border-amber-700 md:text-left md:mb-0"
              >
                <option>เลือกกลุ่มสินค้า</option>
                {categorys.length > 0 &&
                  categorys.map((item) => (
                    <option key={item._id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full mt-2"></div>
            {/* รูปเก่าที่loadมา */}
            <div className="w-full md:w-1/2 px-3 flex justify-center mt-5">
              <img
                src={`http://localhost:4000/uploads/products/` + product.image}
                className="flex items-center h-24 "
              /><div className="text-xl mx-2">รูปเดิม</div>
            </div>

            {/* PreviewImage รูปที่เลือก */}
            <div className="w-full md:w-1/2 px-3 flex justify-center  ">{showPreviewImage(values)}<div className="mt-4 mx-2 text-md">รูปใหม่</div></div>
            
            <form className="mx-2">
              <input
                type="file"
                onChange={(e) => {
                  e.preventDefault();
                  setImages(e.target.files[0]); // for upload
                  setFieldValue(URL.createObjectURL(e.target.files[0])); // for preview image
                }}
                name="image"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0" }}
              />
            </form>

            <div className=" mt-4 mb-6">
              <label className="block text-xl text-gray-500 mx-10 ">รายละเอียด</label>
              <textarea
                rows={6}
                placeholder="คำอธิบาย"
                className="w-96 text-md mx-10 rounded border-[1.5px] border-stroke bg-white py-3 px-5 font-medium   "
                type="text"
                name="description"
                value={product?.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            className="flex justify-center w-32 p-3 mx-5 my-2 text-xl font-medium text-white bg-green-600 rounded"
            onClick={() => saveProduct()}
          >
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
