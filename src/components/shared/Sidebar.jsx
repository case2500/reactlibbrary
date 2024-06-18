import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { FcBullish } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/constants.jsx";
import { useNavigate } from "react-router-dom";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar({ open, setOpen }) {
  const history = useNavigate();

  const logout = async () => {
    localStorage.removeItem("token");
    // await dispatch(SET_NAME(""));
    // navigate("/login");
  };

  return (
    <div className="bg-neutral-900 w-42 p-3 flex flex-col">
      <div className="py-4 flex flex-1 flex-col gap-0.5">
  
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink
            key={link.key}
            link={link}
            open={open}
            setOpen={setOpen}
          />
        ))}

        {
          <div
            className={classNames(linkClass, "cursor-pointer text-red-500")}
            onClick={() => {
              localStorage.removeItem("name");
              history("/login");
            }}
          >
            {open ? (
              <>
                <span className="text-xl -mx-3">
                  <HiOutlineLogout />
                </span>
              </>
            ) : (
              <>
                <span className="text-xl">
                  <HiOutlineLogout />
                </span>
                Logout
              </>
            )}
          </div>
        }
      </div>

      {open ? null : (
        <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
          {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
            <SidebarLink key={link.key} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarLink({ link, open, setOpen }) {
  const { pathname } = useLocation();

  return (
    <div>
      {open ? (
        <span className="text-xl text-white bg-neutral-700">{link.icon} </span>
      ) : (
        <Link
          to={link.path}
          className={classNames(
            pathname === link.path
              ? "bg-neutral-700 text-white"
              : "text-neutral-400",
            linkClass
          )}
        >
          <span className="text-xl">{link.icon}</span>
          {link.label}
        </Link>
      )}
    </div>
  );
}
