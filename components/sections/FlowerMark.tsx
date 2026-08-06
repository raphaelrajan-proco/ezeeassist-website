import Image from "next/image";

/**
 * The EZee flower mark, for product-console headers.
 *
 * **Never a lettermark "E" tile.** That was an explicit instruction on
 * both the Coaches and Ticketing handoffs, and it applies anywhere a
 * mock console needs the brand: use this.
 *
 * Decorative by default. The console it sits in is already `aria-hidden`
 * or carries its own label.
 */
export default function FlowerMark({ size = 22 }: { size?: number }) {
  return (
    <Image
      src="/logos/ezee-flower-black.png"
      alt=""
      width={size}
      height={size}
      className="flex-none object-contain"
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
