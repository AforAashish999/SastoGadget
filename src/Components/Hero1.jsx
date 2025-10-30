import React from 'react'
import { hero2Earbud1, hero2Earbud2, hero2Earbud3 } from '../assets/images'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useAnimation } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {  transition: { staggerChildren: 0.5}}
}
const topVariants = {
  hidden: { opacity: 0, y: -60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}
const bottomVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
}
// const controls = useAnimation();

export default function Hero1({controls}) {
  return (
    <motion.div className='h-[400px] bg-[#F3F8FC] flex justify-end items-center pr-80 relative ' 
    variants={containerVariants} 
    initial= "hidden"
    animate= {controls}>

      <div className='size-80 rounded-full  bg-white '></div>

      {/* Image */}
      <motion.img className='absolute size-64 right-80' src={hero2Earbud1} alt="earbud" variants={bottomVariants} />
      <motion.img className='absolute size-52 right-35 top-40' src={hero2Earbud2} alt="earbud" variants={bottomVariants} />
      <motion.img className='absolute size-52 right-30 top-0' src={hero2Earbud3} alt="earbud" variants={bottomVariants} />

      {/* text */}
      <div className='absolute left-53 top-16  flex flex-col gap-10  '>
        <div>
          <motion.h1 className='text-4xl font-bold pb-1 text-black tracking-widest bg-gray shadow-xl/30  w-fit' variants={topVariants}>
            Your music </motion.h1>
          <motion.h1 className='text-4xl font-bold pb-1  text-black tracking-widest bg-gray shadow-xl/30 mt-5 w-fit' variants={topVariants}>
            Your moments  </motion.h1>
          <motion.h1 className='text-4xl font-bold pb-1 text-black tracking-widest bg-gray shadow-xl/30 mt-5 w-fit' variants={topVariants}>
            Your earbuds  </motion.h1>
        </div>

        <motion.button className='bg-black p-2 w-33 font-bold text-white text-xl ml-6 cursor-pointer 
        hover:bg-gray-200 hover:text-black duration-300 ease-in-out' variants={bottomVariants}>
          Shop Now</motion.button>
      </div>
    </motion.div>
  )
}

 

// import React from 'react'
// import { hero2Earbud1, hero2Earbud2, hero2Earbud3 } from '../assets/images'
// import { motion } from 'framer-motion'
// import { useEffect } from 'react'
// import { useAnimation } from 'framer-motion'

// //delay of whole children in systematic order
// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.5
//     }
//   }
// }
// const topVariants = {
//   hidden: { opacity: 0, y: -60 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
// }
// const bottomVariants = {
//   hidden: { opacity: 0, y: 60 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
// }

// export default function Hero1() {
//    const controls = useAnimation();
//     useEffect(() => {
//       async function sequence() {
//         while (true) {
//           await controls.start("visible");
//           await new Promise((res) => setTimeout(res, 1000));
//           controls.set("hidden");
//         }
//       }
//       sequence();
//     }, [controls]);
//   return (
//     <motion.div className='h-[400px] bg-[#F3F8FC] flex justify-end items-center pr-80 relative ' 
//     variants={containerVariants} 
//     initial= "hidden"
//     animate= {controls}
    
//     >

//       <div className='size-80 rounded-full  bg-white '></div>

//       {/* Image */}
//       <motion.img className='absolute size-64 right-80' src={hero2Earbud1} alt="earbud" variants={bottomVariants} />
//       <motion.img className='absolute size-52 right-35 top-40' src={hero2Earbud2} alt="earbud" variants={bottomVariants} />
//       <motion.img className='absolute size-52 right-30 top-0' src={hero2Earbud3} alt="earbud" variants={bottomVariants} />

//       {/* text */}
//       <div className='absolute left-53 top-16  flex flex-col gap-10  '>
//         <div>
//           <motion.h1 className='text-4xl font-bold pb-1 text-black tracking-widest bg-gray shadow-xl/30  w-fit' variants={topVariants}>
//             Your music </motion.h1>
//           <motion.h1 className='text-4xl font-bold pb-1  text-black tracking-widest bg-gray shadow-xl/30 mt-5 w-fit' variants={topVariants}>
//             Your moments  </motion.h1>
//           <motion.h1 className='text-4xl font-bold pb-1 text-black tracking-widest bg-gray shadow-xl/30 mt-5 w-fit' variants={topVariants}>
//             Your earbuds  </motion.h1>
//         </div>

//         <motion.button className='bg-black p-2 w-33 font-bold text-white text-xl ml-6 cursor-pointer 
//         hover:bg-gray-200 hover:text-black duration-300 ease-in-out' variants={bottomVariants}>
//           Shop Now</motion.button>
//       </div>
//     </motion.div>
//   )
// }

