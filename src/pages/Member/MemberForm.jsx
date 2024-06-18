import React from "react";
//import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import { BACKEND_URL } from "../../constant";
const API_URL = `${BACKEND_URL}/uploads/`;

const MemberForm = ({
  member,
  productImage,
  imagePreview,
  handleInputChange,
  handleImageChange,
  saveMember,
}) => {
  return (
    <div className="container flex flex-row justify-center ">
      <form
        className="w-full max-w-lg mx-64 bg-gray-100 px-6 py-6 rounded-md"
        onSubmit={saveMember}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-1">
              ชื่อ
            </label>
            <input
              className=" block w-[350px]  text-gray-700 border border-gray-300 rounded text-md py-1 px-2 mb-1 "
              type="text"
              name="name"
              value={member?.name}
              onChange={handleInputChange}
              placeholder="ชื่อ"
            />
          </div>
          <div className="w-full text-md md:w-1/2 px-3 mb-2 md:mb-0"></div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-md text-gray-700 font-bold  mb-2">
              classroom
            </label>
            <input
              className="block w-full  text-gray-700 border text-md  border-gray-300 rounded py-1 px-2 mb-1 "
              type="text"
              name="classroom"
              value={member?.classroom}
              onChange={handleInputChange}
              placeholder="class"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-gray-700 text-md font-bold mb-2">
              โทรศัพท์
            </label>
            <input
              className="block w-full  text-gray-700 border text-md  border-gray-300 rounded py-1 px-2 mb-1 "
              type="text"
              name="phone"
              value={member?.phone}
              onChange={handleInputChange}
              placeholder=""
            />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 font-bold text-md  mb-2">
              สถานะ
            </label>
            {/* <input
              className="block w-full  text-gray-700 border border-gray-300  py-1 px-4 mb-1 "
              type="text"
              name="status"
              value={member?.status}
              onChange={handleInputChange}
              placeholder=""
            /> */}
            <select
              className=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-2 text-md pr-8 -md"
              name="status"
              value={member?.status}
              onChange={handleInputChange}
            >
              <option value={member?.status}>{member?.status}</option>
              <option value="Enable">Enable</option>
              <option value="Disable">Disable</option>
            </select>
          </div>

          <div className="relative"></div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div>
                <code className="flex flex-row">
                  {member?.image ? (
                    <img
                      src={`${API_URL}` + member.image.fileName}
                      className="h-32 ml-3  my-2 object-cover object-center"
                      alt={member.image.fileName}
                    />
                  ) : (
                    <p></p>
                  )}
                  {imagePreview != null ? (
                    <div>
                      <img
                        src={imagePreview}
                        className="h-32 ml-6 my-2 object-cover object-center"
                      />
                    </div>
                  ) : (
                    <p></p>
                  )}
                </code>
                <input
                  type="file"
                  name="image"
                  className="px-3 mt-4"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>
          </div>

          <div className=" text-md mx-4">
            <div className="mb-2 font-bold text-gray-500">
              <label>รายละเอียด:</label>
            </div>
            <textarea rows="2" cols="50" name="bio" value={member?.bio}  onChange={handleInputChange} />
            <div >
              <button
                type="submit"
                className="bg-green-500 px-5 py-2 my-2 rounded-md text-white"
              >
                บันทึกรายการ
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
