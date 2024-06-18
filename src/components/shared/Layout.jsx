import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import { FcBullish } from "react-icons/fc";
export default function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <div className=" h-screen  w-full  overflow-hidden flex flex-row">
      {open ? (
        <div className=" h-screen w-16 overflow-hidden flex flex-row">
          {" "}
          <Sidebar open={open} setOpen={setOpen} />{" "}
        </div>
      ) : (
        <Sidebar />
      )}

      <div className="flex flex-col flex-1">
        {/* <div className="grid grid-cols-2 grid-flow-col gap-4 "></div> */}

        <div className="flex-1 p-1 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
