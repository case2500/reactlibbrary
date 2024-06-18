import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../Product/ProductForm";
import {getProducts,createProduct,selectIsLoading} from "../../redux/features/product/productSlice";
import axios from "axios"
import { apiUrl } from "../../Constants";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
  status:""
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

// const [Cat,setCat] = useState("")

  const isLoading = useSelector(selectIsLoading);
  const inputRef = useRef();


  const { name, category, price, quantity,status,isbn } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateKSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("price", price);
    formData.append("isbn", isbn);
    formData.append("description", description);
    formData.append("image", productImage);
    if (status == undefined) {
      formData.append("status", "Enable");
    } else {
      formData.append("status", status);
    }

    console.log(...formData);

    await dispatch(createProduct(formData));
    // await dispatch(getProducts());
    //navigate("/");
    // 
    await dispatch(getProducts());
     navigate("/products");
    window.location.replace("/products");
  };


  // const LoadCatergory = async () => {
  //   const loadcategory = await axios.get(`${apiUrl}/category`);
  //   alert(JSON.stringify(loadcategory.data))
  //   setCat(loadcategory.data);
  // };
  // useEffect(() => {
  //   // inputRef.current.focus();
  //   LoadCatergory();
  // }, []);

  return (
    <div>
      {isLoading && <Loader />}
      {/* <h3 className="--mt">เพิ่มรายการ</h3> */}
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
  );
};

export default AddProduct;
