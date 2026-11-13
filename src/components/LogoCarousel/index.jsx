import React from 'react';

import './carousel.css';

export default function LogoCarousel({logos = []}) {
  if (!logos.length) {
    return null;
  }

  const track = [...logos, ...logos];

  return (
    <div className="logo-carousel">
      <div className="logo-carousel__track">
        {track.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt || ''}
            className="logo-carousel__logo"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
