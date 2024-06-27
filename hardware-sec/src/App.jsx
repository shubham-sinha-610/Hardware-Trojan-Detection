// import { SignIn } from "@clerk/clerk-react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from "react";
import Details from "./pages/Details";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Details />} /> 
    </Routes>
  );
}

export default App;
