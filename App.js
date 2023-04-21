import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Allshows from "./components/allshows";
import Selectedshow from "./components/selectedshow";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Allshows />}></Route>
        <Route path="show/:id" element={<Selectedshow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
