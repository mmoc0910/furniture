import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RequireAuthAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user);
  React.useEffect(() => {
    if (!user || !user?.isAdmin) navigate("/");
  }, [navigate, user]);
  if (!user || !user?.isAdmin) return null;
  return <>{children}</>;
};

export default RequireAuthAdmin;
