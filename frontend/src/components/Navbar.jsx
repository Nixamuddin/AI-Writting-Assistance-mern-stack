import React from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold"
          >
            <FaPencilAlt className="text-2xl" />
            <span>AI Writing Assistant</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/write">Write</NavLink>
          </div>
        </div>
        <div>
        
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-white hover:text-blue-200 transition duration-300"
  >
    {children}
  </Link>
);

export default Navbar;
