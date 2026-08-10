"use client";

// ============================================================
// FX - BLOCO DE CHECKLIST
// ============================================================

import type {
  KeyboardEvent,
  RefObject,
} from "react";

import type { ChecklistData } from "../../../types/card.types";

import { ChecklistItem } from "./ChecklistItem";

// ============================================================
// TIPOS
// ============================================================

type ChecklistBlockProps = Readonly<{
  checklist: ChecklistData;

  adicionandoItem: boolean;

  novoItem: string;

  novoItemInputRef:
    RefObject<HTMLInputElement | null>;

  onNovoItemChange: (texto: string) => void;

  onDeleteChecklist: () => void;

  onToggleItem: (
    itemId: number,
  ) => void;

  onDeleteItem: (
    itemId: number,
  ) => void;

  onStartAddItem: () => void;

  onCancelAddItem: () => void;

  onAddItem: () => void;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function ChecklistBlock({
  checklist,
  adicionandoItem,
  novoItem,
  novoItemInputRef,
  onNovoItemChange,
  onDeleteChecklist,
  onToggleItem,
  onDeleteItem,
  onStartAddItem,
  onCancelAddItem,
  onAddItem,
}: ChecklistBlockProps) {
  // ----------------------------------------------------------
  // PROGRESSO
  // ----------------------------------------------------------

  const totalItens =
    checklist.itens.length;

  const totalConcluidos =
    checklist.itens.filter(
      (item) => item.concluido,
    ).length;

  const percentual =
    totalItens === 0
      ? 0
      : Math.round(
          (totalConcluidos /
            totalItens) *
            100,
        );

  // ----------------------------------------------------------
  // TECLADO DO NOVO ITEM
  // ----------------------------------------------------------

  function handleNovoItemKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      onCancelAddItem();

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      onAddItem();
    }
  }

  return (
    <section
      className="
        border-t
        border-[var(--border)]
        pt-5
        first:border-t-0
        first:pt-0
      "
    >
      {/* ======================================================
          CABEÇALHO
      ====================================================== */}

      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3
            className="
              truncate
              text-[14px]
              font-semibold
            "
          >
            {checklist.titulo}
          </h3>

          <p
            className="
              mt-0.5
              text-[10px]
              text-[var(--text-muted)]
            "
          >
            {totalConcluidos}/{totalItens} concluídos
          </p>
        </div>

        <button
          type="button"
          onClick={onDeleteChecklist}
          className="
            shrink-0
            rounded-md
            px-2.5
            py-1.5
            text-[11px]
            text-[var(--text-muted)]
            transition
            hover:bg-red-500/10
            hover:text-red-400
          "
        >
          Excluir
        </button>
      </div>

      {/* ======================================================
          PROGRESSO
      ====================================================== */}

      <div className="mt-3 flex items-center gap-3">
        <span
          className="
            w-8
            shrink-0
            text-[11px]
            text-[var(--text-muted)]
          "
        >
          {percentual}%
        </span>

        <div
          className="
            h-2
            flex-1
            overflow-hidden
            rounded-full
            bg-[var(--surface-secondary)]
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-green-500
              transition-[width]
              duration-200
            "
            style={{
              width: `${percentual}%`,
            }}
          />
        </div>
      </div>

      {/* ======================================================
          ITENS
      ====================================================== */}

      <div className="mt-4 space-y-1">
        {checklist.itens.map(
          (item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggle={() =>
                onToggleItem(item.id)
              }
              onDelete={() =>
                onDeleteItem(item.id)
              }
            />
          ),
        )}
      </div>

      {/* ======================================================
          CHECKLIST VAZIO
      ====================================================== */}

      {totalItens === 0 && (
        <div
          className="
            mt-3
            rounded-md
            border
            border-dashed
            border-[var(--border)]
            px-3
            py-4
            text-center
            text-[12px]
            text-[var(--text-muted)]
          "
        >
          Nenhum item adicionado.
        </div>
      )}

      {/* ======================================================
          NOVO ITEM
      ====================================================== */}

      {adicionandoItem ? (
        <div
          className="
            mt-3
            rounded-md
            border
            border-[var(--border)]
            bg-[var(--surface-secondary)]
            p-3
          "
        >
          <input
            ref={novoItemInputRef}
            type="text"
            value={novoItem}
            onChange={(event) =>
              onNovoItemChange(
                event.target.value,
              )
            }
            onKeyDown={
              handleNovoItemKeyDown
            }
            placeholder="Adicionar um item..."
            aria-label={`Novo item de ${checklist.titulo}`}
            className="
              h-9
              w-full
              rounded-md
              border
              border-[var(--border)]
              bg-[var(--background)]
              px-3
              text-[12px]
              text-[var(--text-primary)]
              outline-none
              placeholder:text-[var(--text-muted)]
              focus:border-[var(--primary)]
            "
          />

          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={onAddItem}
              disabled={
                novoItem.trim().length === 0
              }
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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Adicionar
            </button>

            <button
              type="button"
              onClick={onCancelAddItem}
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
          onClick={onStartAddItem}
          className="
            mt-3
            rounded-md
            px-3
            py-2
            text-[12px]
            text-[var(--text-secondary)]
            transition
            hover:bg-[var(--surface-hover)]
          "
        >
          + Adicionar um item
        </button>
      )}
    </section>
  );
}