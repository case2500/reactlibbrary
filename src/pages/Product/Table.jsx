import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { ImPencil } from 'react-icons/im'
import { Link,  } from 'react-router-dom'

import { imageUrl } from '../../Constants'
// const imageUrl = 'http://localhost:4000'
const Table = ({ currentItems, confirmDelete, currencyFormat }) => {
    function currencyFormat(num) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div >
            <table className="px-1 py-2 text-sm text-left text-gray-500 bg-blue-200 w-1/8">
                <thead className="text-xs text-gray-700 uppercase ">
                    <tr>
                        <th className="w-10 px-1 py-2">No</th>
                        <th className="w-10 px-1 py-2 text-center text-xl">รูปภาพ</th>
                        <th className="w-10 px-1 py-2 text-center text-xl">ชื่อ</th>
                        <th className="w-10 px-1 py-2 text-center text-xl ">ราคา</th>
                        <th className=" w-10 px-1 py-2 text-center text-xl ">จำนวน</th>
                        <th className="w-10 px-1 py-2 text-center text-xl">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems &&
                        currentItems.map((p, index) => (
                            <tr className="px-2 bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700"  >
                                <td className="w-10 px-1 " key={index}>{index + 1}</td>
                                <td className="w-32 mx-auto text-md ">
                                    <img src={`${imageUrl}/uploads/products/${p.image}`}  className="w-10 mx-auto  "/>
                                </td>
                                <td className="w-72 mx-auto text-md ">{p.name}</td>
                                <td className="w-16 px-1  text-md text-right ">{currencyFormat(p.price)}</td>
                                <td className="w-64 px-1  text-md text-center">{p.stock}</td>
                                <td className="w-64 px-1  text-md text-center">{p.ISBN}</td>
                                <td className="px-1  text-md w-96">
                                    <Link to={'/update-product/' + p._id}>
                                        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                            <ImPencil />
                                        </button>{' '}
                                    </Link>
                                    <button
                                        onClick={() => confirmDelete(p._id)}
                                        className="px-4 py-2 font-semibold text-red-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
