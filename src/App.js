import Welcome from "./pages/Welcome";
import Chatboard from "./pages/Chatboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "./styles.scss";

function App(){
  // get user from AuthContext
  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser);


  // const location = useLocation();
  // console.log("current pathname:" + location.pathname);

  // protected route : if there's no user authenticated, navigate to welcome
  // TODO: PB to fix = if login/register page is refreshed, redirection to welcome...
  const PrivateRoute = ({children}) => {
    if (!currentUser) {
      // to welcome component 
      return <Navigate to="/" />;
    }
    // if a user is authenticated, return home page
    return children;
  };

  // prevent authenticated user from navigating to welcome, register and login pages
  const PublicWelcomeRoute = ({children}) => {
    if (currentUser) {
      return <Navigate to="/chatboard" />;
    }
    return children;
  };

  const PublicLoginRoute = ({children}) => {
    if (currentUser) {
      return <Navigate to="/chatboard" />;
    }
    return children;
  };
  
  const PublicRegisterRoute = ({children}) => {
    if (currentUser) {
      return <Navigate to="/chatboard" />;
    }
    return children;
  };

  // wrong address in url => to welcome UNLESS user is logged in
  const NotFoundRoute = ({children}) => {
    if (currentUser) {
      return <Navigate to="/chatboard"/>;
    }
    return children;
  }

  return (
    <Routes>
      <Route path="*" element={
          <NotFoundRoute>
              <Welcome/>
          </NotFoundRoute> 
      }/>
      <Route path="/" index element={
          <PublicWelcomeRoute>
              <Welcome/>
          </PublicWelcomeRoute> 
      }/>
      <Route path="/register" element={
          <PublicRegisterRoute>
              <Register/>
          </PublicRegisterRoute>
      }/> 
      <Route path="/login" element={
          <PublicLoginRoute>
              <Login/>
          </PublicLoginRoute>
      }/>    
      <Route path="/chatboard" element={
          <PrivateRoute>
              <Chatboard/>
          </PrivateRoute>
      }/>    
    </Routes>
  );
}

export default App;