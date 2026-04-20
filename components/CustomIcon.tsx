import Image from "next/image";

interface CustomIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

/**
 * Renders a Flaticon SVG as a sized, contained image.
 * Drop the SVG into /public/icons/ and point `src` at its path.
 *
 * TODO: Once Flaticon SVG files are in place, replace lucide-react icon
 * usages site-wide by swapping the icon container contents to:
 *   <CustomIcon src={icons.someKey} alt="…" size={24} />
 */
export function CustomIcon({ src, alt, size = 32, className = "" }: CustomIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
}

export default CustomIcon;
