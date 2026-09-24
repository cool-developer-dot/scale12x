import Link from "next/link";
import { getImageProps } from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  /**
   * auto  = ink lockup on light schemes, cream lockup on dark schemes.
   * cream = always the cream lockup (fixed dark plates).
   * ink   = always the ink lockup (fixed light surfaces).
   */
  tone?: "auto" | "cream" | "ink";
};

/** Horizontal lockup (symbol + wordmark) cropped to its artwork. */
const LOGO_WIDTH = 2075;
const LOGO_HEIGHT = 654;
const LOGO_SIZES = "(max-width: 767px) 160px, 200px";

/**
 * Scale 12x horizontal lockup, the default for website headers and footers.
 * Brand rule: minimum 140px wide in headers, 80px in footers. Never recolour or restyle.
 */
export default function BrandLogo({
  className = "",
  priority = false,
  tone = "auto",
}: BrandLogoProps) {
  const common = {
    alt: "Scale 12x",
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    sizes: LOGO_SIZES,
    priority,
  };
  const { props: ink } = getImageProps({
    ...common,
    src: "/brand/lockup-horizontal-ink.png",
  });
  const { props: cream } = getImageProps({
    ...common,
    src: "/brand/lockup-horizontal-cream.png",
  });

  return (
    <Link
      href="/"
      className={`brand-logo inline-flex shrink-0 items-center ${className}`.trim()}
      aria-label="Scale 12x, home"
    >
      {tone === "auto" ? (
        <picture>
          <source media="(prefers-color-scheme: dark)" srcSet={cream.srcSet} />
          <img {...ink} alt="Scale 12x" className="brand-logo__img" />
        </picture>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...(tone === "cream" ? cream : ink)}
          alt="Scale 12x"
          className="brand-logo__img"
        />
      )}
    </Link>
  );
}
