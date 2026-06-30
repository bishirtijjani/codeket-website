import { useState } from "react";

const Gif = ({ gifSrc, staticSrc, alt = "GIF", className = "" }) => {
  const [src, setSrc] = useState(gifSrc);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onMouseEnter={() => setSrc(staticSrc)}
      onMouseLeave={() => setSrc(gifSrc)}
      style={{ cursor: "pointer", objectFit: "cover" }}
    />
  );
};

export default Gif;
