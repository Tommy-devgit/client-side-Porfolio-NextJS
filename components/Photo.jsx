"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="relative w-full flex justify-center items-center">
      {/* shared wrapper */}
      <div className="relative w-[300px] h-[300px] xl:w-[506px] xl:h-[506px]">
        
        {/* image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.4, duration: 0.4, ease: "easeInOut" },
          }}
          className="
            absolute inset-1
            rounded-full
            overflow-hidden
            mix-blend-lighten
            z-10
          "
        >
          <Image
            src="/assets/photo3.png"
            alt="Photo"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        {/* ring */}
        <motion.svg
          className="absolute inset-0 z-0"
          viewBox="0 0 506 506"
          fill="transparent"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="#0087e1"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: [
                "15 120 25 25",
                "16 25 92 72",
                "4 250 22 22",
              ],
              rotate: [120, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>

      </div>
    </div>
  );
};

export default Photo;
