// ============================================================
// FX - TELA DE LOGIN
// ============================================================

import { LoginForm } from "@/features/auth/components/LoginForm";

// ============================================================
// PÁGINA
// ============================================================

export default function Home() {
  return (
    <main
      className="
        min-h-screen
        bg-[var(--background)]
        text-[var(--text-primary)]
      "
    >
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        {/* ====================================================
            ÁREA VISUAL
            ==================================================== */}

        <section
          className="
            relative
            hidden
            overflow-hidden
            border-r
            border-[var(--border)]
            bg-[var(--surface-secondary)]
            p-12
            lg:flex
            lg:flex-col
            lg:justify-between
          "
        >
          {/* Efeito visual de fundo */}

          <div
            className="
              pointer-events-none
              absolute
              -left-40
              -top-40
              h-[520px]
              w-[520px]
              rounded-full
              bg-blue-500/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-180px]
              right-[-150px]
              h-[500px]
              w-[500px]
              rounded-full
              bg-purple-500/10
              blur-3xl
            "
          />

          {/* Marca */}

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--primary)]
                  text-lg
                  font-bold
                  text-white
                "
              >
                FX
              </div>

              <span className="text-xl font-semibold">
                FX
              </span>
            </div>
          </div>

          {/* Conteúdo */}

          <div className="relative z-10 max-w-xl">
            <p
              className="
                mb-4
                text-sm
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[var(--primary)]
              "
            >
              Gestão inteligente
            </p>

            <h1
              className="
                mb-6
                text-4xl
                font-semibold
                leading-tight
                xl:text-5xl
              "
            >
              Organize tarefas, acompanhe equipes e controle cada etapa do trabalho.
            </h1>

            <p
              className="
                max-w-lg
                text-base
                leading-7
                text-[var(--text-secondary)]
              "
            >
              Um ambiente centralizado para projetos, processos,
              comunicação interna e acompanhamento das rotinas do escritório.
            </p>
          </div>

          {/* Rodapé */}

          <div
            className="
              relative
              z-10
              text-sm
              text-[var(--text-muted)]
            "
          >
            FX • Sistema interno de gestão
          </div>
        </section>

        {/* ====================================================
            ÁREA DE LOGIN
            ==================================================== */}

        <section
          className="
            flex
            min-h-screen
            items-center
            justify-center
            px-6
            py-10
            sm:px-10
            lg:px-14
          "
        >
          <div className="w-full max-w-md">
            {/* Marca no mobile */}

            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--primary)]
                  font-bold
                  text-white
                "
              >
                FX
              </div>

              <span className="text-xl font-semibold">
                FX
              </span>
            </div>

            {/* Cabeçalho */}

            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-semibold">
                Bem-vindo
              </h2>

              <p className="text-[var(--text-secondary)]">
                Entre com seus dados para acessar o sistema.
              </p>
            </div>

            {/* Formulário */}

            <LoginForm />

            {/* Rodapé mobile */}

            <p
              className="
                mt-10
                text-center
                text-xs
                text-[var(--text-muted)]
              "
            >
              FX • Acesso restrito aos usuários autorizados
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}