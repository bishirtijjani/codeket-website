import React from "react";
import { motion } from "framer-motion";

const CookiePolicy = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden bg-base-100">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Background gradient animation */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] w-[80%] h-[80%] bg-primary rounded-full filter blur-[160px] opacity-5 animate-blob"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 xl:mx-44 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
              <span className="text-primary">
                Cookie Policy
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
            <strong>Codeket Ltd</strong> ("Codeket," "we," "our," or "us") uses
            cookies and similar technologies on our website, software solutions,
            SaaS products, cloud services, and AI-powered applications. This
            Cookie Policy explains how we use these technologies, what types of
            cookies we use, and your rights to control our use of them.
          </p>
          <p className="text-white mt-2">
            By continuing to browse or use our Services, you agree to our use of
            cookies as described in this Cookie Policy. If you do not agree with
            our policies and practices, please adjust your browser settings
            accordingly or refrain from using our Services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">2. WHAT ARE COOKIES?</h2>
          <p className="text-white mt-2">
            Cookies are small text files that are placed on your device when you
            visit a website. They are widely used to make websites work more
            efficiently and provide information to website owners. Cookies can
            be "persistent" (remaining on your device until you delete them) or
            "session-based" (deleted when you close your browser).
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">3. TYPES OF COOKIES WE USE</h2>

          <h3 className="text-lg font-medium mt-4">3.1 Essential Cookies</h3>
          <p className="text-white mt-2">
            These cookies are necessary for the operation of our Services. They
            enable core functionality such as security, network management, and
            account access. You may disable these by changing your browser
            settings, but this may affect how the Services function.
          </p>

          <h3 className="text-lg font-medium mt-4">
            3.2 Performance and Analytics Cookies
          </h3>
          <p className="text-white mt-2">
            These cookies collect information about how visitors use our
            Services, such as which pages visitors go to most often and if they
            receive error messages. This data helps us improve our Services and
            user experience. All information collected is aggregated and
            anonymous.
          </p>

          <h3 className="text-lg font-medium mt-4">
            3.3 Functionality Cookies
          </h3>
          <p className="text-white mt-2">
            These cookies allow our Services to remember choices you make (such
            as your username, language, or region) and provide enhanced,
            personalized features. They may also be used to provide services you
            have requested.
          </p>

          <h3 className="text-lg font-medium mt-4">
            3.4 Targeting/Advertising Cookies
          </h3>
          <p className="text-white mt-2">
            These cookies are used to deliver content relevant to your
            interests. They may be used to deliver targeted advertising or to
            limit the number of times you see an advertisement. They also help
            measure the effectiveness of advertising campaigns.
          </p>

          <h3 className="text-lg font-medium mt-4">3.5 Third-Party Cookies</h3>
          <p className="text-white mt-2">
            Our Services may include cookies from third-party services such as
            analytics providers, advertising networks, and social media
            platforms. These third parties may use cookies, web beacons, and
            similar technologies to collect information about your use of our
            Services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">4. SPECIFIC COOKIES WE USE</h2>
          <p className="text-white mt-2">
            Below is a detailed list of the cookies we use on our Services:
          </p>
          <ul className="list-disc pl-6 mt-2 text-white">
            <li>
              <strong>Authentication Cookies:</strong> Used to authenticate
              users and prevent fraudulent use of accounts.
            </li>
            <li>
              <strong>Session State Cookies:</strong> Track user session and
              maintain state across pages.
            </li>
            <li>
              <strong>Google Analytics:</strong> Used to collect information
              about how visitors use our Services.
            </li>
            <li>
              <strong>Preference Cookies:</strong> Remember user preferences and
              settings.
            </li>
            <li>
              <strong>Intercom/Zendesk:</strong> For customer support
              functionalities.
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Used to track visitors across
              websites to display relevant advertisements.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">5. COOKIE MANAGEMENT</h2>
          <p className="text-white mt-2">
            You can control and manage cookies in various ways:
          </p>
          <ul className="list-disc pl-6 mt-2 text-white">
            <li>
              <strong>Browser Settings:</strong> Most web browsers allow you to
              manage your cookie preferences. You can set your browser to refuse
              cookies or delete certain cookies. Generally, you can also manage
              similar technologies in the same way that you manage cookies.
            </li>
            <li>
              <strong>Our Cookie Consent Tool:</strong> We provide a cookie
              preferences manager accessible from our website footer that allows
              you to selectively opt-out of non-essential cookies.
            </li>
            <li>
              <strong>Third-Party Opt-Out Tools:</strong> You can opt out of
              some third-party cookies through sites like the Network
              Advertising Initiative or the Digital Advertising Alliance.
            </li>
          </ul>
          <p className="text-white mt-2">
            Please note that if you choose to block certain cookies, you may not
            be able to use all the features of our Services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">6. DO NOT TRACK SIGNALS</h2>
          <p className="text-white mt-2">
            Some browsers have incorporated "Do Not Track" (DNT) features that
            can send a signal to the websites you visit indicating you do not
            wish to be tracked. Currently, there is no standard for how online
            services should respond to DNT signals. We currently do not respond
            to DNT signals, whether the mechanism is from a particular browser
            or from a third-party service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">7. COOKIES IN EMAILS</h2>
          <p className="text-white mt-2">
            Our emails may contain cookies that track whether you open our
            emails and whether you click any links within them. This helps us
            measure the effectiveness of our email campaigns and improve our
            communications with you. If you prefer not to have your activity
            tracked in this way, you can unsubscribe from our mailing list or
            disable images in emails.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">
            8. CHANGES TO THIS COOKIE POLICY
          </h2>
          <p className="text-white mt-2">
            We may update this Cookie Policy from time to time to reflect
            changes in technology, regulation, or our business practices. Any
            changes will be posted on this page with an updated revision date.
            We encourage you to periodically review this Cookie Policy to stay
            informed about our use of cookies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">9. CONTACT US</h2>
          <p className="text-white mt-2">
            If you have any questions about our use of cookies or this Cookie
            Policy, please contact us at:
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

export default CookiePolicy;
