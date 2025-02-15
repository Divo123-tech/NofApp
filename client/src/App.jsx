import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Tracker from "./components/Tracker";
import Footer from "./components/Footer";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Charity from "./components/Charity"
import './App.css'
function App() {
  const location = useLocation();
  const hideFooter =
    location.pathname == "/" ||
    location.pathname == "/register" ||
    location.pathname == "/sign-in";
  return (
    <div className="flex flex-col h-screen bg-[#d2f8bd]">
      <div className="flex-grow">
        <Routes location={location}>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/sign-in"} element={<SignIn />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/tracker"} element={<Tracker />} />
          <Route path={"/charities"} element={<Charity />} />
        </Routes>
      {!hideFooter && <Footer />}
      </div>
      </div>


  );
}

export default App;
