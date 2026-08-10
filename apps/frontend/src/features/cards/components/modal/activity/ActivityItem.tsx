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
  onDeleteComment?: () => void;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function ActivityItem({
  atividade,
  onDeleteComment,
}: ActivityItemProps) {
  const ehComentario =
    atividade.tipo === "comment";

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
        {/* ====================================================
            IDENTIFICAÇÃO
        ==================================================== */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-x-2
            gap-y-1
          "
        >
          <span className="text-[12px] font-semibold">
            {atividade.usuario}
          </span>

          <span className="text-[10px] text-[var(--text-muted)]">
            {atividade.horario}
          </span>

          <span
            className={
              ehComentario
                ? `
                    rounded
                    bg-blue-500/10
                    px-1.5
                    py-0.5
                    text-[9px]
                    font-medium
                    text-blue-400
                  `
                : `
                    rounded
                    bg-[var(--surface-secondary)]
                    px-1.5
                    py-0.5
                    text-[9px]
                    font-medium
                    text-[var(--text-muted)]
                  `
            }
          >
            {ehComentario
              ? "Comentário"
              : "Atividade"}
          </span>
        </div>

        {/* ====================================================
            COMENTÁRIO
        ==================================================== */}

        {ehComentario ? (
          <div
            className="
              group
              relative
              mt-2
              rounded-md
              border
              border-[var(--border)]
              bg-[var(--surface-secondary)]
              p-3
              pr-16
            "
          >
            <p
              className="
                whitespace-pre-wrap
                text-[12px]
                leading-5
                text-[var(--text-secondary)]
              "
            >
              {atividade.texto}
            </p>

            {onDeleteComment && (
              <button
                type="button"
                onClick={onDeleteComment}
                className="
                  absolute
                  right-2
                  top-2
                  rounded-md
                  px-2
                  py-1
                  text-[10px]
                  text-[var(--text-muted)]
                  opacity-0
                  transition
                  hover:bg-red-500/10
                  hover:text-red-400
                  group-hover:opacity-100
                  focus:opacity-100
                "
              >
                Excluir
              </button>
            )}
          </div>
        ) : (
          /* ==================================================
              EVENTO DO SISTEMA
          ================================================== */

          <div
            className="
              mt-2
              border-l-2
              border-[var(--border)]
              pl-3
              text-[12px]
              leading-5
              text-[var(--text-muted)]
            "
          >
            {atividade.texto}
          </div>
        )}
      </div>
    </div>
  );
}