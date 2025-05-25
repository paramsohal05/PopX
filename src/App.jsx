import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "../src/index.css";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
