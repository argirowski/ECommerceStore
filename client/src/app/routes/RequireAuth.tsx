import React, { Fragment } from "react";
import { useUserInfoQuery } from "../../features/account/accountApi";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth: React.FC = () => {
  const { data: user, isLoading } = useUserInfoQuery();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default RequireAuth;
