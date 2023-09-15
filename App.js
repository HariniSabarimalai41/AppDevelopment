import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './Register';
import Login from './Login';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/reg" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
