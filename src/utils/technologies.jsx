import { FaBars, FaLock, FaPallet, FaStar, FaUserLock } from "react-icons/fa";
import { FaCloud, FaBuilding, FaBoxesStacked } from "react-icons/fa6";

const technologies = [
  {
    name: "AI & Machine Learning",
    icon: <FaStar />,
    color: "from-purple-500 to-indigo-600",
    description:
      "Integrating cutting-edge AI to automate processes and deliver predictive insights.",
  },
  {
    name: "Cloud Architecture",
    icon: <FaCloud />,
    color: "from-blue-500 to-cyan-600",
    description:
      "Scalable, resilient cloud infrastructure designed for global operations.",
  },
  {
    name: "Enterprise Solutions",
    icon: <FaBuilding />,
    color: "from-slate-500 to-slate-700",
    description:
      "Custom software that streamlines operations and drives business transformation.",
  },
  {
    name: "SaaS Development",
    icon: <FaBoxesStacked />,
    color: "from-green-500 to-emerald-600",
    description:
      "Subscription-based platforms with continuous delivery of new features.",
  },
  {
    name: "Exceptional UI/UX Design",
    icon: <FaPallet />,
    color: "from-pink-500 to-rose-600",
    description:
      "Beautiful, intuitive interfaces that enhance user experience and adoption.",
  },
  {
    name: "Security Protocol",
    icon: <FaUserLock />,
    color: "from-red-500 to-orange-600",
    description:
      "Enterprise-grade security implementation protecting sensitive data.",
  },
];

export default technologies;
