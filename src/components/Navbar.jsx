import React from "react";

import { Link } from "react-router-dom";

const navLinks = [
  { name: "Solutions", path: "/solutions" },
  { name: "Technology", path: "/technology" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "About", path: "/about" },
];
const Navbar = () => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-100 bg-opacity-20 backdrop-filter backdrop-blur-xl fixed top-0 z-50">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            {/* Logo */}
            <div className="border border-primary/30 px-5 py-2 rounded-lg">
              <h3 className="text-lg font-mono font-semibold text-base-content">
                <span className="text-primary">&lt;</span>
                <span className="text-base-content">code</span>
                <span className="text-primary">ket</span>
                <span className="text-primary">/&gt;</span>
              </h3>
            </div>
          </div>

        <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              {navLinks.map((item, i) => (
                <li key={i}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
              <li>
                <button className="btn btn-primary">Get Started</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          {navLinks.map((item, i) => (
            <li key={i}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
          <li>
            <button className="btn btn-primary">Get Started</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
