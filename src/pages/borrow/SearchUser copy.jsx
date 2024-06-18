import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "./App.css";

const SearchUser = ({
  member,
  setMember,
  userid,
  username,
  handleOnSelect,
  id,
  phone,
  setId,
   setUserId,
   setUser,
   setSearchName,
  //  handleOnSearch,
  //  handleOnHover,
  //  handleOnFocus,
}) => {
  const formatResult = (item) => {
    return (
      <div className="flex flex-row ">
        <span>ชื่อ: {item.name} </span>
        {/* <span>เบอร์โทร: {item.phoe}</span> */}
        {/* <span> รหัส: {item._id}</span> */}
      </div>
    );
  };

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };
  const handleOnClear = () => {
    console.log("Cleared");
  };
  return (
    <div>
      <div className="">
        <header className=" flex flex-row justify-start mb-2 mx-10">
          {/* <span>ค้นหา </span>  */}
        <div >

      
          <div style={{ width: 400 }}>
            <ReactSearchAutocomplete
              items={member}
              onSelect={handleOnSelect}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onFocus={handleOnFocus}
              onClear={handleOnClear}
              autoFocus
              formatResult={formatResult}
              fuseOptions={{ keys: ["phone", "name", "id"] }} // Search in the description text as well
             // styling={{ zIndex: 3 }} // To display it on top of the search box below
              // onSearch={handleOnSearch}
              // onHover={handleOnHover}
              // onFocus={handleOnFocus}
            />
              </div>
          </div>
          <div className=" flex flex-row justify-center   ">
            {/* <span className="w-72 my-2 mx-1 py-1  align-text-bottom rounded-sx "><span className="mx-2">รหัส :</span>  {userid} </span> */}
            <span className="w-96 my-2 mx-1 py-1  align-text-bottom rounded-sx"><span className="mx-2"> ชื่อ : </span>{username}</span>
            <span className="w-64 my-2 mx-1 py-1  align-text-bottom rounded-sx"><span className="mx-2">เบอร์โทร : </span> {phone}</span>
          </div>
        </header>
      </div>
    </div>
  );
};

export default SearchUser;
