// ============================================================
// FX - ÍCONE DE ITÁLICO
// ============================================================

type ItalicIconProps = Readonly<{
  className?: string;
}>;

export function ItalicIcon({
  className = "h-4 w-4",
}: ItalicIconProps) {
  return (
    <svg
      viewBox="-4 -4 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6 1h6.5v1.5h-2.409l-2.64 11H10V15H3.5v-1.5h2.409l2.64-11H6z"
        clipRule="evenodd"
      />
    </svg>
  );
}