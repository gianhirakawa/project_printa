/** CMYK color bar: C, M, Y, brand red. Header underline / footer topline. */
export default function CmykBar({ className = "" }: { className?: string }) {
  return (
    <div className={`cmyk-bar ${className}`.trim()} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
