"use client";

// ============================================================
// FX - HOOK DOS CHECKLISTS DO CARTÃO
// ============================================================

import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  ChecklistData,
  ChecklistItemData,
} from "../types/card.types";

// ============================================================
// CHECKLISTS TEMPORÁRIOS
// ============================================================

function criarChecklistsIniciais(): ChecklistData[] {
  return [
    {
      id: 1,
      titulo: "Conferência",
      itens: [
        {
          id: 1,
          texto: "Baixar documentos",
          concluido: true,
        },
        {
          id: 2,
          texto: "Importar arquivos",
          concluido: true,
        },
        {
          id: 3,
          texto: "Conferir informações",
          concluido: false,
        },
      ],
    },
  ];
}

// ============================================================
// HOOK
// ============================================================

export function useCardChecklists(
  identificadorCartao: string,
) {
  // ----------------------------------------------------------
  // CHECKLISTS
  // ----------------------------------------------------------

  const [checklists, setChecklists] =
    useState<ChecklistData[]>(
      criarChecklistsIniciais,
    );

  // ----------------------------------------------------------
  // NOVO CHECKLIST
  // ----------------------------------------------------------

  const [
    criandoChecklist,
    setCriandoChecklist,
  ] = useState(false);

  const [
    tituloNovoChecklist,
    setTituloNovoChecklist,
  ] = useState("");

  const tituloNovoChecklistRef =
    useRef<HTMLInputElement | null>(null);

  // ----------------------------------------------------------
  // NOVO ITEM
  // ----------------------------------------------------------

  const [
    checklistAdicionandoItemId,
    setChecklistAdicionandoItemId,
  ] = useState<number | null>(null);

  const [novoItem, setNovoItem] =
    useState("");

  const novoItemInputRef =
    useRef<HTMLInputElement | null>(null);

  // ----------------------------------------------------------
  // REINICIAR AO TROCAR DE CARTÃO
  // ----------------------------------------------------------

  useEffect(() => {
    setChecklists(
      criarChecklistsIniciais(),
    );

    setCriandoChecklist(false);
    setTituloNovoChecklist("");

    setChecklistAdicionandoItemId(null);
    setNovoItem("");
  }, [identificadorCartao]);

  // ----------------------------------------------------------
  // FOCO: NOVO CHECKLIST
  // ----------------------------------------------------------

  useEffect(() => {
    if (!criandoChecklist) {
      return;
    }

    tituloNovoChecklistRef.current?.focus();
  }, [criandoChecklist]);

  // ----------------------------------------------------------
  // FOCO: NOVO ITEM
  // ----------------------------------------------------------

  useEffect(() => {
    if (
      checklistAdicionandoItemId === null
    ) {
      return;
    }

    novoItemInputRef.current?.focus();
  }, [checklistAdicionandoItemId]);

  // ==========================================================
  // CHECKLIST
  // ==========================================================

  function iniciarNovoChecklist() {
    setTituloNovoChecklist("");
    setCriandoChecklist(true);

    setChecklistAdicionandoItemId(null);
    setNovoItem("");
  }

  function cancelarNovoChecklist() {
    setTituloNovoChecklist("");
    setCriandoChecklist(false);
  }

  function adicionarNovoChecklist() {
    const tituloLimpo =
      tituloNovoChecklist.trim();

    if (tituloLimpo.length === 0) {
      return;
    }

    setChecklists((checklistsAtuais) => {
      const maiorId =
        checklistsAtuais.reduce(
          (
            maiorAtual,
            checklistAtual,
          ) =>
            checklistAtual.id >
            maiorAtual
              ? checklistAtual.id
              : maiorAtual,
          0,
        );

      const novoChecklist: ChecklistData = {
        id: maiorId + 1,
        titulo: tituloLimpo,
        itens: [],
      };

      return [
        ...checklistsAtuais,
        novoChecklist,
      ];
    });

    setTituloNovoChecklist("");
    setCriandoChecklist(false);
  }

  function excluirChecklist(
    checklistId: number,
  ) {
    setChecklists(
      (checklistsAtuais) =>
        checklistsAtuais.filter(
          (checklistAtual) =>
            checklistAtual.id !==
            checklistId,
        ),
    );

    if (
      checklistAdicionandoItemId ===
      checklistId
    ) {
      setChecklistAdicionandoItemId(
        null,
      );

      setNovoItem("");
    }
  }

  // ==========================================================
  // ITENS
  // ==========================================================

  function alternarItemChecklist(
    checklistId: number,
    itemId: number,
  ) {
    setChecklists(
      (checklistsAtuais) =>
        checklistsAtuais.map(
          (checklistAtual) => {
            if (
              checklistAtual.id !==
              checklistId
            ) {
              return checklistAtual;
            }

            return {
              ...checklistAtual,

              itens:
                checklistAtual.itens.map(
                  (item) =>
                    item.id === itemId
                      ? {
                          ...item,
                          concluido:
                            !item.concluido,
                        }
                      : item,
                ),
            };
          },
        ),
    );
  }

  function iniciarNovoItem(
    checklistId: number,
  ) {
    setNovoItem("");

    setChecklistAdicionandoItemId(
      checklistId,
    );

    setCriandoChecklist(false);
    setTituloNovoChecklist("");
  }

  function cancelarNovoItem() {
    setNovoItem("");

    setChecklistAdicionandoItemId(
      null,
    );
  }

  function adicionarNovoItem(
    checklistId: number,
  ) {
    const textoLimpo = novoItem.trim();

    if (textoLimpo.length === 0) {
      return;
    }

    setChecklists(
      (checklistsAtuais) =>
        checklistsAtuais.map(
          (checklistAtual) => {
            if (
              checklistAtual.id !==
              checklistId
            ) {
              return checklistAtual;
            }

            const maiorId =
              checklistAtual.itens.reduce(
                (
                  maiorAtual,
                  item,
                ) =>
                  item.id > maiorAtual
                    ? item.id
                    : maiorAtual,
                0,
              );

            const novoChecklistItem: ChecklistItemData =
              {
                id: maiorId + 1,
                texto: textoLimpo,
                concluido: false,
              };

            return {
              ...checklistAtual,

              itens: [
                ...checklistAtual.itens,
                novoChecklistItem,
              ],
            };
          },
        ),
    );

    setNovoItem("");

    setChecklistAdicionandoItemId(
      null,
    );
  }

  function excluirItemChecklist(
    checklistId: number,
    itemId: number,
  ) {
    setChecklists(
      (checklistsAtuais) =>
        checklistsAtuais.map(
          (checklistAtual) => {
            if (
              checklistAtual.id !==
              checklistId
            ) {
              return checklistAtual;
            }

            return {
              ...checklistAtual,

              itens:
                checklistAtual.itens.filter(
                  (item) =>
                    item.id !== itemId,
                ),
            };
          },
        ),
    );
  }

  return {
    checklists,

    criandoChecklist,
    tituloNovoChecklist,
    setTituloNovoChecklist,
    tituloNovoChecklistRef,

    checklistAdicionandoItemId,

    novoItem,
    setNovoItem,
    novoItemInputRef,

    iniciarNovoChecklist,
    cancelarNovoChecklist,
    adicionarNovoChecklist,
    excluirChecklist,

    alternarItemChecklist,

    iniciarNovoItem,
    cancelarNovoItem,
    adicionarNovoItem,
    excluirItemChecklist,
  };
}