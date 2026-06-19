import { Outlet } from "react-router-dom";
import AlumniNavbar from "../components/AlumniNavbar";
import Footer from "../components/Footer";

const AlumniLayout = () => {
  return (
    <>
      <AlumniNavbar />
      <main className="min-h-[80vh] px-4 py-6 bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AlumniLayout;
