import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="h-[70px] w-[90%] max-w-4xl mx-auto mt-6 px-8 flex items-center justify-between bg-white/10 backdrop-blur-md rounded-full shadow-lg text-white">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/public/logo.png" // replace with your logo path
          alt="Notes App Logo"
          className="h-10 w-10 rounded-full"
        />
        <span className="text-white font-bold text-lg">Notes App</span>
      </div>

      {/* Links */}
      <div className="flex gap-8">
        <Link
          to="/"
          className="text-gray-200 hover:text-white font-medium transition-colors"
        >
          Home
        </Link>

       
      </div>

      {/* Add Notes Button */}
      <Button className="bg-gray-700 hover:bg-gray-600 text-white">
        <Link to="/form">Add Notes</Link>
      </Button>
    </nav>
  );
};

export default Navbar;
