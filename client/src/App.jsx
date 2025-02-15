import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Tracker from "./components/Tracker";
import Footer from "./components/Footer";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Charity from "./components/Charity";
import "./App.css";
function App() {
  const location = useLocation();
  const hideFooter =
    location.pathname == "/" ||
    location.pathname == "/register" ||
    location.pathname == "/sign-in";
  return (
    <div className="flex flex-col h-screen bg-[#d2f8bd]">
      {/* Top Section (Like a "Top Footer") */}
      {!hideFooter && <div className="h-20 flex flex-col items-center font-semibold italic font-[Karla] py-4">
        <h1 className="text-2xl mr-8 text-[#2183d2]">NoF</h1>
        <h1 className="text-2xl ml-8 text-[#2183d2]">App</h1>
      </div>}

      {/* Main Content (Takes up remaining space) */}
      <div className="flex-grow flex flex-col">
        <Routes location={location}>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/sign-in"} element={<SignIn />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/tracker"} element={<Tracker />} />
          <Route path={"/charities"} element={<Charity />} />
        </Routes>
      </div>

      {/* Footer (Always at the bottom) */}
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
