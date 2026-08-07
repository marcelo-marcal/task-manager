// ============================================================
// FX - DASHBOARD INICIAL
// ============================================================

import { AppShell } from "@/components/layout/AppShell";

// ============================================================
// PÁGINA
// ============================================================

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="p-4">
        {/* ====================================================
            CABEÇALHO
            ==================================================== */}

        <div className="mb-4">
          <p className="mb-0.5 text-xs text-[var(--text-secondary)]">
            Visão geral
          </p>

          <h1 className="text-xl font-semibold">
            Dashboard
          </h1>
        </div>

        {/* ====================================================
            INDICADORES
            ==================================================== */}

        <div
          className="
            grid
            gap-3
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <DashboardCard
            titulo="Tarefas em andamento"
            valor="24"
          />

          <DashboardCard
            titulo="Aguardando cliente"
            valor="7"
          />

          <DashboardCard
            titulo="Em revisão"
            valor="9"
          />

          <DashboardCard
            titulo="Concluídas"
            valor="18"
          />
        </div>

        {/* ====================================================
            ÁREA PRINCIPAL
            ==================================================== */}

        <section
          className="
            mt-4
            min-h-[360px]
            rounded-lg
            border
            border-[var(--border)]
            bg-[var(--surface)]
            p-4
          "
        >
          <h2 className="text-sm font-semibold">
            Acompanhamento das tarefas
          </h2>

          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Nesta área construiremos a visão de acompanhamento
            das empresas, equipes e competências.
          </p>
        </section>
      </div>
    </AppShell>
  );
}

// ============================================================
// CARD DO DASHBOARD
// ============================================================

type DashboardCardProps = Readonly<{
  titulo: string;
  valor: string;
}>;

function DashboardCard({
  titulo,
  valor,
}: DashboardCardProps) {
  return (
    <div
      className="
        rounded-lg
        border
        border-[var(--border)]
        bg-[var(--surface)]
        px-4
        py-3
      "
    >
      <p className="text-xs text-[var(--text-secondary)]">
        {titulo}
      </p>

      <p className="mt-1.5 text-2xl font-semibold">
        {valor}
      </p>
    </div>
  );
}