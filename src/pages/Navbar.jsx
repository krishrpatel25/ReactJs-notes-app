import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="h-[70px] w-full px-5 border-b-2 border-black flex items-center justify-between bg-white">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/public/logo.png"
            alt="Notes App Logo"
            className="h-10 w-10 border-2 border-black rounded-full"
          />
          <span className="text-black font-bold text-lg cursor-default">
            Notes App
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-3 items-center">
          <Link
            to="/"
            className="bg-[#CBB3FF] border-2 border-black text-black px-4 py-2 rounded-full hover:text-gray font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/rhf"
            className="bg-[#CBB3FF] border-2 border-black text-black px-4 py-2 rounded-full hover:text-gray font-medium transition-colors"
          >
            User Form
          </Link>
          <Link
            to="/products"
            className="bg-[#CBB3FF] border-2 border-black text-black px-4 py-2 rounded-full hover:text-gray font-medium transition-colors"
          >
            My Shop
          </Link>
          <Button className="bg-black hover:bg-gray-800 border-2 border-black rounded-full text-white">
            <Link to="/form">Add Notes</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black text-2xl focus:outline-none"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Aside Menu */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex flex-col p-5 gap-4">
          <Link
            to="/"
            className="bg-[#CBB3FF] border-2 border-black text-black px-4 py-2 rounded-full hover:text-gray font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/rhf"
            className="bg-[#CBB3FF] border-2 border-black text-black px-4 py-2 rounded-full hover:text-gray font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            User Form
          </Link>
          <Link
            to="/products"
            className="bg-[#CBB3FF] border-2 border-black text-black px-4 py-2 rounded-full hover:text-gray font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            My Shop
          </Link>
          <Button
            className="bg-black hover:bg-gray-800 border-2 border-black rounded-full text-white"
            onClick={() => setIsOpen(false)}
          >
            <Link to="/form">Add Notes</Link>
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
