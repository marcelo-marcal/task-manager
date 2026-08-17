// ============================================================
// FX - ÍCONE DE LISTA
// ============================================================

type ListIconProps = Readonly<{
  className?: string;
}>;

export function ListIcon({
  className = "h-4 w-4",
}: ListIconProps) {
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
        d="M.5 4.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M16 5H6V3.5h10zm0 7.5H6V11h10z"
        clipRule="evenodd"
      />
    </svg>
  );
}