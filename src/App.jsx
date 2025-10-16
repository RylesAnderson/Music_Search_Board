import "./App.css";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { MusicBoardSearch, Contact, Home, SearchTrackPage } from "./components/pages";

function App() {
  return (
    <>
    <div className="navbar-fixed">
      <Navbar />
    </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MusicBoardSearch" element={<MusicBoardSearch />} />
        <Route path="/SearchTrackPage" element={<SearchTrackPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </>
  );
}

export default App;