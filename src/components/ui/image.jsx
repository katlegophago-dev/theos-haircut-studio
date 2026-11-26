import { forwardRef } from "react";

// The site's image interface backed entirely by independently hosted assets.
const Image = forwardRef(function Image(
  {
    fittingType = "cover",
    originWidth,
    originHeight,
    focalPointX,
    focalPointY,
    quality: _quality,
    style,
    alt = "",
    ...props
  },
  ref,
) {
  const focalPoint = typeof focalPointX === "number" && typeof focalPointY === "number"
    ? `${focalPointX}% ${focalPointY}%`
    : undefined;

  return (
    <img
      ref={ref}
      alt={alt}
      width={originWidth}
      height={originHeight}
      decoding="async"
      style={{
        objectFit: fittingType === "contain" || fittingType === "fit" ? "contain" : "cover",
        ...(focalPoint ? { objectPosition: focalPoint } : {}),
        ...style,
      }}
      {...props}
    />
  );
});

export { Image };
