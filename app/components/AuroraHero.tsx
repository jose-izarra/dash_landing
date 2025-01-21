"use client";

import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "@/styles/cursorAnimation.module.css"



export default function AuroraHero() {
    // Color animation
    const COLORS = ["#9B0000", "#F6FDF3", "#54BAC1", "#F3212"]
    const color = useMotionValue(COLORS[0])

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020616 50%, ${color})`

    useEffect(() => {
        animate(color, COLORS, {
            ease: 'easeInOut',
            duration: 12,
            repeat: Infinity,
            repeatType: 'mirror'
        })
    }, [])


    // Cursor animation
    const cursorRef = useRef(null);
    const boxShadow = useMotionTemplate`0 0 4px 4px ${color}`
    const backgroundColor = useMotionTemplate`${color}`

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
                    backgroundImage
                }}
                className="relative grid min-h-screen place-content-center
                overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
                ></motion.section>
            <motion.div
                ref={cursorRef}
                className={`size-6 ${styles.cursor}`}
                style={{
                    boxShadow,
                    backgroundColor
                }}
                ></motion.div>
        </>
    )
}
