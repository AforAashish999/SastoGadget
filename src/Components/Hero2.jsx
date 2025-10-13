import React from "react";
import { heroImage1 } from "../assets/images";
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {staggerChildren: 0.8,}}
};
const topVariants = {
  hidden: { opacity: 0, y: -60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const bottomVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
// const controls = useAnimation();

export default function Hero2({controls}) {
  return (
    <div className="h-[400px] bg-[#F3F8FC] flex justify-end items-center pr-80 relative ">
      <div className="size-80 rounded-full  bg-white "></div>

      <motion.img
        className="absolute size-96 right-30"
        src={heroImage1}
        alt="mobile" />

      <motion.div
        className="absolute left-53 top-16  flex flex-col gap-20"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div>
          <motion.h1
            className="text-4xl font-bold pb-2 text-black bg-gray shadow-xl/30 tracking-widest mb-2"
            variants={topVariants} > {" "}
            The charge you need{" "}
          </motion.h1>

          <motion.h1
            className="text-4xl font-bold pb-2 bg-gray shadow-xl/30  text-black tracking-widest w-fit ml-2 "
            variants={topVariants}  >{" "}
            when you need it.{" "}
          </motion.h1>
        </div>

        <motion.button
          className="bg-black p-2 w-33 font-bold text-white text-xl ml-6 cursor-pointer hover:bg-gray-200 hover:text-black bg-gray shadow-xl/30 "
          variants={bottomVariants} >
          Shop Now
        </motion.button>
      </motion.div>
    </div>
  );
}

















































// import React from "react";
// import { heroImage1 } from "../assets/images";
// import { motion } from "framer-motion";
// import { useAnimation } from "framer-motion";
// import { useEffect } from "react";

// /*        h1 initial={{ opacity: 0, y: -60 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut",  }}
//           viewport={{ once: true }}>

//          h1  initial={{ opacity: 0, y: -60 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
//           viewport={{ once: true }}>                          |
//                                                               |  
//           i used to do like this manually changing the delay in all elements, but when i have many eleements it is not effectual so, we use
//           stagger children
//           */
// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.8, //delay between children
//       // duration: 0.8, // ❌ this DOES NOT control children’s duration
//       // ease: "easeOut", // ❌ this DOES NOT control children’s easing
//       //  i used to think why do separate duration and ease, can't i do in container variants, but staggerChildren only adds
//       //  a delay between children and nth more, childrens own duration and ease property will be use
//     },
//   },
// };

// //h1 tag animation
// const topVariants = {
//   hidden: { opacity: 0, y: -60 }, //opacity:0 become invisible and fall from height y: -60 which is from top
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   //opacity:1, becomes visible and y:0 => come to its original place
//   //  duration=> for how much it runs, ease: transition styles other like, linear, easeIn, easeOut, easeInOut
//   /* this is just like when i was doing basic but little improvised
//   h1  initial={{ opacity: 0, y: -60 }}
//        whileInView={{ opacity: 1, y: 0 }}
//        transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
//        viewport={{ once: true }}>  */
// };

// //button variants => i have to make it diff as it is coming from below y: 60
// const bottomVariants = {
//   hidden: { opacity: 0, y: 60 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
// };

// export default function Hero2() {
//   const controls = useAnimation();
//   useEffect(() => {
//     async function sequence() {
//       while (true) {
//         await controls.start("visible");
//         await new Promise((res) => setTimeout(res, 1000));
//         controls.set("hidden");
//       }
//     }
//     sequence();
//   }, [controls]);

//   return (
//     <div className="h-[400px] bg-[#F3F8FC] flex justify-end items-center pr-80 relative ">
//       <div className="size-80 rounded-full  bg-white "></div>

//       <motion.img
//         className="absolute size-96 right-30"
//         src={heroImage1}
//         alt="mobile" />

//       <motion.div
//         className="absolute left-53 top-16  flex flex-col gap-20"
//         variants={containerVariants}
//         initial="hidden"
//         animate={controls}
//       >
//         <div>

//           <motion.h1
//             className="text-4xl font-bold pb-2 text-black bg-gray shadow-xl/30 tracking-widest mb-2"
//             variants={topVariants} >
//             {" "}
//             The charge you need{" "}
//           </motion.h1>

//           <motion.h1
//             className="text-4xl font-bold pb-2 bg-gray shadow-xl/30  text-black tracking-widest w-fit ml-2 "
//             variants={topVariants}  >
//             {" "}
//             when you need it.{" "}
//           </motion.h1>
//         </div>

//         <motion.button
//           className="bg-black p-2 w-33 font-bold text-white text-xl ml-6 cursor-pointer hover:bg-gray-200 hover:text-black bg-gray shadow-xl/30 "
//           variants={bottomVariants}
//         >
//           Shop Now
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }
























/* 
Step 1 — What is useAnimation()?

👉 It’s a Framer Motion hook that gives you manual control over animations.
Normally, we do this:

<motion.div initial="hidden" animate="visible" variants={...}>


So Framer Motion controls the animation automatically — first hidden → then visible.

But with useAnimation(), you become the controller.

Example:

const controls = useAnimation(); // 🧠 gives you remote control over animation

<motion.div
  variants={myVariants}
  animate={controls} // 👈 Instead of "visible", we now connect our remote control
/>


Now you can say:

controls.start("visible") // run the animation
controls.start("hidden")  // reverse or hide it again


That’s why it’s called “controls” — it’s like holding a remote for the element’s animation state.

⚙️ Step 2 — What happens in your useEffect()

Here’s the code:

useEffect(() => {
  async function sequence() {
    while (true) {
      await controls.start("visible"); // play animation (stagger)
      await new Promise(res => setTimeout(res, 1000)); // wait
      controls.set("hidden"); // reset instantly
    }
  }
  sequence();
}, [controls]);


Let’s go through this line by line:


*/