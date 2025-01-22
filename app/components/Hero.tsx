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

  const handleClick = () => {

  }


  return (
    <>

    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
        >
      <div className="relative z-10 flex flex-col items-center">
        <h1
            className="max-w-3xl bg-gradient-to-br from-primary to-primary
            bg-clip-text text-center text-6xl font-black leading-tight
            text-transparent sm:text-6xl sm:leading-tight md:text-7xl md:leading-tight "
            style={{
                // textShadow: `0 0 60px var(--primary), 0 0 80px var(--primary)`
            }}
            >
          {/* Decrease your SaaS churn by over 90% */}
          DASH
        </h1>
        <p className="mt-6 mb-1 max-w-xl text-center text-xl leading-relaxed md:text-2xl md:leading-relaxed font-bold">
            ¡Revoluciona la gestión de tu local!
        </p>
        <p className="my-3 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed mb-8 font-light ">
            Aumenta tus ingresos con la plataforma más ágil del mercado:
        </p>

        <ul className="max-w-xl grid grid-cols-2 gap-5 items-center text-sm md:text-base w-full font-light text-foreground ">
            <li className="px-1 sm:px-8 py-3 bg-neutral-800/80 backdrop-blur rounded-3xl text-center h-24 flex items-center justify-center hover:bg-neutral-700/80 transition-colors duration-300">
                Estadísticas en tiempo real para tomar decisiones inteligentes.
            </li>
            <li className="px-1 sm:px-8 py-3  bg-neutral-800/80 backdrop-blur rounded-3xl text-center h-24 flex items-center justify-center hover:bg-neutral-700/80 transition-colors duration-300">
                Gestión eficiente de equipos de promoción y su desempeño.
            </li>
            <li className="px-1 sm:px-8 py-3  bg-neutral-800/80 backdrop-blur rounded-3xl text-center h-24 flex items-center justify-center hover:bg-neutral-700/80 transition-colors duration-300">
            Venta rápida de mesas, boletas y listas de invitados.
            </li>
            <li className="px-1 sm:px-8 py-3  bg-neutral-800/80 backdrop-blur rounded-3xl text-center h-24 flex items-center justify-center hover:bg-neutral-700/80 transition-colors duration-300">
            Control total de asistentes desde nuestra app móvil.
            </li>
        </ul>
        <a
            href="mailto:thehousegm@gmail.com?subject=Quiero mejorar la gestión de mi local con Dash!"
            className="cursor-none "
            >
            <motion.button
                onClick={handleClick}
                whileHover={{
                    scale: 1.015,
                }}
                whileTap={{
                    scale: 0.985,
                }}
                className="cursor-none group relative flex w-fit items-center gap-1.5 mt-14 rounded-full bg-gray-950/40 px-5 py-3 text-gray-50 transition-colors hover:bg-gray-950/60"
            >
            Contáctanos
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
            </motion.button>
        </a>
      </div>


        </motion.section>
        <motion.div
            ref={cursorRef}
            className={`size-6 ${styles.cursor} hidden sm:block`}
            style={{
                boxShadow,
                backgroundColor
            }}
            ></motion.div>
    </>

  );
};
