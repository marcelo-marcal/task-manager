// ============================================================
// FX - QUADRO KANBAN
// ============================================================

import { AppShell } from "@/components/layout/AppShell";
import { KanbanBoard } from "@/features/cards/components/KanbanBoard";

// ============================================================
// PÁGINA
// ============================================================

export default function QuadrosPage() {
  return (
    <AppShell>
      <div className="min-h-[calc(100vh-48px)] bg-[#19375f]">
        {/* ====================================================
            CABEÇALHO DO QUADRO
            ==================================================== */}

        <div
          className="
            flex
            min-h-12
            items-center
            justify-between
            border-b
            border-white/10
            bg-[#10213b]
            px-3
          "
        >
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold">
              Contábil
            </h1>

            <span className="text-xs text-[var(--text-muted)]">
              Quadro principal
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="
                rounded-md
                bg-white/10
                px-3
                py-1.5
                text-xs
                hover:bg-white/15
              "
            >
              Filtros
            </button>

            <button
              type="button"
              className="
                rounded-md
                bg-white/10
                px-3
                py-1.5
                text-xs
                hover:bg-white/15
              "
            >
              Compartilhar
            </button>

            <button
              type="button"
              className="
                rounded-md
                bg-white/10
                px-2
                py-1.5
                text-xs
                hover:bg-white/15
              "
            >
              ...
            </button>
          </div>
        </div>

        {/* ====================================================
            KANBAN
            ==================================================== */}

        <KanbanBoard />
      </div>
    </AppShell>
  );
}