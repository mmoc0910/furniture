import React from "react";
import { useSelector } from "react-redux";

const RequireAuthAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  React.useEffect(() => {
    if (user.isAdmin) return null;
  }, [user]);
  if (!user?.isAdmin) return null;
  return <>{children}</>;
};

export default RequireAuthAdmin;
