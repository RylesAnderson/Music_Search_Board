import "./App.css";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { MusicBoardSearch, Contact, Home, Services } from "./components/pages";

function App() {
  return (
    <>
    <div className="navbar-fixed">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MusicBoardSearch" element={<MusicBoardSearch />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
    </>
  );
}

export default App;