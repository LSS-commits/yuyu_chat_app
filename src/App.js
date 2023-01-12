import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "./styles.scss";

function App(){
  // get user from AuthContext
  const {currentUser} = useContext(AuthContext);
  // TODO: remove test response
  console.log(currentUser);

  // TODO: 404 page or navigate to login or home

  // protected route : if there's no user authenticated, navigate to login
  // TODO: visitor can't access register page via url bar...
  const PrivateRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login"/>;
    }
    // if a user is authenticated, return home page
    return children;
  };

  // prevent authenticated user from navigating to register and login pages
  const PublicRouteLogin = ({children}) => {
    if (currentUser) {
      return <Navigate to="/"/>;
    }
    return children;
  };
  
  const PublicRouteRegister = ({children}) => {
    if (currentUser) {
      return <Navigate to="/"/>;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
          }/>
          <Route path="login" element={
           <PublicRouteLogin>
            <Login/>
           </PublicRouteLogin>
          }/>
          <Route path="register" element={
            <PublicRouteRegister>
              <Register/>
            </PublicRouteRegister>
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;