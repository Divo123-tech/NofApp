import HomePage from './components/HomePage'
import './App.css'
import { Route, Routes, useLocation} from "react-router-dom";
function App() {
  const location = useLocation();
  return (
    <div className="bg-[#d2f8bd] h-screen">
      <Routes location={location}>
        <Route path={"/"} element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
