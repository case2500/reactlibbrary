import React, { useState,useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Modal.css";
// import { imageUrl } from "../../../Constants";
import Swal from "sweetalert2";
// import {
//   createCategory,
//   updateCategory,
// } from "../../../store/category/categorySlice";
import { createProduct } from '../../redux/features/product/productSlice.jsx'
import axios from 'axios'
// import { apiUrl} from '../Constants.js'
import { apiUrl } from '../../Constants.jsx'



export const Modal = ({ closeModal, onSubmit, defaultValue, rowToEdit }) => {
    const initialstate = {
        name: '',
        category: '',
        price: '',
        // phone: "",
        quantity: 1,
        discount: 0,
        brand: '',
        stock: 1,
        status: 1,
        categories: [],
        description: '',
        images: '',
        image: ''
    }
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [categorys, setCategorys] = useState([])

    const imageTypeRegex = /image\/(png|jpg|jpeg)/gm

    const [images, setImages] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [brand, setBrand] = useState('')
    const [discount, setDiscount] = useState(0)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [values, setFieldValue] = useState('')
    const [stock, setStock] = useState('')
    const [status, setStatus] = useState('1')
    const [supplier, setSupplier] = useState('1')
    const authtoken = JSON.parse(localStorage.getItem('token'))
    const inputRef = useRef();

    const saveProduct = async () => {

        if (category === '' ) {
            alert('please input category')
            return
        }

        if ( name === '' ) {
            alert('please input name ')
            return
        }

        if (images === null) {
            alert('please input image')
            return
        }


        const formData = new FormData()
        formData.append('productname', name)
        formData.append('price', price)
        formData.append('quantity', quantity)
        formData.append('brand', brand)
        formData.append('supplier_id', supplier)
        formData.append('stock', stock)
        formData.append('status', status)
        formData.append('discount', discount)
        formData.append('category', category)
        formData.append('description', description)
        formData.append('image', images)
        // alert(JSON.stringify("save") + JSON.stringify(name + price));
        // await dispatch(createProduct({ authtoken, formData }))
    }
    const showPreviewImage = (values) => {
        if (values) {
            return <img src={values} style={{ height: 100, marginTop: 16 }} />
        } else if (values.image) {
            return (
                <img
                    // src={`${imageUrl}/images/${values.image}`}
                    style={{ height: 100 }}
                />
            )
        }
    }

    const LoadCatergory = async () => {
        const loadcategory = await axios.get(`${apiUrl}/category`)
        setCategorys(loadcategory.data)
    }
    useEffect(() => {
      inputRef.current.focus();
        LoadCatergory()
        
    }, [])

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

        <div className="w-[1024px]">
                <div className="row mt-3">
                    <div className="col-6">
                        <div className="row">{/* {JSON.stringify(categorys)} */}</div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                            <label className="block  tracking-wide text-gray-700 text-xl font-bold px-28 py-2">
                                ชื่อสินค้า
                            </label>
                            <div className="p-6.5">
                                {/* {JSON.stringify(values)} */}
                                <input
                                    type="text"
                                    name="name"
                                    ref={inputRef}
                                    // value={values.name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="ชื่อ"
                                    className="w-full bg-gray-200 rounded border-[1.5px]  py-1 px-5 text-xl  "
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-3"></div>
                        {/* start 3column */}
                        <div className="w-full md:w-1/3 px-3">
                            <label className="block  tracking-wide text-gray-700 text-xl font-bold px-28 py-2">
                                ราคา
                            </label>
                            <input
                                type="number"
                                name="price"
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder=""
                                className="w-64 bg-gray-200 text-xl rounded text-center border-[1.5px] py-1 px-5  "
                            />{' '}
                            บาท
                        </div>
                        <div className="w-full md:w-1/3 px-3">
                            <label className="block  tracking-wide text-gray-700 text-xl font-bold px-28 py-2 ">
                                จำนวน
                            </label>
                            <input
                                type="number"
                                name="stock"
                                onChange={(e) => setStock(e.target.value)}
                                placeholder=""
                                className="w-64 bg-gray-200 text-xl rounded text-center border-[1.5px] py-1 px-5  "
                            />{' '}
                        </div>

                        <div className="w-full md:w-1/3 px-3">
                            <label className="block  tracking-wide text-gray-700 text-xl font-bold px-28 py-2 ">
                                Category
                            </label>
                            <select
                                name="category"
                                onChange={(e) => setCategory(e.target.value)}
                                required
                             className="flex p-1 mb-2 font-bold w-64 text-center text-gray-500 border border-amber-700 md:text-left md:mb-0"
                            >
                                <option>เลือกกลุ่มสินค้า</option>
                                {categorys.length > 0 &&
                                    categorys.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="w-full md:w-1/3 px-3">
                            <label className="block  tracking-wide text-gray-700 text-xl font-bold px-28 py-2 ">
                                brand
                            </label>
                            <input
                                type="text"
                                name="brand"
                                onChange={(e) => setBrand(e.target.value)}
                                placeholder=""
                                className="w-64 bg-gray-200 text-xl rounded text-center border-[1.5px] py-1   px-28 "
                            />{' '}
                        </div>

                        {/* start 3column */}
                        <div className="w-full md:w-1/3 px-3">
                            <label className="block  tracking-wide text-gray-700 text-xl font-bold px-28 py-1">
                                Supplier
                            </label>
                            <input
                                type="text"
                                name="supplier_id"
                                placeholder=""
                                onChange={(e) => setSupplier(e.target.value)}
                                className="w-64  rounded text-xl border-[1.5px]  py-1 px-5 bg-gray-200  "
                            />
                        </div>

                        <div className="w-full md:w-1/3 px-3">
                            <label className="block  tracking-wide text-gray-700 text-xl font-bold px-28 py-1">
                                Status
                            </label>
                            <input
                                type="text"
                                name="status"
                                placeholder="1"
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-64  rounded text-xl border-[1.5px] text-center  py-1 px-5 bg-gray-200  "
                            />
                        </div>

                        <div className="w-full md:w-1/3 px-3">
                            <label className="block  tracking-wide text-gray-700 text-xl font-bold px-28 py-1">
                                ลดราคา
                            </label>
                            <input
                                type="text"
                                name="discount"
                                placeholder=""
                                onChange={(e) => setDiscount(e.target.value)}
                                className="w-64  rounded text-xl border-[1.5px]  py-1 px-5 bg-gray-200  "
                            />
                        </div>
                    </div>

                    {/* end 3column */}

                    <div>{showPreviewImage(values)}</div>
                    {/* img: {JSON.stringify(images)} */}
                    {/* เลือกรูป */}
                    <div className="mt-5 ml-15 text-xl text-gray-300">
                        <form>
                            <label htmlFor="file">เลือกรูป</label>
                        </form>
                    </div>
                    <form>
                        <input
                            type="file"
                            onChange={(e) => {
                                e.preventDefault()
                                // alert(JSON.stringify(e))
                               // setImages(e.target.files[0]) // for upload
                               // setFieldValue(URL.createObjectURL(e.target.files[0])) // for preview image
                            }}
                            name="image"
                            multiple
                            accept="image/*"
                            id="files"
                            style={{ padding: '20px 0' }}
                        />
                    </form>
                    <div className="px-5 mt-4 mb-6">
                        <label className="block text-xl text-gray-300 ">รายละเอียด</label>
                        <textarea
                            rows={6}
                            placeholder="คำอธิบาย"
                            className="w-full text-xl rounded border-[1.5px] border-stroke bg-gray-200 py-3 px-5 font-medium   "
                            type="text"
                            name="description"
                            //onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button
                        className="flex justify-center w-32 p-3 mx-5 my-2 text-xl font-medium text-white bg-green-600 rounded"
                      //  onClick={() => saveProduct()}
                    >
                        บันทึก
                    </button>
                </div>
            </div>



      </div>
    </div>
  );
};
