import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
import DisplayEmployees from "./components/DisplayEmployees";
import UploadEmployees from "./components/UploadEmployees";
import Home from "./components/Home";

import ProtectedRoutes from "./ProtectedRoutes";
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ loggedIn: false });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {/* <div>
        <p>links</p>
        <ul>
          <li>
            {" "}
            <Link to="/home">Home</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/display-employees">Display Employees</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/upload-employees">Upload Employees</Link>{" "}
          </li>
        </ul>
      </div> */}
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/display-employees" element={<DisplayEmployees />} />
          <Route path="/upload-employees" element={<UploadEmployees />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
