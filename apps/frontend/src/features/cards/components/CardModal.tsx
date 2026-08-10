"use client";

// ============================================================
// FX - MODAL DO CARTÃO
//
// Este componente deve permanecer enxuto.
// Sua responsabilidade é montar e coordenar as partes do cartão.
// ============================================================

import { CardActivityPanel } from "./modal/CardActivityPanel";
import { CardDescription } from "./modal/CardDescription";
import { CardMembers } from "./modal/CardMembers";
import { CardModalFooter } from "./modal/CardModalFooter";
import { CardModalHeader } from "./modal/CardModalHeader";
import { CardQuickActions } from "./modal/CardQuickActions";
import { CardTitle } from "./modal/CardTitle";

import { CardChecklists } from "./modal/checklists/CardChecklists";

import { useCardChecklists } from "../hooks/useCardChecklists";

import type { CardModalProps } from "../types/card.types";

// ============================================================
// COMPONENTE
// ============================================================

export function CardModal({
  aberto,
  titulo,
  empresa,
  checklist,
  onClose,
}: CardModalProps) {
  // ----------------------------------------------------------
  // CHECKLISTS
  //
  // O valor checklist ainda participa do identificador porque
  // os dados atuais do Kanban são temporários.
  // ----------------------------------------------------------

  const identificadorCartao =
    `${titulo}|${empresa}|${checklist}`;

  const cardChecklists =
    useCardChecklists(
      identificadorCartao,
    );

  // ----------------------------------------------------------
  // MODAL FECHADO
  // ----------------------------------------------------------

  if (!aberto) {
    return null;
  }

  return (
    <>
      {/* ======================================================
          FUNDO ESCURECIDO
      ====================================================== */}

      <button
        type="button"
        aria-label="Fechar cartão"
        onClick={onClose}
        className="
          fixed
          inset-0
          z-[80]
          cursor-default
          bg-black/70
        "
      />

      {/* ======================================================
          MODAL
      ====================================================== */}

      <section
        className="
          fixed
          left-1/2
          top-1/2
          z-[90]
          flex
          h-[78vh]
          w-[min(980px,94vw)]
          -translate-x-1/2
          -translate-y-1/2
          flex-col
          overflow-hidden
          rounded-lg
          border
          border-[var(--border)]
          bg-[var(--surface)]
          shadow-2xl
        "
      >
        {/* ====================================================
            CABEÇALHO
        ==================================================== */}

        <CardModalHeader
          onClose={onClose}
        />

        {/* ====================================================
            CONTEÚDO
        ==================================================== */}

        <div className="grid min-h-0 flex-1 lg:grid-cols-[1.1fr_0.9fr]">
          {/* ==================================================
              LADO ESQUERDO
          ================================================== */}

          <div
            className="
              overflow-y-auto
              border-r
              border-[var(--border)]
              p-5
            "
          >
            {/* ================================================
                TÍTULO
            ================================================ */}

            <CardTitle
              titulo={titulo}
              empresa={empresa}
            />

            {/* ================================================
                AÇÕES RÁPIDAS
            ================================================ */}

            <CardQuickActions
              onAddChecklist={
                cardChecklists.iniciarNovoChecklist
              }
            />

            {/* ================================================
                MEMBROS
            ================================================ */}

            <CardMembers />

            {/* ================================================
                DESCRIÇÃO
            ================================================ */}

            <CardDescription
              empresa={empresa}
            />

            {/* ================================================
                CHECKLISTS
            ================================================ */}

            <CardChecklists
              checklists={
                cardChecklists.checklists
              }
              criandoChecklist={
                cardChecklists.criandoChecklist
              }
              tituloNovoChecklist={
                cardChecklists.tituloNovoChecklist
              }
              tituloNovoChecklistRef={
                cardChecklists.tituloNovoChecklistRef
              }
              checklistAdicionandoItemId={
                cardChecklists.checklistAdicionandoItemId
              }
              novoItem={
                cardChecklists.novoItem
              }
              novoItemInputRef={
                cardChecklists.novoItemInputRef
              }
              onTituloNovoChecklistChange={
                cardChecklists.setTituloNovoChecklist
              }
              onNovoItemChange={
                cardChecklists.setNovoItem
              }
              onStartChecklist={
                cardChecklists.iniciarNovoChecklist
              }
              onCancelChecklist={
                cardChecklists.cancelarNovoChecklist
              }
              onAddChecklist={
                cardChecklists.adicionarNovoChecklist
              }
              onDeleteChecklist={
                cardChecklists.excluirChecklist
              }
              onToggleItem={
                cardChecklists.alternarItemChecklist
              }
              onStartAddItem={
                cardChecklists.iniciarNovoItem
              }
              onCancelAddItem={
                cardChecklists.cancelarNovoItem
              }
              onAddItem={
                cardChecklists.adicionarNovoItem
              }
              onDeleteItem={
                cardChecklists.excluirItemChecklist
              }
            />
          </div>

          {/* ==================================================
              LADO DIREITO
          ================================================== */}

          <CardActivityPanel />
        </div>

        {/* ====================================================
            RODAPÉ
        ==================================================== */}

        <CardModalFooter />
      </section>
    </>
  );
}