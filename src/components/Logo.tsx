import React from 'react';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  textColor?: string;
  subTextColor?: string;
  iconOnly?: boolean;
}

export function Logo({
  textColor,
  subTextColor,
  iconOnly = false,
  className = "",
  ...props
}: LogoProps) {
  // If we only need the icon, we can render the SVG icon part for now, 
  // since the PNG contains the full logo with text.
  if (iconOnly) {
    return (
      <img
        src="/images/cropped_circle_image.png"
        alt="Nucleos Icon"
        className={`object-contain ${className}`}
        {...props}
      />
    );
  }

  // Full logo using the provided image
  return (
    <img
      src="/images/nucleos blan bg logo.png"
      alt="Nucleos Biotech Logo"
      className={`object-contain ${className}`}
      {...props}
    />
  );
}
