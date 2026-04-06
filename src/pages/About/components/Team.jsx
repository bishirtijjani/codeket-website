import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { teamMembers } from "../../../utils/teamMembers";

const Team = () => {
  return (
    <div className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet the Team</h2>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            Our passionate team of experts combines technical expertise with
            creative problem-solving to deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-base-100 rounded-xl overflow-hidden border border-base-300 hover:shadow-md hover:border-primary/40 transition-all duration-300"
            >
              <div className="relative group">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-primary mt-1">{member.role}</p>
                <p className="text-base-content/80 mt-4">{member.bio}</p>
                <div className="flex space-x-4 mt-6">
                  {member.social.linkedin && (
                    <a
                      target="_blank"
                      href={member.social.linkedin}
                      className="text-base-content/70 hover:text-primary transition-colors"
                    >
                      <FaLinkedin className="w-6 h-6" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      target="_blank"
                      href={member.social.twitter}
                      className="text-base-content/70 hover:text-primary-focus transition-colors"
                    >
                      <FaTwitter className="w-6 h-6" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      target="_blank"
                      href={member.social.github}
                      className="text-base-content/70 hover:text-base-content/80 transition-colors"
                    >
                      <FaGithub className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            target="_blank"
            href="/careers"
            className="btn btn-lg bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-accent transition-all duration-300"
          >
            Join Our Team
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
