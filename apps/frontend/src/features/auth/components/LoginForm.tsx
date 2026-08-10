"use client";

// ============================================================
// FX - FORMULÁRIO DE LOGIN
// ============================================================

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

// ============================================================
// COMPONENTE
// ============================================================

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // ----------------------------------------------------------
  // ENVIO DO FORMULÁRIO
  // ----------------------------------------------------------

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // --------------------------------------------------------
    // TEMPORÁRIO
    // A autenticação real será ligada ao backend posteriormente.
    // --------------------------------------------------------

    setCarregando(true);

    window.setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  }

  // ----------------------------------------------------------
  // RENDERIZAÇÃO
  // ----------------------------------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
    >
      {/* ======================================================
          E-MAIL
          ====================================================== */}

      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[var(--text-secondary)]"
        >
          E-mail
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="seuemail@empresa.com.br"
          autoComplete="email"
          required
          className="
            h-12
            w-full
            rounded-lg
            border
            border-[var(--border)]
            bg-[var(--surface-secondary)]
            px-4
            text-[var(--text-primary)]
            outline-none
            transition
            placeholder:text-[var(--text-muted)]
            focus:border-[var(--primary)]
            focus:ring-2
            focus:ring-[var(--primary)]/20
          "
        />
      </div>

      {/* ======================================================
          SENHA
          ====================================================== */}

      <div className="mb-3">
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="senha"
            className="text-sm font-medium text-[var(--text-secondary)]"
          >
            Senha
          </label>

          <button
            type="button"
            className="
              text-sm
              font-medium
              text-[var(--primary)]
              transition
              hover:opacity-80
            "
          >
            Esqueci minha senha
          </button>
        </div>

        <div className="relative">
          <input
            id="senha"
            type={mostrarSenha ? "text" : "password"}
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            placeholder="Digite sua senha"
            autoComplete="current-password"
            required
            className="
              h-12
              w-full
              rounded-lg
              border
              border-[var(--border)]
              bg-[var(--surface-secondary)]
              px-4
              pr-20
              text-[var(--text-primary)]
              outline-none
              transition
              placeholder:text-[var(--text-muted)]
              focus:border-[var(--primary)]
              focus:ring-2
              focus:ring-[var(--primary)]/20
            "
          />

          <button
            type="button"
            onClick={() =>
              setMostrarSenha((estadoAtual) => !estadoAtual)
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-sm
              font-medium
              text-[var(--text-secondary)]
              hover:text-[var(--text-primary)]
            "
          >
            {mostrarSenha ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>

      {/* ======================================================
          LEMBRAR ACESSO
          ====================================================== */}

      <label className="mb-7 flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          className="
            h-4
            w-4
            rounded
            border-[var(--border)]
            accent-[var(--primary)]
          "
        />

        <span className="text-sm text-[var(--text-secondary)]">
          Lembrar de mim
        </span>
      </label>

      {/* ======================================================
          BOTÃO ENTRAR
          ====================================================== */}

      <button
        type="submit"
        disabled={carregando}
        className="
          flex
          h-12
          w-full
          items-center
          justify-center
          rounded-lg
          bg-[var(--primary)]
          px-5
          font-semibold
          text-white
          transition
          hover:bg-[var(--primary-hover)]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {carregando ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}