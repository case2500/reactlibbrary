import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import { Helmet } from "react-helmet";

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <Helmet>
        <script
          src="https://www.myscripts.com/scripts"
          crossorigin="anonymous"
          async
        ></script>
      </Helmet>

      <nav className="flex flex-wrap items-center justify-between p-3 bg-teal-200">
        <img
          src="https://tailwindflex.com/public/favicon.ico"
          className="h-10 w-10"
          alt="ACME"
          width={120}
        />
       <span>
       <a
            href="#"
            className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
          >
            Search :
          </a>
         <input
         className="px-2"
        placeholder="search"
        />
       </span>
    
        <div className="flex md:hidden">
          <button id="hamburger">
            <img
              className="toggle block"
              src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
              width={40}
              height={40}
            />
            <img
              className="toggle hidden"
              src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
              width={40}
              height={40}
            />
          </button>
        </div>
        <div className="toggle  w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none">
          <a
            href="#"
            className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
          >
            Home
          </a>
          <a
            href="#"
            className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
          >
            Products
          </a>
          <a
            href="#"
            className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
          >
            Pricing
          </a>
          <a
            href="#"
            className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
          >
            Contact
          </a>
        </div>
        <a
          href="#"
          className="toggle  md:flex w-full md:w-auto px-4 py-2 text-right bg-blue-900 hover:bg-blue-500 text-white md:rounded"
        >
          Create Account
        </a>
      </nav>
    </>
  );
};

export default Navbar;
