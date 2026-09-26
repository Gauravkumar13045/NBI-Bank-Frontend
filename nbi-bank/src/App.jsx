import React from 'react';
import Home from "./routes/home.jsx"
import Login from "./routes/login.jsx"
import Signup from "./routes/signup.jsx"
import Dashboard from './routes/Dashboard/Dashboard.jsx';
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {


  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

      </BrowserRouter>




    </div>
  )
}

export default App
