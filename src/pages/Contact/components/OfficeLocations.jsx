import React, { useState, useRef } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

const OfficeLocations = ({ locations }) => {
  const [activeLocation, setActiveLocation] = useState(0);
  const mapRef = useRef(null);

  return (
    <div id="locations" className="mb-32">
      <h2 className="text-4xl font-bold text-center mb-4">Our Offices</h2>
      <p className="text-xl text-base-content/80 text-center mb-16 max-w-3xl mx-auto">
        Visit us at one of our global offices. We'd love to meet you in person
        and discuss how we can work together.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {locations.map((location, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveLocation(index)}
            className={`p-6 rounded-xl text-left transition-all ${
              activeLocation === index
                ? "bg-primary text-white shadow-md"
                : "bg-base-200 border border-base-300 hover:bg-base-300"
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">{location.city}</h3>
            <p className="text-base-content/80">{location.address}</p>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-base-100 p-8 rounded-2xl border border-base-300 shadow-sm">
        <div className="relative h-80 lg:h-auto overflow-hidden rounded-xl">
          <img
            ref={mapRef}
            src={locations[activeLocation].image}
            alt={`${locations[activeLocation].city} Office`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-4 left-4 bg-primary/80 backdrop-blur-sm px-4 py-2 rounded-lg">
            <h3 className="font-bold text-lg">
              {locations[activeLocation].city}
            </h3>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-primary p-3 rounded-lg flex-shrink-0">
              <FaMapMarkerAlt className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Address</h3>
              <p className="text-base-content/80">
                {locations[activeLocation].address}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-accent p-3 rounded-lg flex-shrink-0">
              <FaPhoneAlt className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Phone</h3>
              <a
                href={`tel:${locations[activeLocation].phone}`}
                className="text-primary hover:text-primary-focus transition-colors"
              >
                {locations[activeLocation].phone}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-success p-3 rounded-lg flex-shrink-0">
              <FaEnvelope className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Email</h3>
              <a
                href={`mailto:${locations[activeLocation].email}`}
                className="text-primary hover:text-primary-focus transition-colors"
              >
                {locations[activeLocation].email}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-warning p-3 rounded-lg flex-shrink-0">
              <FaClock className="text-base-content text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Business Hours</h3>
              <p className="text-base-content/80">{locations[activeLocation].hours}</p>
            </div>
          </div>

          <div className="pt-4">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                locations[activeLocation].address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-base-100 text-primary font-semibold rounded-lg hover:bg-base-200 transition-colors shadow-lg"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeLocations;
