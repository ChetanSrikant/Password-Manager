import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 w-full fixed bottom-0 text-white py-4 flex flex-col items-center space-y-2">
      {/* Logo */}
      <div className="logo font-bold text-2xl">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">OP/ &gt;</span>
      </div>

      {/* Footer Content */}
      <div className="flex items-center space-x-2 text-sm">
        <span>Created with</span>
        <lord-icon
          src="https://cdn.lordicon.com/ulnswmkk.json"
          trigger="hover"
          colors="primary:#ff0000"
          style={{ width: "30px", height: "30px" }}
        ></lord-icon>
        <span>by @Chetan Srikant Mandiga</span>
      </div>
    </div>
  );
};

export default Footer;
