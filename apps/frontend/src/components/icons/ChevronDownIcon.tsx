// ============================================================
// FX - ÍCONE DE SETA PARA BAIXO
// ============================================================

type ChevronDownIconProps = Readonly<{
  className?: string;
}>;

export function ChevronDownIcon({
  className = "h-3 w-3",
}: ChevronDownIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        d="m14.53 6.03-6 6a.75.75 0 0 1-1.004.052l-.056-.052-6-6 1.06-1.06L8 10.44l5.47-5.47z"
      />
    </svg>
  );
}