"use client";

// ============================================================
// FX - APP SHELL
// Estrutura principal da aplicação após o login.
//
// Direção visual:
// - Interface compacta.
// - Inspirada na densidade de aplicações como Trello.
// - Sidebar retrátil.
// - Desktop: sidebar empurra o conteúdo.
// - Mobile: sidebar sobrepõe o conteúdo.
// ============================================================

import { useState, type ReactNode } from "react";

// ============================================================
// TIPOS
// ============================================================

type AppShellProps = Readonly<{
  children: ReactNode;
}>;

// ============================================================
// MENU PRINCIPAL
// ============================================================

const menuPrincipal = [
  "Dashboard",
  "Meus Trabalhos",
  "Caixa de Entrada",
  "Chat",
  "Calendário",
  "Quadros",
  "Empresas",
  "Competências",
  "Equipes",
  "Relatórios",
  "Automações",
] as const;

// ============================================================
// COMPONENTE
// ============================================================

export function AppShell({ children }: AppShellProps) {
  const [sidebarAberta, setSidebarAberta] = useState(false);

  return (
    <div
      className="
        min-h-screen
        bg-[var(--background)]
        text-[13px]
        text-[var(--text-primary)]
      "
    >
      {/* ======================================================
          HEADER
          Altura compacta: 48px
          ====================================================== */}

      <header
        className="
          fixed
          left-0
          right-0
          top-0
          z-50
          flex
          h-12
          items-center
          border-b
          border-[var(--border)]
          bg-[var(--surface)]
          px-2
        "
      >
        {/* BOTÃO DO MENU */}

        <button
          type="button"
          onClick={() =>
            setSidebarAberta((estadoAtual) => !estadoAtual)
          }
          aria-label={
            sidebarAberta ? "Fechar menu" : "Abrir menu"
          }
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-md
            border
            border-[var(--border)]
            text-base
            transition
            hover:bg-[var(--surface-hover)]
          "
        >
          ☰
        </button>

        {/* LOGO */}

        <div className="ml-2 flex shrink-0 items-center gap-2">
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-md
              bg-[var(--primary)]
              text-sm
              font-bold
              text-white
            "
          >
            FX
          </div>

          <span className="hidden text-sm font-semibold sm:block">
            FX
          </span>
        </div>

        {/* PESQUISA */}

        <div
          className="
            mx-auto
            hidden
            w-full
            max-w-[650px]
            px-6
            md:block
          "
        >
          <input
            type="search"
            placeholder="Pesquisar"
            className="
              h-8
              w-full
              rounded-md
              border
              border-[var(--border)]
              bg-[var(--surface-secondary)]
              px-3
              text-[13px]
              text-[var(--text-primary)]
              outline-none
              placeholder:text-[var(--text-muted)]
              focus:border-[var(--primary)]
            "
          />
        </div>

        {/* AÇÕES */}

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="Notificações"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-md
              text-sm
              transition
              hover:bg-[var(--surface-hover)]
            "
          >
            🔔
          </button>

          <button
            type="button"
            aria-label="Perfil"
            className="
              flex
              h-8
              min-w-8
              items-center
              justify-center
              rounded-full
              bg-[var(--surface-secondary)]
              px-2
              text-xs
              font-semibold
            "
          >
            MA
          </button>
        </div>
      </header>

      {/* ======================================================
          SIDEBAR
          Largura compacta: 232px
          ====================================================== */}

      <aside
        className={`
          fixed
          bottom-0
          left-0
          top-12
          z-40
          w-[232px]
          border-r
          border-[var(--border)]
          bg-[var(--surface)]
          transition-transform
          duration-200
          ease-out

          ${
            sidebarAberta
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex h-full flex-col p-2">
          {/* ESCRITÓRIO */}

          <div
            className="
              mb-2
              rounded-md
              border
              border-[var(--border)]
              bg-[var(--surface-secondary)]
              px-3
              py-2
            "
          >
            <p className="text-[13px] font-semibold">
              Escritório Contábil
            </p>

            <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
              Ambiente interno
            </p>
          </div>

          {/* MENU */}

          <nav className="space-y-0.5">
            {menuPrincipal.map((item) => (
              <button
                key={item}
                type="button"
                className="
                  flex
                  h-8
                  w-full
                  items-center
                  rounded-md
                  px-2.5
                  text-left
                  text-[13px]
                  text-[var(--text-secondary)]
                  transition
                  hover:bg-[var(--surface-hover)]
                  hover:text-[var(--text-primary)]
                "
              >
                {item}
              </button>
            ))}
          </nav>

          {/* RODAPÉ */}

          <div
            className="
              mt-auto
              border-t
              border-[var(--border)]
              pt-2
            "
          >
            <button
              type="button"
              className="
                flex
                h-8
                w-full
                items-center
                rounded-md
                px-2.5
                text-left
                text-[13px]
                text-[var(--text-secondary)]
                transition
                hover:bg-[var(--surface-hover)]
                hover:text-[var(--text-primary)]
              "
            >
              Configurações
            </button>

            <div className="mt-1 flex items-center gap-2 rounded-md p-2">
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
                  text-[11px]
                  font-semibold
                  text-white
                "
              >
                MA
              </div>

              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium">
                  Marcelo Assis
                </p>

                <p className="text-[10px] text-[var(--text-muted)]">
                  SuperAdmin
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ======================================================
          OVERLAY SOMENTE MOBILE
          ====================================================== */}

      {sidebarAberta && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setSidebarAberta(false)}
          className="
            fixed
            inset-0
            top-12
            z-30
            bg-black/40
            lg:hidden
          "
        />
      )}

      {/* ======================================================
          CONTEÚDO PRINCIPAL
          ====================================================== */}

      <main
        className={`
          min-h-screen
          pt-12
          transition-[margin]
          duration-200
          ease-out

          ${
            sidebarAberta
              ? "lg:ml-[232px]"
              : "lg:ml-0"
          }
        `}
      >
        {children}
      </main>
    </div>
  );
}