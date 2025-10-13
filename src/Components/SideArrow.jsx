import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Bulb from "../../assets/Image/Bulb.png";
import Fans from "../../assets/Image/Fans.png";

export default function SideArrow() {
  const images = [Bulb, Fans];
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[320px] sm:h-[400px] md:h-[430px] overflow-hidden">
      {/* Background Images with Fade Transition */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: url(${image}),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Text Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center text-white h-full px-4 sm:px-6 md:px-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-lg leading-snug">
          Welcome to Poudel Electric House ⚡
        </h1>
        <p className="max-w-sm sm:max-w-xl mx-auto text-sm sm:text-base md:text-lg drop-shadow-md px-2 sm:px-3">
          Find the best electrical equipment, tools, and accessories for your
          home and business — all in one place.
        </p>
        <button className="mt-4 sm:mt-6 bg-yellow-500 text-gray-900 font-semibold px-4 sm:px-6 py-2 rounded-lg hover:bg-yellow-400 transition">
          Shop Now
        </button>
      </div>

      {/* Left / Right Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-black/60 text-white p-1.5 sm:p-2.5 md:p-3 rounded-full z-30 transition-all duration-300"
      >
        <FaChevronLeft className="text-xs sm:text-base md:text-lg" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-black/60 text-white p-1.5 sm:p-2.5 md:p-3 rounded-full z-30 transition-all duration-300"
      >
        <FaChevronRight className="text-xs sm:text-base md:text-lg" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-30">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300 ${
              current === index ? "bg-yellow-400 scale-110" : "bg-white/60"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
}