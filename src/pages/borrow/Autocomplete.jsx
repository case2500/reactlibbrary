import React, { Component, Fragment, useState } from "react";
import "./auto.css";
// const suggestions = [
//   { _id: "1234r4r", name: "Harddisk NVMEv2 256GB", phone: "044243223" },
//   { _id: "1234r55r", name: "สมเกียรติ", phone: "0925914650" },
//   { _id: "1234r50", name: "สมชาย", phone: "0925914653" },
//   { _id: "1234r58", name: "พิสิทธิ์", phone: "0825914600" },
// ];

const Autocomplete = ({
  member,
  phone,
  userid,
  setUserId,
  setPhone,
  setUserName,
  username,
}) => {
  const [userInput, setUserInput] = useState("");
  const [filter, setFilter] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setactiveSuggestion] = useState(0);

  // const [id, setId] = useState("");
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  const onChange = (e) => {
    //  const { suggestions } = suggestions;
    // const userInput = e.currentTarget.value;
    setUserInput(e.currentTarget.value);
    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = member.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().includes(userInput.toLowerCase()) ||
        suggestion.phone.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilter(filteredSuggestions);
    setShowSuggestions(true);
    setactiveSuggestion(0);

    console.log(JSON.stringify(filteredSuggestions));
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setShowSuggestions(false);
      setactiveSuggestion(0);
    }
  };

  const onClick = (name, id, phone) => {
    alert(name);
    setUserName(name);
    setPhone(phone);
    setactiveSuggestion(0);
    setShowSuggestions(false);
    setUserInput(name);
    setUserId(id);
  };
  return (
    <div>
      {/* {JSON.stringify(member)} */}
      <div className="flex flex-row justify-start  ">
        <div className="mx-5">
          <input
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            className="px-4 w-[250px]"
          />
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div>ID : {userid}</div>
          <div>name : {username} {" "} Phone:{phone}</div>
          <div> </div>
        </div>
      </div>

      {showSuggestions && userInput && (
        <>
          <ul class="suggestions mx-5 -mt-5">
            {filter.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={() => {
                    onClick(suggestion.name, suggestion._id, suggestion.phone);
                  }}
                >
                  {suggestion.name}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {/* {suggestionsListComponent} */}
    </div>
  );
};

export default Autocomplete;
