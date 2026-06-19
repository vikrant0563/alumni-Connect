// src/layouts/UserLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
// import Footer from "../components/Footer.jsx";


const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] px-4 py-6">
        <Outlet />
      </main>
      
    </>
  );
};

export default UserLayout;
