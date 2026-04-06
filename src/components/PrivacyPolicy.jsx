import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden bg-base-100">
      <div className="relative h-screen flex items-center justify-center overflow-hidden ">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Background gradient animation */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] w-[80%] h-[80%] bg-primary rounded-full filter blur-[160px] opacity-5 animate-blob"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 xl:mx-44 max-w-5xl mx-auto ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
              <span className="text-primary">
                Privacy Policy
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-base-content/70 mt-6 max-w-3xl mx-auto">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              <br />
              Read Carefully.
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <p className="text-base-content/70 mb-2">Scroll to read</p>
            <div className="w-8 h-12 rounded-full border-2 border-base-content/30 flex justify-center">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
                className="w-2 h-2 bg-primary rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mx-4 p-8 text-base-content lg:mx-24 xl:mx-44">
        <section className="mb-6">
          <h2 className="text-xl font-semibold">1. INTRODUCTION</h2>
          <p className="text-white mt-2">
            This Privacy Policy is provided by <strong>Codeket Ltd</strong>{" "}
            (“Codeket”, “we”, “our”, or “us”), a company registered in Nigeria.
            Codeket respects your privacy and is committed to protecting your
            personal data.
          </p>
          <p className="text-white mt-2">
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you interact with our services,
            including our website, software solutions, SaaS products, cloud
            services, and AI-powered applications.
          </p>
          <p className="text-white mt-2">
            By accessing or using our Services, you acknowledge that you have
            read and understood this Privacy Policy. If you do not agree with
            our policies and practices, please do not use our Services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">2. INFORMATION WE COLLECT</h2>

          <h3 className="text-lg font-medium mt-4">2.1 Personal Data</h3>
          <p className="text-white mt-2">
            We collect several types of information from and about users of our
            Services, including:
          </p>
          <ul className="list-disc pl-6 mt-2 text-white">
            <li>
              <strong>Identification Information:</strong> Name, email, phone,
              job title, and company details.
            </li>
            <li>
              <strong>Account Information:</strong> Login credentials, account
              preferences, and subscription details.
            </li>
            <li>
              <strong>Financial Information:</strong> Payment details and
              transaction history.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, device
              information, and location data.
            </li>
            <li>
              <strong>Usage Data:</strong> Information on how you interact with
              our Services.
            </li>
          </ul>

          <h3 className="text-lg font-medium mt-4">
            2.2 AI-Generated and Processed Data
          </h3>
          <p className="text-white mt-2">
            Our AI-powered applications may collect and process additional data,
            including:
          </p>
          <ul className="list-disc pl-6 mt-2 text-white">
            <li>Input data provided to our AI systems</li>
            <li>Output data generated by our AI systems</li>
            <li>
              Training data used to improve AI systems (in anonymized form)
            </li>
            <li>Performance metrics of AI features</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">
            3. HOW WE COLLECT YOUR INFORMATION
          </h2>
          <p className="text-white mt-2">We collect information through:</p>
          <ul className="list-disc pl-6 mt-2 text-white">
            <li>
              <strong>Direct Interactions:</strong> When you sign up, request
              support, or communicate with us.
            </li>
            <li>
              <strong>Automated Technologies:</strong> We collect technical and
              usage data via cookies and analytics tools.
            </li>
            <li>
              <strong>Third Parties:</strong> We may receive data from partners,
              service providers, or public sources.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">
            4. LEGAL BASIS FOR PROCESSING PERSONAL DATA
          </h2>
          <p className="text-white mt-2">
            We process your personal data based on the following legal grounds:
          </p>
          <ul className="list-disc pl-6 mt-2 text-white">
            <li>
              <strong>Contract Performance:</strong> Necessary to fulfill our
              contractual obligations to you.
            </li>
            <li>
              <strong>Legitimate Interests:</strong> For our business needs,
              except where overridden by your rights.
            </li>
            <li>
              <strong>Legal Obligation:</strong> To comply with legal and
              regulatory requirements.
            </li>
            <li>
              <strong>Consent:</strong> When you provide explicit consent for
              specific data uses.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">
            5. HOW WE USE YOUR INFORMATION
          </h2>
          <p className="text-white mt-2">We use your information to:</p>
          <ul className="list-disc pl-6 mt-2 text-white">
            <li>Provide and improve our Services</li>
            <li>Manage accounts and process transactions</li>
            <li>Enhance user experience and personalize interactions</li>
            <li>Develop new features and services</li>
            <li>Communicate updates, security alerts, and support messages</li>
            <li>Conduct marketing (subject to your preferences)</li>
            <li>Analyze data to improve our AI-driven solutions</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">
            6. DISCLOSURE OF YOUR INFORMATION
          </h2>
          <p className="text-white mt-2">We may share your data with:</p>
          <ul className="list-disc pl-6 mt-2 text-white">
            <li>
              <strong>Service Providers:</strong> Third-party vendors assisting
              in payment, analytics, hosting, and support.
            </li>
            <li>
              <strong>Business Partners:</strong> Companies collaborating on
              joint services or integrations.
            </li>
            <li>
              <strong>Affiliates:</strong> Our subsidiaries and related
              companies.
            </li>
            <li>
              <strong>Legal Obligations:</strong> When required by law, court
              order, or government request.
            </li>
            <li>
              <strong>Business Transfers:</strong> During mergers, acquisitions,
              or restructuring.
            </li>
            <li>
              <strong>With Your Consent:</strong> When you authorize specific
              disclosures.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">7. DATA SECURITY</h2>
          <p className="text-white mt-2">
            We use encryption, access controls, and security protocols to
            protect your personal data. While we strive for security, no system
            is completely foolproof. If you suspect a security issue, contact us
            immediately.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">8. DATA RETENTION</h2>
          <p className="text-white mt-2">
            We retain personal data only as long as necessary for legal,
            regulatory, and operational purposes. In some cases, we may
            anonymize data for further use.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">
            9. YOUR DATA PROTECTION RIGHTS
          </h2>
          <p className="text-white mt-2">You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 text-white">
            <li>Access your data</li>
            <li>Request corrections</li>
            <li>Request deletion (in some cases)</li>
            <li>Restrict processing</li>
            <li>Object to data use</li>
            <li>Withdraw consent</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold">10. CONTACT US</h2>
          <p className="text-white mt-2">
            If you have any questions about this privacy policy, please contact
            us at:
          </p>
          <ul className="list-disc pl-6 mt-2 text-white">
            <li>Email: legal@codeket.com</li>
            <li>Address: No. 46, Hassan Usman Rd. Katsina, Nigeria. 820101.</li>
            <li>Phone: +234 9068 149 540</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
