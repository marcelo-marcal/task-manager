"use client";

// ============================================================
// FX - TÍTULO DO CARTÃO
// ============================================================

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

// ============================================================
// TIPOS
// ============================================================

type CardTitleProps = Readonly<{
  titulo: string;
  empresa: string;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function CardTitle({
  titulo,
  empresa,
}: CardTitleProps) {
  // ----------------------------------------------------------
  // ESTADO
  // ----------------------------------------------------------

  const [tituloAtual, setTituloAtual] = useState(titulo);

  const [tituloEdicao, setTituloEdicao] =
    useState(titulo);

  const [editandoTitulo, setEditandoTitulo] =
    useState(false);

  const tituloInputRef =
    useRef<HTMLTextAreaElement | null>(null);

  // ----------------------------------------------------------
  // SINCRONIZAR CARTÃO
  // ----------------------------------------------------------

  useEffect(() => {
    setTituloAtual(titulo);
    setTituloEdicao(titulo);
    setEditandoTitulo(false);
  }, [titulo]);

  // ----------------------------------------------------------
  // FOCO AUTOMÁTICO
  // ----------------------------------------------------------

  useEffect(() => {
    if (!editandoTitulo) {
      return;
    }

    tituloInputRef.current?.focus();
    tituloInputRef.current?.select();
  }, [editandoTitulo]);

  // ----------------------------------------------------------
  // SALVAR
  // ----------------------------------------------------------

  function salvarTitulo() {
    const tituloLimpo = tituloEdicao.trim();

    if (tituloLimpo.length === 0) {
      setTituloEdicao(tituloAtual);
      setEditandoTitulo(false);

      return;
    }

    setTituloAtual(tituloLimpo);
    setTituloEdicao(tituloLimpo);
    setEditandoTitulo(false);
  }

  // ----------------------------------------------------------
  // CANCELAR
  // ----------------------------------------------------------

  function cancelarEdicaoTitulo() {
    setTituloEdicao(tituloAtual);
    setEditandoTitulo(false);
  }

  // ----------------------------------------------------------
  // TECLADO
  // ----------------------------------------------------------

  function handleTituloKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelarEdicaoTitulo();

      return;
    }

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      salvarTitulo();
    }
  }

  return (
    <>
      {/* ======================================================
          TÍTULO
      ====================================================== */}

      {editandoTitulo ? (
        <textarea
          ref={tituloInputRef}
          value={tituloEdicao}
          onChange={(event) =>
            setTituloEdicao(event.target.value)
          }
          onBlur={salvarTitulo}
          onKeyDown={handleTituloKeyDown}
          rows={3}
          aria-label="Editar título do cartão"
          className="
            w-full
            resize-none
            rounded-md
            border
            border-[var(--primary)]
            bg-[var(--surface-secondary)]
            px-2
            py-1.5
            text-[26px]
            font-semibold
            leading-[1.15]
            text-[var(--text-primary)]
            outline-none
            ring-2
            ring-[var(--primary)]/20
          "
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setTituloEdicao(tituloAtual);
            setEditandoTitulo(true);
          }}
          className="
            block
            w-full
            rounded-md
            px-2
            py-1.5
            text-left
            text-[26px]
            font-semibold
            leading-[1.15]
            text-[var(--text-primary)]
            transition
            hover:bg-[var(--surface-hover)]
          "
          title="Clique para editar o título"
        >
          {tituloAtual}
        </button>
      )}

      {/* ======================================================
          EMPRESA
      ====================================================== */}

      <p
        className="
          mt-2
          px-2
          text-[12px]
          text-[var(--text-muted)]
        "
      >
        {empresa}
      </p>
    </>
  );
}