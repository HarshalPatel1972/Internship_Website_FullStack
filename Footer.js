import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-6">
      <div className="container mx-auto text-center flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left Section: Logo and Copyright */}
        <div className="text-lg font-semibold">
          &copy; {new Date().getFullYear()} Sitara. All Rights Reserved. All
          Wrongs Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
