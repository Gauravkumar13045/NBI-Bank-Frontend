import React from 'react';
import Home from "./routes/home.jsx"
import Login from "./routes/login.jsx"
import Signup from "./routes/signup.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {


  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

      </BrowserRouter>




    </div>
  )
}

export default App
