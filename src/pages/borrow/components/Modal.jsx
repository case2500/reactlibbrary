import React, { useState, useEffect } from "react";
import "./Modal.css";
import { useDispatch, useSelector } from "react-redux";
// import MemberList from "./MemberList";
import {
    getMembers,
} from "../../../redux/features/member/memberSlice.jsx";
import MemberList from "./MemberList.jsx";
import { BiExit } from "react-icons/bi";
export const Modal = ({ closeModal, membermodal, setMemberModal, userid, setUserId }) => {

    const dispatch = useDispatch();
    const { members, isLoading, isError, message } = useSelector(
        (state) => state.member
    );
    useEffect(() => {
        dispatch(getMembers());
        if (isError) {
            console.log(message);
        }
    }, [dispatch]);

    return (
        <div
            className="modal-container"
            onClick={(e) => {
                if (e.target.className === "modal-container") closeModal();
            }}
        >
            <div className="">
                <div className="">
                    <div className="relative bg-white rounded-lg shadow w-[750px]">
                        <MemberList
                            members={members}
                            isLoading={isLoading}
                            membermodal={membermodal}
                            setMemberModal={setMemberModal}
                            closeModal={closeModal}
                            userid={userid}
                            setUserId={setUserId}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};
