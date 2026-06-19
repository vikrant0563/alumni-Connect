import { useState } from "react";
import useAuth from "../../auth/useAuth";
import axios from "axios";
import {toast} from "react-toastify";


const LoginModal = () => {
  const [role, setRole] = useState("Alumni");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {login} =  useAuth();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    setError("");

    try{
      const {data} = await axios.post(`http://localhost:8001/${role.toLowerCase()}/login`,{
        email,
        password
      },{ withCredentials: true } );

      if(data.success){
        login(data);
        document.getElementById("login_modal").close();
        toast.success("Login successfully");
      }else{
        setError(data.message || "Login failed");
        toast.error("invalid");
      }
    }catch(err){
      console.error("Login Error: ",err);
      setError("Invalid credentials or server error");
    }finally{
      setLoading(false);
    }
  }

  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-1 text-center">Welcome Back 👋</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Login to your account</p>

        <form className="space-y-4"  onSubmit={handleSubmit}>
          {/* Role Dropdown */}
          <div>
            <label className="block mb-1 font-medium text-gray-900">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-black bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Alumni</option>
              <option>Student</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="example@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember Me and Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 bg-white" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

           {error && <p className="text-red-500 text-sm">{error}</p>}
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
          {loading ? "Logging in..." : "Login"}
          </button>

          {/* Sign Up */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </form>

        {/* Close Button */}
        <div className="modal-action mt-4">
          <form method="dialog">
            <button className="text-sm text-gray-500 hover:text-gray-800">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default LoginModal;
