import React from "react";

function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404 Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you are looking for might be in another dimension.
        </p>
        <img
          src="/astro.svg"
          alt="Lost Astronaut"
          className="w-64 h-64 pointer-events-none"
        />
      </div>
    </>
  );
}

export default NotFound;
