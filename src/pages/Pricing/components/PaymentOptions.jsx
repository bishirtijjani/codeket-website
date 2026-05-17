import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaShieldAlt, FaCreditCard } from "react-icons/fa";

const PaymentOptions = () => {
  const paymentMethods = [
    {
      icon: <FaCreditCard className="text-3xl text-primary" />,
      title: "Credit Card",
      description: "Secure payments via Stripe",
     
    },
    {
      icon: <img src="./images/paypal.png" className="w-8 h-8 text-primary" />,
      title: "PayPal",
      description: "Fast and secure checkout",
      
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C351.7 381.7 368.3 381.7 380.5 369.5C392.7 357.3 392.7 340.7 380.5 328.5L266.5 214.5C263.5 211.5 259.1 209.9 256 209.9C252 209.9 248.5 211.5 245.5 214.5L131.5 328.5C119.3 340.7 119.3 357.3 131.5 369.5C143.7 381.7 160.3 381.7 172.5 369.5L242.4 292.5zM0 96C0 60.65 28.65 32 64 32H448C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H448C456.8 432 464 424.8 464 416V96C464 87.16 456.8 80 448 80H64C55.16 80 48 87.16 48 96z" />
        </svg>
      ),
      title: "Bank Transfer",
      description: "For enterprise customers",
      
    },
    
  ];

  return (
    <div className="py-24 px-6 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Flexible Payment Options
          </h2>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            Choose the payment method that works best for your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-base-100 rounded-xl p-8 border border-base-300 hover:border-primary transition-all duration-300"
            >
              <div className="mb-6 flex justify-center">{method.icon}</div>
              <h3 className="text-2xl font-bold text-center mb-3">
                {method.title}
              </h3>
              <p className="text-base-content/80 text-center mb-4">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 p-6 bg-base-100 rounded-xl border border-base-300 flex flex-col md:flex-row items-center justify-center"
        >
          <div className="flex items-center mb-6 md:mb-0">
            <div className="p-3 bg-primary/20 rounded-full mr-4">
              <FaShieldAlt className="text-2xl text-primary" />
            </div>
            <p className="w-full text-base-content/80 font-medium text-center" >
              All payments are securely processed and protected by
              industry-standard encryption.
            </p>
          </div>
          {/* <motion.a
            whileHover={{ scale: 1.05 }}
            href="/security"
            className="flex items-center text-primary hover:text-primary-focus transition-colors"
          >
            <span className="mr-2">Learn more about our security</span>
            <FaArrowRight />
          </motion.a> */}
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentOptions;
