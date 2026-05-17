import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Legacy /consultation route, redirects to /contact.
// Client-side redirect avoids the StaticRouter "Navigate on initial render"
// warning during SSG. Direct visits will briefly render blank before the
// effect fires; in-app navigation goes through useNavigate instantly.
const Consultation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/contact", { replace: true });
  }, [navigate]);

  return null;
};

export default Consultation;
