const Sitemap = require("react-router-sitemap").default;

const paramsConfig = {
  "/": {},
  "/about": {},
  "/services": {},
  "/contact": {},
  "/pricing": {},
  "/case-studies": {},
  "/consultation": {},
  "/whatsapp-receptionist": {},
};

new Sitemap("https://codeket.com")
  .applyParams(paramsConfig)
  .build("public/sitemap.xml")
  .save("public/sitemap.xml");
