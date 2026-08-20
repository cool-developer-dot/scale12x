import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  /** light = white mark for dark surfaces; dark = color mark for light surfaces */
  tone?: "light" | "dark";
};

/**
 * Scale12x stacked wordmark — sized for header at 2× baseline (~56px).
 */
export default function BrandLogo({
  className = "",
  priority = false,
  tone = "light",
}: BrandLogoProps) {
  const src =
    tone === "dark"
      ? "/brand/scale12x-logo.png"
      : "/brand/scale12x-logo-white.png";

  return (
    <Link
      href="/"
      className={`brand-logo inline-flex shrink-0 items-center ${className}`.trim()}
      aria-label="Scale12x home"
    >
      <Image
        src={src}
        alt="Scale12x"
        width={180}
        height={112}
        priority={priority}
        sizes="(max-width: 767px) 132px, (max-width: 1023px) 160px, 180px"
        className="brand-logo__img"
      />
    </Link>
  );
}
