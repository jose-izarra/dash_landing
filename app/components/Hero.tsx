"use client";
// import { Stars } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import styles from "@/styles/cursorAnimation.module.css"
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { gsap } from "gsap";

const COLORS_TOP = ["#9B0000", "#ff0000", ];

export const Hero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 5,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

    const backgroundImage = useMotionTemplate`radial-gradient(135% 135% at 40% 0%, #171717 50%, ${color})`;
    const border = useMotionTemplate`0.5px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 20px ${color}`;
    const backgroundColor = useMotionTemplate`${color}`


  // Cursor animation
  const cursorRef = useRef(null);

  const mousePosition = useRef({ x: 0, y: 0 }); // Mouse position
  const targetPosition = useRef({ x: 0, y: 0 }); // Delayed position


  useEffect(() => {
      if (!cursorRef.current) return;

      const cursor = cursorRef.current;

      // Update mouse position on mousemove
      const handleMouseMove = (e: MouseEvent) => {
        mousePosition.current = { x: e.clientX, y: e.clientY };
      };

      // Add mousemove event listener
      window.addEventListener("mousemove", handleMouseMove);

      // Animation loop for delayed movement
      const animateLoop = () => {
        // Interpolate the target position towards the mouse position
        const dx = mousePosition.current.x - targetPosition.current.x;
        const dy = mousePosition.current.y - targetPosition.current.y;

        targetPosition.current.x += dx * 0.1; // Adjust the delay factor
        targetPosition.current.y += dy * 0.1;

        // Update cursor position directly
        gsap.to(cursor, {
          x: targetPosition.current.x,
          y: targetPosition.current.y,
          duration: 0.05,
          ease: "power3.out",
        });

        // Request the next frame
        requestAnimationFrame(animateLoop);
      };

      animateLoop(); // Start the animation loop

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
  }, [])
  return (
    <>

    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
          Beta Now Live!
        </span>
        <h1
            className="max-w-3xl bg-gradient-to-br from-primary to-primary
            bg-clip-text text-center text-3xl font-black leading-tight
            text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight "
            style={{
                // textShadow: `0 0 60px var(--primary), 0 0 80px var(--primary)`
            }}
            >
          {/* Decrease your SaaS churn by over 90% */}
          DASH
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, et,
          distinctio eum impedit nihil ipsum modi.
        </p>
        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
        >
          Start free trial
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>

      <div className="absolute inset-0 z-0">
        {/* <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas> */}
      </div>
    </motion.section>
    <motion.div
        ref={cursorRef}
        className={`size-6 ${styles.cursor}`}
        style={{
            boxShadow,
            backgroundColor
        }}
        ></motion.div>
    </>

  );
};
