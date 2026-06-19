import React from "react";
import hero from "../../images/hero.png"
import heroBan from "../../images/hero-ban.jpg"
import Navbar from "../../components/Navbar";
import DonorSection from "./Donors";

const Home = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="relative bg-gradient-to-r from-blue-50 via-white to-blue-100 px-10 pt-20 pb-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        
        {/* Left Side - Text */}
        <div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Connect. Celebrate. <span className="text-blue-600">Grow Together.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Discover alumni events, reunions, workshops, and opportunities to
            stay connected with your college community.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 transition">
              Explore Events
            </button>
            <button className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition">
              Join Network
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-center outline-none">
          <img
            src={hero}
            alt="Graduation celebration"
            className="w-full max-w-lg outline-none drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
    <DonorSection></DonorSection>
    </>

  );
};

export default Home;

