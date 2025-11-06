import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav className="h-[70px] w-full  px-5 border-b-2 border-black flex items-center justify-between  text-white">
      {/* Logo */}
      <div className="flex items-center gap-3" onClick={() => navigate("/")}>
        <img
          src="/public/logo.png" // replace with your logo path
          alt="Notes App Logo"
          className="h-10 w-10 border-2 border-black rounded-full"
        />
        <span className="text-black font-bold text-lg cursor-default">Notes App</span>
      </div>

      {/* Links */}
      <div className="flex gap-8">
        <Link
          to="/"
          className="bg-[#CBB3FF] border-2 border-black text-black px-4 py-2 rounded-full hover:text-gray font-medium transition-colors"
        >
          Home
        </Link>
      </div>

      {/* Add Notes Button */}
      <Button className="bg-black  hover:bg-gray-800 border-2 border-black rounded-full text-white">
        <Link to="/form">Add Notes</Link>
      </Button>
    </nav>
  );
};

export default Navbar;
