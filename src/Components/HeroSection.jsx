import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useAnimation } from "framer-motion";

import Hero1 from './Hero1';
import Hero2 from './Hero2';

export default function HeroSection() {
  const hero1Controls = useAnimation();
  const hero2Controls = useAnimation();
  const swiperRef = useRef(null);

  const slides = [
    { id: 1, component: <Hero1 controls={hero1Controls} /> },
    { id: 2, component: <Hero2 controls={hero2Controls} /> }
  ];

  const ANIMATION_DELAY = 1500; // ms — wait for animation to finish
  const AUTOPLAY_DELAY = 1000; // extra pause before next slide

  const playNextSlide = async () => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;
    const currentIndex = swiper.realIndex;

    // Animate current slide
    if (currentIndex === 0) {
      await hero1Controls.start("visible");
      hero2Controls.set("hidden");
    } else {
      await hero2Controls.start("visible");
      hero1Controls.set("hidden");
    }

    // Wait for a bit after animation
    setTimeout(() => {
      swiper.slideNext();
    }, AUTOPLAY_DELAY);
  };

  useEffect(() => {
    if (!swiperRef.current) return;

    const interval = setInterval(() => {
      playNextSlide();
    }, ANIMATION_DELAY + AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, EffectFade]}
      navigation
      pagination={{ clickable: true }}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop={true}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
        playNextSlide(); // animate first slide immediately
      }}
      onSlideChange={(swiper) => {
        // optional: re-animate manually if user clicks arrows/dots
        playNextSlide();
      }}
    >
      {slides.map(slide => (
        <SwiperSlide key={slide.id}>{slide.component}</SwiperSlide>
      ))}
    </Swiper>
  );
}



/*className="
    [&_.swiper-button-prev]:!bg-white [&_.swiper-button-prev]:!rounded-full [&_.swiper-button-prev]:!text-black [&_.swiper-button-prev]:!p-3 
    [&_.swiper-button-prev:hover]:!bg-[#FA4F26] [&_.swiper-button-prev:hover]:!text-white
    [&_.swiper-button-next]:!bg-white [&_.swiper-button-next]:!rounded-full  [&_.swiper-button-next]:!text-black [&_.swiper-button-next]:!p-3 
    [&_.swiper-button-next:hover]:!bg-[#FA4F26] [&_.swiper-button-next:hover]:!text-white
    // pagination dots
    [&_.swiper-pagination-bullet]:!bg-gray-500 [&_.swiper-pagination-bullet-active]:!bg-[#FA4F26]"
    >

// import React from 'react'

// import { Swiper, SwiperSlide } from "swiper/react";
// // Swiper is the main container component (the carousel itself).
// // SwiperSlide is a wrapper for each slide. You put your slide content inside SwiperSlide.

// import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
// /*These are modules you enable to add functionality:
// Navigation → left/right arrow controls.
// Pagination → dots/indicators.
// Autoplay → automatic slide rotation.
// EffectFade → fade transition between slides instead of sliding horizontally. */

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";
// //Swiper ships with its own CSS. These imports add the default styles for core,
// //navigation arrows, pagination dots, and the fade effect. If you skip them the layout/controls will look broken.

// //hero slides
// import Hero1 from './Hero1'
// import Hero2 from './Hero2'

// //react icons if i dont want to give styling to navigation buttons
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { MdKeyboardArrowRight } from "react-icons/md";


// //do this if u have many slides
// export default function HeroSection() {
//   const slides = [
//     {id:1, component:<Hero1 />},
//     {id:2, component:<Hero2 />}
//   ]
//   return (
//     <div>

// {/* side arrow buttons - CUSTOM BUILT */}
//     {/* <div className='custom-prev absolute top-2/3 left-0 z-20 bg-white rounded-full hover:bg-[#FA4F26] cursor-pointer hover:text-white shadow-xl/30'>
//     <MdKeyboardArrowLeft  className='size-10' />
//     </div>
//      <div className='custom-next absolute top-2/3 right-0 z-20 bg-white rounded-full hover:bg-[#FA4F26] cursor-pointer hover:text-white shadow-xl/30'>
//     <MdKeyboardArrowRight  className='size-10' />
//     </div> */}

//     <Swiper
//     modules={[Navigation, Pagination, Autoplay, EffectFade]} 
// //Here we tell Swiper which modules to enable. Without this line, navigation/pagination/autoplay/effect won’t work.
   
//   navigation simple
//   //but with react icons we do like below
//   // navigation= {{
//   //   prevEl:".custom-prev",
//   //   nextEl:".custom-next"
//   // }}
//   //Enables navigation arrows. Swiper will render default arrows (you can style or replace them later).

//     pagination={{clickable:true}}
//     //Enables pagination dots. clickable: true means clicking a dot jumps to that slide.

//     effect="fade"
//     fadeEffect={{crossFade:true}}
//     //effect="fade" uses the fade transition instead of the default slide transition.
//     // fadeEffect.crossFade = true gives a smoother overlap fade.

//     autoplay={{delay:4000 ,disableOnInteraction: false, pauseOnMouseEnter:false}}
//    /* delay: 10000 → 5000 ms (5 seconds) between auto slides 
//     disableOnInteraction: false → user interactions (click/drag) won’t stop autoplay permanently. It keeps auto-rotating after manual interaction.
//     pauseOnMouseEnter: true -> to pause on hover in newer Swiper builds. */
    

//     loop={true}

//     // styling arrow buttons
//     className="
//     [&_.swiper-button-prev]:!bg-white [&_.swiper-button-prev]:!rounded-full [&_.swiper-button-prev]:!text-black [&_.swiper-button-prev]:!p-3 
//     [&_.swiper-button-prev:hover]:!bg-[#FA4F26] [&_.swiper-button-prev:hover]:!text-white

//     [&_.swiper-button-next]:!bg-white [&_.swiper-button-next]:!rounded-full  [&_.swiper-button-next]:!text-black [&_.swiper-button-next]:!p-3 
//     [&_.swiper-button-next:hover]:!bg-[#FA4F26] [&_.swiper-button-next:hover]:!text-white

//     // pagination dots
//     [&_.swiper-pagination-bullet]:!bg-gray-500 [&_.swiper-pagination-bullet-active]:!bg-[#FA4F26]"
//     >
// {/* we can do this simply but when we have many we can use, .map */}
// {/* <SwiperSlide> <Hero1 /> </SwiperSlide>
// <SwiperSlide> <Hero2 /> </SwiperSlide> */}

// {/* USING .MAP */}
// {
//   slides.map( (slide)=> (
//     <SwiperSlide key={slide.id}> {slide.component} </SwiperSlide>
//   ))
// }
// {/* We map over the slides array and put each component inside a SwiperSlide. */}
//     </Swiper>
      
//     </div>
//   )
// }


