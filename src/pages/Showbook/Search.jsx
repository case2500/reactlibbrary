import React from "react";
// import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const Search = ({ value, onChange }) => {
  return (
    <div className="flex flex-row my-2 justify-center">
   
      <BiSearch size={18} className="ml-10 mr-2 mt-2" />
      <input
        type="text"
        className="border bg-gry-200 mr-5"
        placeholder="Search "
        value={value}
        onChange={onChange}
      />

    </div>
  );
};

export default Search;
