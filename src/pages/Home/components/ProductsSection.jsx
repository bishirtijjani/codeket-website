import React, { useState, useEffect, useRef } from "react";
import {
  ChefHat,
  GraduationCap,
  Package,
  Camera,
  ArrowRight,
} from "lucide-react";
import { link } from "framer-motion/client";

export default function SoftwareSuiteShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const navigationRef = useRef(null);

  const suites = [
    {
      id: "restaurant",
      title: "Restaurant Management System",
      description:
        "Complete solution for managing your restaurant operations, from orders to inventory, staff scheduling to customer management.",
      icon: ChefHat,
      color: "#0F4C81",
      backgroundImage: "/images/restaurant-lady.jpg",
      link: "https://restaurant.codeket.com",
      features: [
        "POS Integration",
        "Inventory Control",
        "Staff Management",
        "Customer Analytics",
      ],
    },
    {
      id: "school",
      title: "School Management System",
      description:
        "Comprehensive platform for educational institutions to manage students, teachers, courses, grades, and administrative tasks.",
      icon: GraduationCap,
      color: "#1D4ED8",
      backgroundImage: "/images/school-admin.jpeg",
      link: "https://school.codeket.com",
      features: [
        "Student Records",
        "Grade Management",
        "Parent Portal",
        "Class Scheduling",
      ],
    },
    {
      id: "inventory",
      title: "Inventory Management System",
      description:
        "Smart inventory tracking and management system with real-time stock monitoring, automated alerts, and detailed reporting.",
      icon: Package,
      color: "#15803D",
      backgroundImage: "/images/inventory-cashier.jpeg",
      link: "https://inventory.codeket.com",
      features: [
        "Stock Tracking",
        "Automated Alerts",
        "Multi-location",
        "Detailed Reports",
      ],
    },
    {
      id: "tours",
      title: "Virtual Tours",
      tagline: "Professional Virtual Tour Creation",
      description:
        "Create stunning 360-degree virtual tours for real estate, businesses, and venues with interactive features and custom branding.",
      icon: Camera,
      color: "#6D28D9",
      backgroundImage: "/images/person-virtual-tour.jpeg",
      link: "https://virtualtours.codeket.com",
      features: [
        "360° Photography",
        "Interactive Elements",
        "Custom Branding",
        "Mobile Compatible",
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % suites.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll navigation to active item on mobile
  useEffect(() => {
    if (navigationRef.current) {
      const container = navigationRef.current;
      const activeCard = container.children[activeIndex];
      if (activeCard) {
        const containerRect = container.getBoundingClientRect();
        const cardRect = activeCard.getBoundingClientRect();
        const cardOffsetLeft = activeCard.offsetLeft;
        const cardWidth = activeCard.offsetWidth;
        const containerWidth = container.offsetWidth;
        const scrollLeft = container.scrollLeft;

        // Calculate the position to center the active card
        const targetScrollLeft =
          cardOffsetLeft - containerWidth / 2 + cardWidth / 2;

        // Smooth scroll to the target position
        container.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  const activeSuite = suites[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-20 overflow-hidden bg-base-100"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="badge badge-sm md:badge-lg bg-base-200/20 backdrop-blur-sm border-base-300/30 mb-4 md:mb-6">
            <span className="text-xs md:text-sm font-medium text-base-content">
              Our Software Suite
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6 text-base-content leading-tight">
            Our Products &amp;
            <br />
            <span
              className="transition-colors duration-1000"
              style={{ color: activeSuite.color }}
            >
              Solutions
            </span>
          </h2>

          <p className="text-base md:text-xl text-base-content/70 max-w-3xl mx-auto px-4">
            Our comprehensive software systems designed to streamline your
            business operations and boost productivity across different
            industries.
          </p>
        </div>

        {/* Mobile-first layout */}
        <div className="space-y-6 md:space-y-0">
          {/* Featured Suite Display */}
          <div className="w-full">
            <div
              className="card bg-black/30 backdrop-blur-xl border transition-all duration-700 p-6 md:p-10 relative overflow-hidden text-white min-h-[400px] md:min-h-[500px]"
              style={{
                borderColor: `${activeSuite.color}40`,
                boxShadow: `0 25px 50px -12px ${activeSuite.color}20`,
              }}
            >
              {/* Card Background Image */}
              <div className="absolute inset-0 transition-opacity duration-1000">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${activeSuite.backgroundImage})`,
                  }}
                />

                {/* Base dark overlay to improve text visibility */}
                <div className="absolute inset-0 bg-black/50 md:bg-black/40" />

                {/* Color overlay that matches suite color */}
                <div
                  className="absolute inset-0 transition-all duration-1000"
                  style={{
                    background: `linear-gradient(135deg, ${activeSuite.color}55 0%, transparent 100%)`,
                  }}
                />
              </div>

              {/* Content with relative positioning to appear above background */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6 md:mb-8">
                  <div className="flex items-center">
                    <div
                      className="p-3 md:p-5 rounded-xl md:rounded-2xl mr-4 md:mr-6 transition-colors duration-700"
                      style={{
                        backgroundColor: activeSuite.color,
                        boxShadow: `0 10px 25px -5px ${activeSuite.color}40`,
                      }}
                    >
                      <activeSuite.icon
                        size={24}
                        className="text-white md:w-10 md:h-10"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-3xl font-bold mb-2 leading-tight">
                        {activeSuite.title}
                      </h3>
                      <div
                        className="w-12 md:w-16 h-1 rounded-full transition-colors duration-700"
                        style={{ backgroundColor: activeSuite.color }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-sm md:text-lg leading-relaxed mb-6 md:mb-8 text-white/90">
                  {activeSuite.description}
                </p>

                {/* Features Grid - Mobile: 1 column, Desktop: 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
                  {activeSuite.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 md:p-4 bg-base-300/20 rounded-lg md:rounded-xl border border-base-300/20"
                    >
                      <div
                        className="w-2 h-2 md:w-3 md:h-3 rounded-full mr-3 md:mr-4 transition-colors duration-700 flex-shrink-0"
                        style={{ backgroundColor: activeSuite.color }}
                      />
                      <span className="font-medium text-sm md:text-base">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Visit Site Button */}
                <div className="flex justify-start">
                  <a
                    href={activeSuite.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: activeSuite.color,
                      boxShadow: `0 4px 15px -3px ${activeSuite.color}40`,
                    }}
                  >
                    Visit Site
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Suite Navigation - Mobile: Horizontal scroll, Desktop: Vertical stack */}
          <div className="md:hidden">
            <div
              ref={navigationRef}
              className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide"
            >
              {suites.map((suite, index) => {
                const IconComponent = suite.icon;
                const isActive = index === activeIndex;

                return (
                  <div
                    key={suite.id}
                    className={`cursor-pointer transition-all duration-300 flex-shrink-0 ${
                      isActive ? "" : "opacity-60 hover:opacity-100"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <a
                      href={suite.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card bg-base-200/40 backdrop-blur-xl border border-base-300/20 p-4 hover:bg-base-200/60 transition-all duration-300 min-w-[280px]"
                      onClick={(e) => e.preventDefault()}
                      style={{
                        borderColor: isActive ? `${suite.color}40` : "",
                        backgroundColor: isActive ? `${suite.color}10` : "",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="p-2 rounded-lg mr-3 border"
                            style={{
                              backgroundColor: isActive
                                ? suite.color
                                : `${suite.color}20`,
                              borderColor: `${suite.color}40`,
                            }}
                          >
                            <IconComponent
                              size={18}
                              className={isActive ? "text-white" : ""}
                              style={{
                                color: isActive ? "white" : suite.color,
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-base-content text-sm mb-1 leading-tight">
                              {suite.title}
                            </h4>
                          </div>
                        </div>

                        <ArrowRight
                          className="w-4 h-4 transition-all duration-300 flex-shrink-0"
                          style={{
                            color: suite.color,
                            opacity: isActive ? 1 : 0.5,
                            transform: isActive
                              ? "translateX(2px)"
                              : "translateX(0)",
                          }}
                        />
                      </div>

                      {/* Simple progress indicator */}
                      {isActive && (
                        <div className="mt-3 h-1 bg-base-300/50 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: suite.color,
                              width: "100%",
                              animation: "progress 5s linear infinite",
                            }}
                          />
                        </div>
                      )}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block md:absolute md:right-6 md:top-32 lg:static lg:mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {suites.map((suite, index) => {
                const IconComponent = suite.icon;
                const isActive = index === activeIndex;

                return (
                  <div
                    key={suite.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      isActive ? "" : "opacity-60 hover:opacity-100"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <a
                      href={suite.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card bg-base-200/40 backdrop-blur-xl border border-base-300/20 p-6 hover:bg-base-200/60 transition-all duration-300"
                      onClick={(e) => e.preventDefault()}
                      style={{
                        borderColor: isActive ? `${suite.color}40` : "",
                        backgroundColor: isActive ? `${suite.color}10` : "",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="p-3 rounded-xl mr-4 border"
                            style={{
                              backgroundColor: isActive
                                ? suite.color
                                : `${suite.color}20`,
                              borderColor: `${suite.color}40`,
                            }}
                          >
                            <IconComponent
                              size={20}
                              className={isActive ? "text-white" : ""}
                              style={{
                                color: isActive ? "white" : suite.color,
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-base-content text-sm mb-1">
                              {suite.title}
                            </h4>
                          </div>
                        </div>

                        <ArrowRight
                          className="w-5 h-5 transition-all duration-300"
                          style={{
                            color: suite.color,
                            opacity: isActive ? 1 : 0.5,
                            transform: isActive
                              ? "translateX(4px)"
                              : "translateX(0)",
                          }}
                        />
                      </div>

                      {/* Simple progress indicator */}
                      {isActive && (
                        <div className="mt-4 h-1 bg-base-300/50 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: suite.color,
                              width: "100%",
                              animation: "progress 5s linear infinite",
                            }}
                          />
                        </div>
                      )}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
