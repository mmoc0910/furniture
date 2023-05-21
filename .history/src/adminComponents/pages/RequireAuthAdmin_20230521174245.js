import React from "react";
import { useSelector } from "react-redux";

const RequireAuthAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  React.useEffect(() => {
    if (!user.isAdmin);
  }, [user]);
  if (!user?.isAdmin) return null;
  return <>{children}</>;
};

export default RequireAuthAdmin;
