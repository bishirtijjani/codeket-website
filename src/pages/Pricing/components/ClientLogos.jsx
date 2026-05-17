import { SiSalesforce } from "react-icons/si";
import { SiGoogle } from "react-icons/si";
import { SiOracle } from "react-icons/si";
import { SiAmazon } from "react-icons/si";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import { BsMeta } from "react-icons/bs";
import React from "react";
import { motion } from "framer-motion";

// Client Logos Section
const ClientLogos = () => {
  const clientLogos = [
    { name: "Microsoft", logo: <TfiMicrosoftAlt className="w-12 h-12" /> },
    { name: "Amazon", logo: <SiAmazon className="w-12 h-12" /> },
    { name: "Oracle", logo: <SiOracle className="w-12 h-12" /> },
    { name: "Google", logo: <SiGoogle className="w-12 h-12" /> },
    { name: "Salesforce", logo: <SiSalesforce className="w-12 h-12" /> },
    { name: "Meta", logo: <BsMeta className="w-12 h-12" /> },
  ];

  return (
    <div className="py-24 px-6 bg-base-200">
      <div className="max-w-6xl mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 "
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            Join thousands of companies that rely on Codeket for their
            technology needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2  items-center justify-center w-full md:grid-cols-3 lg:grid-cols-6 gap-8">
          {clientLogos.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-3 object-fill bg-base-100 rounded-xl border border-base-300 hover:border-primary transition-all duration-300"
            >
              {client.logo}
              <div>
                {client.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
