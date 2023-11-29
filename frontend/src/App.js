import { Route, Routes } from "react-router-dom";
import "./App.css";
import Splash from "./componenets/Authentication";
import { UserProvider } from "./lib/UserContext";
import Home from "./componenets/Home";
import EditAndUpdateSector from "./componenets/EditAndUpdateSector";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/update" element={<EditAndUpdateSector />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
