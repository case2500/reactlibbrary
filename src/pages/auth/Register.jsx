import React, { useState } from "react";
// import styles from "./auth.module.scss";
// import { TiUserAddOutline } from "react-icons/ti";
// import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../redux/services/authService";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return alert("All fields are required");
    }
    if (password.length < 6) {
      return alert("Passwords must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return alert("Please enter a valid email");
    }
    if (password !== password2) {
      return alert("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        {isLoading && <Loader />}

        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={register}
          >
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                name
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="name"
                required
                name="name"
                value={name}
                onChange={handleInputChange}
              />
              {/* <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p> */}
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={handleInputChange}
              />
              {/* <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p> */}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Confirm Password"
                required
                name="password2"
                value={password2}
                onChange={handleInputChange}
              />
            </div>

            <p className="text-center text-gray-500 text-xs">
              <button
                type="submit"
                className="px-5 py-1 bg-green-500 text-xl text-white rounded-md"
              >
                Register
              </button>
            </p>
          </form>
          <span>
            <Link to="/">Home </Link>
            <p> &nbsp; Already have an account? &nbsp;</p>
            <Link to="/login" className="bg-blue-300 ">
              <button className="bg-blue-500 px-5 py-1 rounded-md">
                {" "}
                Login{" "}
              </button>
            </Link>
          </span>
          {/* <p className="text-center text-gray-500 text-xs  mt-2">
          ©2020 Acme Corp. All rights reserved.
        </p> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
