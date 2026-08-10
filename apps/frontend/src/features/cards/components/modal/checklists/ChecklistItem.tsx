"use client";

// ============================================================
// FX - ITEM DE CHECKLIST
// ============================================================

import type { ChecklistItemData } from "../../../types/card.types";

// ============================================================
// TIPOS
// ============================================================

type ChecklistItemProps = Readonly<{
  item: ChecklistItemData;
  onToggle: () => void;
  onDelete: () => void;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function ChecklistItem({
  item,
  onToggle,
  onDelete,
}: ChecklistItemProps) {
  return (
    <div
      className="
        group
        flex
        min-h-9
        items-center
        gap-2
        rounded-md
        px-2
        py-1.5
        transition
        hover:bg-[var(--surface-hover)]
      "
    >
      {/* CHECKBOX */}

      <input
        type="checkbox"
        checked={item.concluido}
        onChange={onToggle}
        aria-label={`Marcar ${item.texto}`}
        className="
          h-4
          w-4
          shrink-0
          cursor-pointer
          accent-green-500
        "
      />

      {/* TEXTO */}

      <button
        type="button"
        onClick={onToggle}
        className="
          min-w-0
          flex-1
          text-left
          text-[12px]
          text-[var(--text-secondary)]
        "
      >
        <span
          className={
            item.concluido
              ? "line-through opacity-70"
              : ""
          }
        >
          {item.texto}
        </span>
      </button>

      {/* EXCLUIR */}

      <button
        type="button"
        onClick={onDelete}
        aria-label={`Excluir ${item.texto}`}
        title="Excluir item"
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-md
          text-[14px]
          text-[var(--text-muted)]
          opacity-0
          transition
          hover:bg-red-500/10
          hover:text-red-400
          group-hover:opacity-100
          focus:opacity-100
        "
      >
        ×
      </button>
    </div>
  );
}