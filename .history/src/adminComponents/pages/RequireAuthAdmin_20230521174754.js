import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RequireAuthAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user);
  React.useEffect(() => {
    if (!user.isAdmin) console.log("ok");
  }, [navigate, user]);
  if (!user.isAdmin) return null;
  return <>{children}</>;
};

export default RequireAuthAdmin;
