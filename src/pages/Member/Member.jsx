import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemberList from "./MemberList";
import {
  getMembers,
} from "../../redux/features/member/memberSlice.jsx";
import { Link, useNavigate } from "react-router-dom";

const Member = () => {
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
    <div>
      <MemberList members={members} isLoading={isLoading} />
    </div>
  );
};

export default Member;
