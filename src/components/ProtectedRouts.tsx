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
  // Get the authentication token from the Redux store to determine if the user is authenticated.
  const isAuthenticated = useSelector(
    (state: any) => state?.login?.token
  );
   // Convert the current pathname to lowercase for case-insensitive comparison.
  const pathName = router?.pathname?.toLocaleLowerCase();

   // Check if the current path is one of the unprotected routes.
  const pathIsProtected = unProtectedRoutes.indexOf(pathName) !== -1;

  useEffect(() => {
    // If the user is not authenticated, navigate based on the current path.
    if (!isAuthenticated) {
      // If the current path is an unprotected route, navigate to that route.
      unProtectedRoutes.includes(pathName)
        ? navigate(pathName) // Navigate to the unprotected route if it's accessible.
        : navigate("/login"); // Otherwise, redirect to the login page.
    } else {
      // If the user is authenticated, navigate based on the current path.
      unProtectedRoutes.includes(pathName)
        ? navigate("/dashboard") // If it's an unprotected route, redirect to the dashboard.
        : navigate(pathName); // Otherwise, stay on the current protected route.
    }
  }, [isAuthenticated, pathIsProtected]);

  return children;
};
export default memo(ProtectedRouts);