<<<<<<< HEAD
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Footer from "./components/Footer";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
=======
import HomePage from './components/HomePage'
import SignIn from './components/SignIn';
import Register from './components/Register';
import Tracker from './components/Tracker';
import './App.css'
import { Route, Routes, useLocation} from "react-router-dom";
>>>>>>> 9be889c (stash)
function App() {
  const location = useLocation();
  const hideFooter =
    location.pathname == "/" ||
    location.pathname == "/register" ||
    location.pathname == "/sign-in";
  return (
<<<<<<< HEAD
    <div className="flex flex-col h-screen bg-[#d2f8bd]">
      <div className="flex-grow">
        <Routes location={location}>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/sign-in"} element={<SignIn />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </div>

      {!hideFooter && <Footer />}
=======
    <div className="bg-[#d2f8bd] h-screen">
      <Routes location={location}>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/sign-in"} element={<SignIn />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/tracker"} element={<Tracker />} />
        
      </Routes>
>>>>>>> 9be889c (stash)
    </div>
  );
}

export default App;
