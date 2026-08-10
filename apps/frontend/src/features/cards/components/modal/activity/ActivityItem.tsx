"use client";

// ============================================================
// FX - ITEM DE ATIVIDADE DO CARTÃO
// ============================================================

import type { CardActivityData } from "../../../types/card-activity.types";

// ============================================================
// TIPOS
// ============================================================

type ActivityItemProps = Readonly<{
  atividade: CardActivityData;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function ActivityItem({
  atividade,
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3">
      {/* ======================================================
          AVATAR TEMPORÁRIO
      ====================================================== */}

      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[var(--primary)]
          text-[10px]
          font-semibold
          text-white
        "
      >
        {atividade.iniciais}
      </div>

      {/* ======================================================
          CONTEÚDO
      ====================================================== */}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-semibold">
            {atividade.usuario}
          </span>

          <span className="text-[10px] text-[var(--text-muted)]">
            {atividade.horario}
          </span>
        </div>

        <div
          className="
            mt-2
            whitespace-pre-wrap
            rounded-md
            bg-[var(--surface-secondary)]
            p-3
            text-[12px]
            leading-5
            text-[var(--text-secondary)]
          "
        >
          {atividade.texto}
        </div>
      </div>
    </div>
  );
}