// ============================================================
// FX - ÍCONE DE ESTILO DE TEXTO
// ============================================================

type TextStyleIconProps = Readonly<{
  className?: string;
}>;

export function TextStyleIcon({
  className = "h-4 w-4",
}: TextStyleIconProps) {
  return (
    <svg
      fill="none"
      viewBox="-4 -4 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        d="M11 1v1.5H6.25V15h-1.5V2.5H0V1zm1 12V8h-2V6.5h2V4h1.5v2.5H16V8h-2.5v5a.5.5 0 0 0 .5.5h2V15h-2a2 2 0 0 1-2-2"
      />
    </svg>
  );
}