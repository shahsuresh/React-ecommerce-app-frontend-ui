import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = (props) => {
  const isUserLoggedIn = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isUserLoggedIn, navigate]);
  return <>{isUserLoggedIn && props.children}</>;
};

export default AuthGuard;
