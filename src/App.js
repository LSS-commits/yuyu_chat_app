import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "./context/AuthContext";
import "./styles.scss";

function App(){
  // get user from AuthContext
  const {currentUser} = useContext(AuthContext);
  // TODO: remove test response
  console.log(currentUser);

  // TODO: 404 page or navigate to login or home

  // protected route : if there's no user authenticated, navigate to login
  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login"/>;
    }
    // return children;
  };


  // TODO: how to prevent authenticated user from navigating to register and login pages ?
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
          }/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;