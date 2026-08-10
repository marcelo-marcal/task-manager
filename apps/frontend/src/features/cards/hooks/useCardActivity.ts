"use client";

// ============================================================
// FX - HOOK DE COMENTÁRIOS E ATIVIDADES DO CARTÃO
// ============================================================

import { useState } from "react";

import type { CardActivityData } from "../types/card-activity.types";

// ============================================================
// ATIVIDADES TEMPORÁRIAS
// ============================================================

function criarAtividadesIniciais(): CardActivityData[] {
  return [
    {
      id: 1,
      tipo: "system",
      usuario: "Marcelo Assis",
      iniciais: "MA",
      horario: "há 1 hora",
      texto: "Início da conferência da tarefa.",
    },
    {
      id: 2,
      tipo: "system",
      usuario: "Marcelo Assis",
      iniciais: "MA",
      horario: "há 5 horas",
      texto: "Adicionou este cartão ao quadro Contábil.",
    },
  ];
}

// ============================================================
// HOOK
// ============================================================

export function useCardActivity() {
  const [atividades, setAtividades] =
    useState<CardActivityData[]>(
      criarAtividadesIniciais,
    );

  const [novoComentario, setNovoComentario] =
    useState("");

  // ----------------------------------------------------------
  // ADICIONAR COMENTÁRIO
  // ----------------------------------------------------------

  function adicionarComentario() {
    const comentarioLimpo =
      novoComentario.trim();

    if (comentarioLimpo.length === 0) {
      return;
    }

    setAtividades((atividadesAtuais) => {
      const maiorId =
        atividadesAtuais.reduce(
          (
            maiorAtual,
            atividadeAtual,
          ) =>
            atividadeAtual.id > maiorAtual
              ? atividadeAtual.id
              : maiorAtual,
          0,
        );

      const novaAtividade: CardActivityData = {
        id: maiorId + 1,
        tipo: "comment",
        usuario: "Marcelo Assis",
        iniciais: "MA",
        horario: "agora",
        texto: comentarioLimpo,
      };

      return [
        novaAtividade,
        ...atividadesAtuais,
      ];
    });

    setNovoComentario("");
  }

  return {
    atividades,

    novoComentario,
    setNovoComentario,

    adicionarComentario,
  };
}