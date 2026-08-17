"use client";

// ============================================================
// FX - TOOLTIP GENÉRICO
//
// Componente reutilizável para pequenas mensagens de ajuda
// associadas a botões, ícones e outros controles.
//
// Poderá ser utilizado futuramente em:
//
// - toolbar de comentários;
// - descrição;
// - chat;
// - botões de cartões;
// - menus;
// - ações do sistema.
//
// O tooltip é visualmente controlado pelo próprio sistema,
// evitando depender do atributo nativo "title" do navegador.
// ============================================================

import type {
  ReactNode,
} from "react";

// ============================================================
// TIPOS
// ============================================================

type TooltipPlacement =
  | "top"
  | "bottom";

type TooltipProps = Readonly<{
  content: string;
  children: ReactNode;
  placement?: TooltipPlacement;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function Tooltip({
  content,
  children,
  placement = "top",
}: TooltipProps) {
  const positionClass =
    placement === "top"
      ? "bottom-full mb-1.5"
      : "top-full mt-1.5";

  return (
    <span
      className="
        group/tooltip
        relative
        inline-flex
      "
    >
      {children}

      <span
        role="tooltip"
        className={`
          pointer-events-none
          absolute
          left-1/2
          z-[100]
          -translate-x-1/2
          whitespace-nowrap
          rounded-[3px]
          border
          border-[#d7d8da]
          bg-[#f4f5f7]
          px-1.5
          py-1
          text-[11px]
          font-normal
          leading-none
          text-[#172b4d]
          opacity-0
          shadow-sm
          transition-opacity
          duration-150
          group-hover/tooltip:opacity-100
          group-focus-within/tooltip:opacity-100

          ${positionClass}
        `}
      >
        {content}
      </span>
    </span>
  );
}