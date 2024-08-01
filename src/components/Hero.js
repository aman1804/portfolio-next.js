import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen relative">
      <div className="flex flex-col justify-center items-center h-full px-4">
        <Image
          className="absolute inset-0 object-cover w-full h-full z-0"
          src="/path/to/your/hero-image.jpg" // Replace with your image path
          alt="Hero Image"
          layout="fill"
        />
        <div className="z-10 bg-gray-900 bg-opacity-50 p-8 text-center">
          <h1 className="text-3xl font-bold text-white">I'm Muhammad Aashir Khan</h1>
          <p className="text-gray-200 mt-4">Full Stack Developer</p>
          <div className="flex justify-center mt-8">
            <a href="https://github.com/your-github-username" className="text-white hover:text-gray-300 mx-4">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://stackoverflow.com/users/your-stackoverflow-id" className="text-white hover:text-gray-300 mx-4">
              <i className="fab fa-stack-overflow"></i>
            </a>
            <a href="https://www.linkedin.com/in/your-linkedin-profile/" className="text-white hover:text-gray-300 mx-4">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/your-instagram-username/" className="text-white hover:text-gray-300 mx-4">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
