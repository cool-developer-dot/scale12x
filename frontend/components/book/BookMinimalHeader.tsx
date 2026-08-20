import BrandLogo from "@/components/brand/BrandLogo";

export default function BookMinimalHeader() {
  return (
    <header className="book-header">
      <div className="book-header__inner">
        <BrandLogo priority />
      </div>
    </header>
  );
}
