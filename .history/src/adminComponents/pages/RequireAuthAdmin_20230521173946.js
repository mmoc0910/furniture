import React from "react";
import { useSelector } from "react-redux";

const RequireAuthAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  if (user.isAdmin) return null;
  return <></>;
};

export default RequireAuthAdmin;
