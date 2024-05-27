import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Days from "./pages/Days";
import useEvents from "./hooks/useEvents";
import Loading from "./components/Loading";


const App: React.FC = () => {
  const {isLoading} = useEvents()
  return (
    <>
    {isLoading ? (<Loading />) : (
      <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/days">Days</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/days" element={<Days />} />
      </Routes>
      </>
      )}
    </>
  );
};

export default App;
