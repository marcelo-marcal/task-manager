"use client";

// ============================================================
// FX - PAINEL DE COMENTÁRIOS E ATIVIDADE
// ============================================================

import { useCardActivity } from "../../hooks/useCardActivity";

import { ActivityItem } from "./activity/ActivityItem";
import { CommentComposer } from "./activity/CommentComposer";

// ============================================================
// COMPONENTE
// ============================================================

export function CardActivityPanel() {
  const {
    atividades,
    novoComentario,
    setNovoComentario,
    adicionarComentario,
  } = useCardActivity();

  return (
    <div
      className="
        overflow-y-auto
        bg-[var(--background)]
        p-4
      "
    >
      {/* ======================================================
          CABEÇALHO
      ====================================================== */}

      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold">
          Comentários e atividade
        </h3>

        <button
          type="button"
          className="
            rounded-md
            border
            border-[var(--border)]
            px-3
            py-1.5
            text-xs
            text-[var(--text-secondary)]
            transition
            hover:bg-[var(--surface-hover)]
          "
        >
          Mostrar detalhes
        </button>
      </div>

      {/* ======================================================
          NOVO COMENTÁRIO
      ====================================================== */}

      <CommentComposer
        comentario={novoComentario}
        onComentarioChange={
          setNovoComentario
        }
        onSubmit={
          adicionarComentario
        }
      />

      {/* ======================================================
          ATIVIDADES
      ====================================================== */}

      <div className="mt-5 space-y-5">
        {atividades.map(
          (atividade) => (
            <ActivityItem
              key={atividade.id}
              atividade={atividade}
            />
          ),
        )}
      </div>
    </div>
  );
}