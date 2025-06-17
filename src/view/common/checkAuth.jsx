import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CheckAuth = ({ isAuthenticated, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/profile") {
      setTimeout(function(){
        if(!isAuthenticated){
          navigate("/login", { replace: true });
        }
    }, 100)
    } else if (
      (currentPath === "/login" || currentPath === "/register")
    ) {
      setTimeout(function(){
        if(isAuthenticated){
        navigate("/profile", { replace: true });
        }
      }, 100)
    }
  }, []);

  return <>{children}</>;
};

export default CheckAuth;