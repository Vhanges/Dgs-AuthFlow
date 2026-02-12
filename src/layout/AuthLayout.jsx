import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../assets/logo.png";
// import bgVideo from "../assets/bg_video.mp4"; // Import your video

const AuthLayout = () => {
  return (
    <div className="w-full h-screen bg-dirty-white flex items-center relative overflow-hidden">
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover brightness-60"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <div className="flex flex-col items-center bg-white h-full w-180 shadow-[0_0_25px_rgba(165,165,165,0.65)] py-15 gap-10 relative z-10">
        <div className="flex flex-col justify-center items-center">
          <img src={Logo} className="w-full h-9" alt="Logo" />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
