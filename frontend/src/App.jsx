import { useState } from "react";
import "./App.css";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
import Navbar from "./components/Navbar";
// import AlumniCard from "./components/AlumniCard.jsx";
import logo from "./images/logo.svg"
import JobCard from "./components/JobCard.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import { ToastContainer } from 'react-toastify';
import Profile from "./pages/user/Profile.jsx";
import JobBoard from "./pages/user/JobBoard.jsx";
import AlumniBoard from "./pages/user/AlumniBoard.jsx";
import EventCategories from "./pages/user/Eventboard/EventsBoard.jsx"
import { Outlet } from 'react-router-dom';

import Home from "./pages/user/Hero.jsx";
import Donors from "../src/pages/user/Donors.jsx";
import { Route,Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout.jsx";



function App() {
  return( 
  <Routes>
    <Route path="/" element={<Home/>}></Route>

    {/* user routes */}
    <Route path="/student" element={<UserLayout/>}>
      <Route path="profile" element={<Profile/>}></Route>
      <Route path="dashboard" element={<Dashboard/>}></Route>
      <Route path="jobBoard" element={<JobBoard/>}></Route>
      <Route path="alumniBoard" element={<AlumniBoard/>}></Route>
      <Route path="eventCategories" element={<EventCategories/>}></Route>
    </Route>
  </Routes>
  )
}

export default App;
