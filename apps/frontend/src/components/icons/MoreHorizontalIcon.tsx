// ============================================================
// FX - ÍCONE DE MAIS OPÇÕES HORIZONTAIS
// ============================================================

type MoreHorizontalIconProps = Readonly<{
  className?: string;
}>;

export function MoreHorizontalIcon({
  className = "h-4 w-4",
}: MoreHorizontalIconProps) {
  return (
    <svg
      viewBox="-8 -8 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
        clipRule="evenodd"
      />
    </svg>
  );
}