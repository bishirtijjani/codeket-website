import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import technologies from "../../../utils/technologies.jsx";

const HeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const particles = [];
    const numParticles = 100;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
          particles.push(
            new Particle(
              Math.random() * canvas.width,
              Math.random() * canvas.height
            )
          );
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    init();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-base-100 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-12">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-base-content mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="block text-primary ">Smart Software</span>
          <span className="block mt-4  text-info">for Growing Businesses</span>
        </motion.h1>

        <motion.p
          className="text-base-content/80 text-lg md:text-xl max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Codeket builds modern, intuitive tools that power real growth. From
          custom enterprise solutions to SaaS products, AI-driven apps, and
          automation systems, we deliver software that works fast, scales
          effortlessly, and stays easy to use.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link
            to="consultation"
            className="px-10 py-5 bg-gradient-to-r from-codeket-electricBlue to-accent text-white text-xl font-medium rounded-full shadow-lg hover:shadow-primary/40 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
          >
            <span>Get Started</span>
            <svg
              className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </Link>
        </motion.div>

        {/* Technology mini cards - simplified for this concept */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {technologies.slice(0, 5).map((tech, index) => (
            <motion.button
              key={index}
              className="bg-base-200/30 border border-base-content/10 backdrop-blur-sm rounded-full py-2 px-4 flex items-center space-x-2 text-base-content hover:bg-base-200/50 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg">{tech.icon}</span>
              <span className="text-sm">{tech.name}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
