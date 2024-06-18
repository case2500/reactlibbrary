import React, { useState } from "react";
// import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import Card from "../../components/card/Card.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService.jsx";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice.jsx";
import Loader from "../../components/loader/Loader.jsx";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All fields are required");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data));
      navigate("/");
      window.location.replace("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}

{/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pb-24">

    <form
    // onSubmit={handleSubmit}
    className="w-full max-w-xl bg-white rounded-sm shadow-md p-6"
    >
    <div className="mt-4">
        <div className="mt-4">
        <label className="block">
            <span className="text-sm text-gray-600">รหัส SKU</span>
            
            <input
            type="text"
            required
            // defaultValue={product.productSKU}
            disabled
            className="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </label>
        <label className="block mt-4">
            <span className="text-sm text-gray-600">ชื่อสินค้า</span>
            
            <input
            type="text"
            required
            // defaultValue={product.productName}
            // onChange={(e) => setProduct({...product, productName: e.target.value})}
            className="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </label>
        <label className="block mt-4">
            <span className="text-sm text-gray-600">ราคา</span>
            
            <input
            type="number"
            // defaultValue={product.price}
            required
            // onChange={(e) => setProduct({...product, price: e.target.value})}
            className="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </label>
        </div>
        <div className="flex justify-end mt-6">
        <Link
            // href={'/products'}
            className="text-center w-24 mr-3 px-2 py-1 text-white bg-green-500 rounded-sm hover:bg-green-400 focus:outline-none active:bg-green-600"
        >
            หน้าสินค้า
        </Link>
        <button
            type="submit"
            className="w-24 px-2 py-1 text-white bg-blue-500 rounded-sm hover:bg-blue-400 focus:outline-none active:bg-blue-600"
        >
            แก้ไข
        </button>
        </div>
    </div>
    </form>
</div> */}




      <Card>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={login}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label className="my-5">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
               placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                  />
                </div>
                <div >
                  <label  className="my-5">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
            <span >
            <Link to="/">Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
          </div>
        </div>
        {/* <div >
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>

          <form onSubmit={login}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          <Link to="/forgot">Forgot Password</Link>

          <span >
            <Link to="/">Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div> */}
      </Card>
    </div>
  );
};

export default Login;
