// import React, { useState, useEffect } from 'react';
// import { useAnimation } from 'framer-motion';
// import Hero1 from './Hero1';
// import Hero2 from './Hero2';

// export default function HeroSection() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const controls1 = useAnimation();
//   const controls2 = useAnimation();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide(prev => (prev === 0 ? 1 : 0));
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (currentSlide === 0) {
//       controls1.start('visible');
//       controls2.start('hidden');
//     } else {
//       controls1.start('hidden');
//       controls2.start('visible');
//     }
//   }, [currentSlide, controls1, controls2]);

//   return (
//     <div>
//       {currentSlide === 0 && <Hero1 controls={controls1} />}
//       {currentSlide === 1 && <Hero2 controls={controls2} />}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useAnimation } from "framer-motion";
import Hero1 from "./Hero1";
import Hero2 from "./Hero2";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const controls1 = useAnimation();
  const controls2 = useAnimation();

  const slides = [<Hero1 controls={controls1} />, <Hero2 controls={controls2} />];

  // auto-slide every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // control animation visibility
  useEffect(() => {
    if (currentSlide === 0) {
      controls1.start("visible");
      controls2.start("hidden");
    } else {
      controls1.start("hidden");
      controls2.start("visible");
    }
  }, [currentSlide]);

  // manual navigation (for arrows)
  const handlePrev = () => setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  const handleNext = () => setCurrentSlide((prev) => (prev === 0 ? 1 : 0));

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {slides[currentSlide]}

      {/* arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-black p-2 rounded-full"
      >
        <FaArrowCircleLeft size={28} /> 
      </button>

      <button
        onClick={handleNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-black p-2 rounded-full"
      >
        <FaArrowCircleRight size={28} />
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {[0, 1].map((index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index ? "bg-black scale-125" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
