import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
interface ProtectedRouteProps {
  component: any;
  path: string | string[];
  props?: any;
  exact?: boolean;
}
const ProtectedRouts = ({ children }: any) => {
  const navigate = useNavigate();
  const router = useLocation();
  const unProtectedRoutes = ["/login", "/register"];
  const isAuthenticated = useSelector(
    (state: any) => state?.login?.token
  );
  const pathName = router?.pathname?.toLocaleLowerCase()
  const pathIsProtected = unProtectedRoutes.indexOf(pathName) !== -1;

  useEffect(() => {
    if (!isAuthenticated) {
      unProtectedRoutes.includes(pathName)
        ? navigate(pathName)
        : navigate("/login");
    } else {
      unProtectedRoutes.includes(pathName)
        ? navigate("/dashboard")
        : navigate(pathName);
    }
  }, [isAuthenticated, pathIsProtected]);

  return children;
};
export default memo(ProtectedRouts);