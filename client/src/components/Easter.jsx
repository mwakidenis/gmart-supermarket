import React from 'react';
import './Easter.css'; // Import CSS file for custom styling

function Easter() {
  return (
    <>
      {/* <div>
        <video autoPlay loop className="autoplay-video w-full h-full">
          <source src="/easter.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
      <div>
        {/*<img src="preload.jpg" alt="" srcset="" className='h-full'/>*/}
        <div className='text-[20vh] font-black text-red-400 duration-300 hover:text-blue-400 hover:duration-300'>
        This is an Easter egg
        </div> 
      </div>
    </>
  );
}

export default Easter;
