import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
function Logout() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/user/logout`, {}, {
        withCredentials: true,
      });
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in Logout");
    }
  };
  return (
    <BiLogOutCircle
      className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2"
      onClick={handleLogout}
      title="Logout"
    />
  );
}

export default Logout;
