import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className="flex flex-row py-5 ">
      <BiSearch size={25} className="px-0 mt-1" />
      <input
        type="text"
        placeholder="Search products"
        value={value}
        onChange={onChange}
        className="px-5 py-2 bg-gray-100 rounded-md "
      />
    </div>
  );
};

export default Search;
