// Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="loader border-3 border-x-4 border-pink-600 rounded-full w-16 h-16 animate-spin"></div>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
