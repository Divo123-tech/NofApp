import HomePage from './components/HomePage'
import SignIn from './components/SignIn';
import Register from './components/Register';
import './App.css'
import { Route, Routes, useLocation} from "react-router-dom";
function App() {
  const location = useLocation();
  return (
    <div className="bg-[#d2f8bd] h-screen">
      <Routes location={location}>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/sign-in"} element={<SignIn />} />
      <Route path={"/register"} element={<Register />} />
        
      </Routes>
    </div>
  )
}

export default App
