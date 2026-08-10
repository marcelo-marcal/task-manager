"use client";

// ============================================================
// FX - PAINEL DE COMENTÁRIOS E ATIVIDADE
// ============================================================

// ============================================================
// TIPOS
// ============================================================

type ActivityItemProps = Readonly<{
  usuario: string;
  horario: string;
  texto: string;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function CardActivityPanel() {
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
          COMENTÁRIO
      ====================================================== */}

      <textarea
        placeholder="Escrever um comentário..."
        className="
          mt-3
          min-h-[42px]
          w-full
          resize-none
          rounded-md
          border
          border-[var(--border)]
          bg-[var(--surface-secondary)]
          px-3
          py-2
          text-[13px]
          text-[var(--text-primary)]
          outline-none
          placeholder:text-[var(--text-muted)]
          focus:border-[var(--primary)]
        "
      />

      {/* ======================================================
          ATIVIDADES TEMPORÁRIAS
      ====================================================== */}

      <div className="mt-5 space-y-5">
        <ActivityItem
          usuario="Marcelo Assis"
          horario="há 1 hora"
          texto="Início da conferência da tarefa."
        />

        <ActivityItem
          usuario="Marcelo Assis"
          horario="há 5 horas"
          texto="Adicionou este cartão ao quadro Contábil."
        />
      </div>
    </div>
  );
}

// ============================================================
// ITEM DE ATIVIDADE
//
// Por enquanto fica interno porque pertence apenas ao painel
// de atividade. Se surgir uso em outras telas, extrairemos.
// ============================================================

function ActivityItem({
  usuario,
  horario,
  texto,
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
        MA
      </div>

      {/* ======================================================
          CONTEÚDO
      ====================================================== */}

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-semibold">
            {usuario}
          </span>

          <span className="text-[10px] text-[var(--text-muted)]">
            {horario}
          </span>
        </div>

        <div
          className="
            mt-2
            rounded-md
            bg-[var(--surface-secondary)]
            p-3
            text-[12px]
            leading-5
            text-[var(--text-secondary)]
          "
        >
          {texto}
        </div>
      </div>
    </div>
  );
}