import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Footer from "./components/Footer";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  const hideFooter =
    location.pathname == "/" ||
    location.pathname == "/register" ||
    location.pathname == "/sign-in";
  return (
    <div className="flex flex-col min-h-screen bg-[#d2f8bd]">
      <div className="flex-grow">
        <Routes location={location}>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/sign-in"} element={<SignIn />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </div>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
