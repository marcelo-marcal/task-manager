"use client";

// ============================================================
// FX - CHECKLISTS DO CARTÃO
// ============================================================

import type {
  RefObject,
} from "react";

import type { ChecklistData } from "../../../types/card.types";

import { ChecklistBlock } from "./ChecklistBlock";
import { NewChecklistForm } from "./NewChecklistForm";

// ============================================================
// TIPOS
// ============================================================

type CardChecklistsProps = Readonly<{
  checklists: ChecklistData[];

  criandoChecklist: boolean;

  tituloNovoChecklist: string;

  tituloNovoChecklistRef:
    RefObject<HTMLInputElement | null>;

  checklistAdicionandoItemId:
    number | null;

  novoItem: string;

  novoItemInputRef:
    RefObject<HTMLInputElement | null>;

  onTituloNovoChecklistChange:
    (titulo: string) => void;

  onNovoItemChange:
    (texto: string) => void;

  onStartChecklist: () => void;
  onCancelChecklist: () => void;
  onAddChecklist: () => void;

  onDeleteChecklist:
    (checklistId: number) => void;

  onToggleItem: (
    checklistId: number,
    itemId: number,
  ) => void;

  onStartAddItem:
    (checklistId: number) => void;

  onCancelAddItem: () => void;

  onAddItem:
    (checklistId: number) => void;

  onDeleteItem: (
    checklistId: number,
    itemId: number,
  ) => void;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function CardChecklists({
  checklists,
  criandoChecklist,
  tituloNovoChecklist,
  tituloNovoChecklistRef,
  checklistAdicionandoItemId,
  novoItem,
  novoItemInputRef,
  onTituloNovoChecklistChange,
  onNovoItemChange,
  onStartChecklist,
  onCancelChecklist,
  onAddChecklist,
  onDeleteChecklist,
  onToggleItem,
  onStartAddItem,
  onCancelAddItem,
  onAddItem,
  onDeleteItem,
}: CardChecklistsProps) {
  return (
    <>
      {/* ======================================================
          NOVO CHECKLIST
      ====================================================== */}

      {criandoChecklist && (
        <NewChecklistForm
          titulo={tituloNovoChecklist}
          inputRef={
            tituloNovoChecklistRef
          }
          onTituloChange={
            onTituloNovoChecklistChange
          }
          onAdd={onAddChecklist}
          onCancel={onCancelChecklist}
        />
      )}

      {/* ======================================================
          CHECKLISTS
      ====================================================== */}

      <div className="mt-7 space-y-8">
        {checklists.map(
          (checklist) => (
            <ChecklistBlock
              key={checklist.id}
              checklist={checklist}
              adicionandoItem={
                checklistAdicionandoItemId ===
                checklist.id
              }
              novoItem={novoItem}
              novoItemInputRef={
                novoItemInputRef
              }
              onNovoItemChange={
                onNovoItemChange
              }
              onDeleteChecklist={() =>
                onDeleteChecklist(
                  checklist.id,
                )
              }
              onToggleItem={(itemId) =>
                onToggleItem(
                  checklist.id,
                  itemId,
                )
              }
              onDeleteItem={(itemId) =>
                onDeleteItem(
                  checklist.id,
                  itemId,
                )
              }
              onStartAddItem={() =>
                onStartAddItem(
                  checklist.id,
                )
              }
              onCancelAddItem={
                onCancelAddItem
              }
              onAddItem={() =>
                onAddItem(
                  checklist.id,
                )
              }
            />
          ),
        )}

        {/* ====================================================
            SEM CHECKLISTS
        ==================================================== */}

        {checklists.length === 0 && (
          <div
            className="
              rounded-md
              border
              border-dashed
              border-[var(--border)]
              px-4
              py-6
              text-center
            "
          >
            <p
              className="
                text-[12px]
                text-[var(--text-muted)]
              "
            >
              Este cartão ainda não possui checklists.
            </p>

            <button
              type="button"
              onClick={onStartChecklist}
              className="
                mt-3
                rounded-md
                bg-[var(--surface-secondary)]
                px-3
                py-2
                text-[12px]
                text-[var(--text-secondary)]
                transition
                hover:bg-[var(--surface-hover)]
                hover:text-[var(--text-primary)]
              "
            >
              + Adicionar checklist
            </button>
          </div>
        )}
      </div>
    </>
  );
}