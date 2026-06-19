import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.jsx";
import { Menu, X } from "lucide-react"; 
import logo from "../images/logo.svg";
import LoginModal from "./Modal/LoginModal.jsx";
import ProfileDropdown from "../pages/user/ProfileDropdown.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const getDashboardLink = () => {
    switch (user?.role) {
      case "STUDENT":
        return "/student/dashboard";
      case "ALUMNI":
        return "/alumni/dashboard";
      case "ADMIN":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-9 w-auto" />
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Alumni Connect
        </Link>
        </div>
       

        {/* Hamburger Icon for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-gray-700 text-md font-medium">
          {
            user?.role === "student" && (
              <>
            <Link to="/">Home</Link>
          <Link to="/student/jobBoard">Jobs</Link>
          <Link to="/student/alumniBoard">Alumni</Link>
          <Link to="/student/eventCategories">Events</Link>
             </>
            )
          }
           {
            user?.role === "alumni" && (
              <>
            <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/alumni">Alumni</Link>
          <Link to="/donate">Donate</Link>
             </>
            )
          }
           {
            user?.role === "admin" && (
              <>
            <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/alumni">Alumni</Link>
          <Link to="/donate">Donate</Link>
             </>
            )
          }
        
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <button
                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
                onClick={() => document.getElementById("login_modal").showModal()}
              >
                Login
              </button>
              <LoginModal></LoginModal>
              <button
                className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded hover:bg-blue-50 transition"
                onClick={() => document.getElementById("signup_modal").showModal()}
              >
                Sign Up
              </button>
            </>
          ) : (           
               <ProfileDropdown />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          {
            user?.role === "student" && (
              <>
               <Link to="/" className="block text-gray-700" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/student/jobs" className="block text-gray-700" onClick={toggleMenu}>
            jobs
          </Link>
          <Link to="/student/alumni" className="block text-gray-700" onClick={toggleMenu}>
            Alumni
          </Link>
          <Link to="/student/eventCategories" className="block text-gray-700" onClick={toggleMenu}>
            Events
          </Link>
              </>
            )
          }
          {
            user?.role === "alumni" && (
              <>
               <Link to="/" className="block text-gray-700" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/jobs" className="block text-gray-700" onClick={toggleMenu}>
            Jobs
          </Link>
          <Link to="/alumni" className="block text-gray-700" onClick={toggleMenu}>
            Alumni
          </Link>
          <Link to="/donate" className="block text-gray-700" onClick={toggleMenu}>
            Donate
          </Link>
              </>
            )
          }
          {
            user?.role === "admin" && (
              <>
               <Link to="/" className="block text-gray-700" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/jobs" className="block text-gray-700" onClick={toggleMenu}>
            Jobs
          </Link>
          <Link to="/alumni" className="block text-gray-700" onClick={toggleMenu}>
            Alumni
          </Link>
          <Link to="/donate" className="block text-gray-700" onClick={toggleMenu}>
            Donate
          </Link>
              </>
            )
          }
         

          {!user ? (
  <>
    <button
      className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      onClick={() => {
        document.getElementById("login_modal").showModal();
        toggleMenu();
      }}
    >
      Login
    </button>
    <LoginModal />
    <button
      className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
      onClick={() => {
        document.getElementById("signup_modal").showModal();
        toggleMenu();
      }}
    >
      Sign Up
    </button>
  </>
) : (
  <ProfileDropdown />
)}

        </div>
      )}
    </nav>
  );
};

export default Navbar;
