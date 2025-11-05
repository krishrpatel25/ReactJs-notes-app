import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Add Note", path: "/form" },
  ];

  return (
    <nav
      className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl px-6 py-3
      flex items-center justify-between bg-white rounded-3xl shadow-lg
      border border-gray-200 transition-all duration-300"
    >
      {/* Logo + Pin */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-12 rounded-xl shadow-md border border-gray-200 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="absolute -top-2 -right-2 text-xl animate-bounce">
            📌
          </span>
        </div>
        <span className="text-black font-extrabold text-2xl tracking-wide">
          Sticky Notes
        </span>
      </div>

      {/* Navigation Links */}
      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className={`font-semibold px-3 py-2 rounded-lg transition-all duration-300
      ${
        location.pathname === "/"
          ? "bg-blue-500 text-white shadow-md"
          : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
      }`}
        >
          Home
        </Link>
      </div>

      {/* Call-to-action Button */}
      <Link to="/form">
        <Button
          className="bg-black
          text-white font-bold px-6 py-2 rounded-2xl shadow-lg
          transform hover:scale-105 transition-all duration-300"
        >
          + Add Note
        </Button>
      </Link>
    </nav>
  );
};

export default Navbar;
