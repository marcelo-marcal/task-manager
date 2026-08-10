"use client";

// ============================================================
// FX - DESCRIÇÃO DO CARTÃO
// ============================================================

import {
  useEffect,
  useState,
  type KeyboardEvent,
} from "react";

// ============================================================
// TIPOS
// ============================================================

type CardDescriptionProps = Readonly<{
  empresa: string;
}>;

// ============================================================
// GERAR DESCRIÇÃO TEMPORÁRIA
// ============================================================

function criarDescricaoInicial(
  empresa: string,
): string {
  return `${empresa}\n\nÁrea reservada para descrição e orientações da tarefa.`;
}

// ============================================================
// COMPONENTE
// ============================================================

export function CardDescription({
  empresa,
}: CardDescriptionProps) {
  // ----------------------------------------------------------
  // ESTADO
  // ----------------------------------------------------------

  const descricaoInicial =
    criarDescricaoInicial(empresa);

  const [descricaoAtual, setDescricaoAtual] =
    useState(descricaoInicial);

  const [descricaoEdicao, setDescricaoEdicao] =
    useState(descricaoInicial);

  const [
    editandoDescricao,
    setEditandoDescricao,
  ] = useState(false);

  // ----------------------------------------------------------
  // SINCRONIZAR CARTÃO
  // ----------------------------------------------------------

  useEffect(() => {
    const novaDescricao =
      criarDescricaoInicial(empresa);

    setDescricaoAtual(novaDescricao);
    setDescricaoEdicao(novaDescricao);
    setEditandoDescricao(false);
  }, [empresa]);

  // ----------------------------------------------------------
  // INICIAR EDIÇÃO
  // ----------------------------------------------------------

  function iniciarEdicaoDescricao() {
    setDescricaoEdicao(descricaoAtual);
    setEditandoDescricao(true);
  }

  // ----------------------------------------------------------
  // SALVAR
  // ----------------------------------------------------------

  function salvarDescricao() {
    const descricaoLimpa =
      descricaoEdicao.trim();

    setDescricaoAtual(descricaoLimpa);
    setDescricaoEdicao(descricaoLimpa);
    setEditandoDescricao(false);
  }

  // ----------------------------------------------------------
  // CANCELAR
  // ----------------------------------------------------------

  function cancelarEdicaoDescricao() {
    setDescricaoEdicao(descricaoAtual);
    setEditandoDescricao(false);
  }

  // ----------------------------------------------------------
  // TECLADO
  // ----------------------------------------------------------

  function handleDescricaoKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelarEdicaoDescricao();
    }
  }

  return (
    <div className="mt-7">
      {/* ======================================================
          CABEÇALHO
      ====================================================== */}

      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold">
          Descrição
        </h3>

        {!editandoDescricao && (
          <button
            type="button"
            onClick={iniciarEdicaoDescricao}
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
            Editar
          </button>
        )}
      </div>

      {/* ======================================================
          EDIÇÃO
      ====================================================== */}

      {editandoDescricao ? (
        <div className="mt-3">
          <textarea
            value={descricaoEdicao}
            onChange={(event) =>
              setDescricaoEdicao(
                event.target.value,
              )
            }
            onKeyDown={
              handleDescricaoKeyDown
            }
            rows={7}
            autoFocus
            aria-label="Editar descrição do cartão"
            className="
              w-full
              resize-y
              rounded-md
              border
              border-[var(--primary)]
              bg-[var(--surface-secondary)]
              p-3
              text-[13px]
              leading-6
              text-[var(--text-primary)]
              outline-none
              ring-2
              ring-[var(--primary)]/20
            "
          />

          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={salvarDescricao}
              className="
                rounded-md
                bg-[var(--primary)]
                px-3
                py-1.5
                text-[12px]
                font-medium
                text-white
                transition
                hover:bg-[var(--primary-hover)]
              "
            >
              Salvar
            </button>

            <button
              type="button"
              onClick={
                cancelarEdicaoDescricao
              }
              className="
                rounded-md
                px-3
                py-1.5
                text-[12px]
                text-[var(--text-secondary)]
                transition
                hover:bg-[var(--surface-hover)]
              "
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={iniciarEdicaoDescricao}
          className="
            mt-3
            min-h-[90px]
            w-full
            whitespace-pre-wrap
            rounded-md
            bg-[var(--surface-secondary)]
            p-3
            text-left
            text-[13px]
            leading-6
            text-[var(--text-secondary)]
            transition
            hover:bg-[var(--surface-hover)]
          "
        >
          {descricaoAtual.length > 0
            ? descricaoAtual
            : "Adicionar uma descrição..."}
        </button>
      )}
    </div>
  );
}