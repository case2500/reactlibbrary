import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_NAME } from "../../redux/features/auth/authSlice.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const authtoken = JSON.parse(localStorage.getItem("authtoken"));
  // const isselectName = useSelector((state) => state.auth.name);

  const authname = JSON.parse(localStorage.getItem("name"));
  const { token, name } = authname;
  useEffect(() => {
    if (!token) {
      alert("please login");
      navigate("/login");
    }
  }, [dispatch]);

  return (
    <div>
      {/* {JSON.stringify(isselectName)} */}
      <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <div className="border-b px-4 pb-6">
            <div className="text-center my-4">
              <img
                className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                src="https://randomuser.me/api/portraits/women/21.jpg"
                alt
              />
              {authname._id}
              <div className="py-2">
                <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                  {authname.name}
                </h3>
                <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                  Email: {authname.email}
                </div>
              </div>
              <div className="py-2">
                <div className="inline-flex text-gray-700 dark:text-gray-300 items-start">
                  ที่อยู่: {authname.email}
                </div>
              </div>
              <div className="py-2">
                <div className="inline-flex text-gray-700 dark:text-gray-300 items-start">
                  เบอร์โทร: 0925914655
                </div>
              </div>
              <div className="py-2 bg-green-400 px-4 py-2 rounded-sm text-white">
                <button>
                    แก้ไข
                </button>
              </div>
            </div>



            {/* <div className="flex gap-2 px-2">
      <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
        Follow
      </button>
      <button className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
        Message
      </button>
    </div>
  </div>
  <div className="px-4 py-4">
    <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
      <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
        <path className d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z" />
      </svg>
      <span><strong className="text-black dark:text-white">12</strong> Followers you know</span>
    </div> */}
            {/* <div className="flex">
      <div className="flex justify-end mr-2">
        <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/men/32.jpg" alt />
        <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/31.jpg" alt />
        <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/men/33.jpg" alt />
        <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/32.jpg" alt />
        <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/men/44.jpg" alt />
        <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/42.jpg" alt />
        <span className="flex items-center justify-center bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-full h-10 w-10">
          +999
        </span>
      </div>
    </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
