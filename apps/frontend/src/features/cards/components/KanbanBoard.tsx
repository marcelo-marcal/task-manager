"use client";

// ============================================================
// FX - KANBAN INTERATIVO
// ============================================================

import { useState } from "react";
import { CardModal } from "./CardModal";

// ============================================================
// TIPOS
// ============================================================

type Cartao = {
  titulo: string;
  empresa: string;
  checklist: string;
};

type Lista = {
  nome: string;
  quantidade: number;
  cartoes: Cartao[];
};

// ============================================================
// DADOS TEMPORÁRIOS
// ============================================================

const listas: Lista[] = [
  {
    nome: "Fiscal",
    quantidade: 2,
    cartoes: [
      {
        titulo: "01 - Conferência da importação da empresa Alfa",
        empresa: "Empresa Alfa",
        checklist: "4/6",
      },
      {
        titulo: "02 - Apuração de ICMS",
        empresa: "Empresa Beta",
        checklist: "5/6",
      },
    ],
  },
  {
    nome: "Parado",
    quantidade: 1,
    cartoes: [
      {
        titulo: "01 - Conferência da importação da empresa Gamma",
        empresa: "Empresa Gamma",
        checklist: "0/6",
      },
    ],
  },
  {
    nome: "Início",
    quantidade: 1,
    cartoes: [
      {
        titulo: "03 - Conferência da importação da empresa Delta",
        empresa: "Empresa Delta",
        checklist: "2/6",
      },
    ],
  },
  {
    nome: "Revisão",
    quantidade: 1,
    cartoes: [
      {
        titulo: "04 - Revisão contábil",
        empresa: "Empresa Omega",
        checklist: "3/6",
      },
    ],
  },
  {
    nome: "Concluído",
    quantidade: 2,
    cartoes: [
      {
        titulo: "01 - Conferência final da empresa Zeta",
        empresa: "Empresa Zeta",
        checklist: "6/6",
      },
      {
        titulo: "02 - Fechamento contábil",
        empresa: "Empresa Sigma",
        checklist: "6/6",
      },
    ],
  },
];

// ============================================================
// COMPONENTE
// ============================================================

export function KanbanBoard() {
  const [cartaoSelecionado, setCartaoSelecionado] =
    useState<Cartao | null>(null);

  return (
    <>
      <div
        className="
          flex
          h-[calc(100vh-96px)]
          gap-3
          overflow-x-auto
          overflow-y-hidden
          p-3
        "
      >
        {listas.map((lista) => (
          <section
            key={lista.nome}
            className="
              flex
              w-[272px]
              shrink-0
              flex-col
              rounded-lg
              bg-[#10160b]
              p-2
            "
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <h2 className="text-[13px] font-semibold">
                  {lista.nome}
                </h2>

                <span className="text-[11px] text-[var(--text-muted)]">
                  {lista.quantidade}
                </span>
              </div>

              <button
                type="button"
                className="
                  rounded
                  px-1.5
                  py-0.5
                  text-[13px]
                  text-[var(--text-secondary)]
                  hover:bg-white/10
                "
              >
                ...
              </button>
            </div>

            <div className="space-y-2">
              {lista.cartoes.map((cartao) => (
                <button
                  key={cartao.titulo}
                  type="button"
                  onClick={() => setCartaoSelecionado(cartao)}
                  className="
                    w-full
                    rounded-md
                    bg-[#24272d]
                    p-3
                    text-left
                    shadow-sm
                    transition
                    hover:bg-[#2b2f36]
                  "
                >
                  <p
                    className="
                      text-[13px]
                      leading-[1.35]
                      text-[var(--text-primary)]
                    "
                  >
                    {cartao.titulo}
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-[var(--text-muted)]
                    "
                  >
                    {cartao.empresa}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span
                      className="
                        rounded
                        bg-green-500/20
                        px-1.5
                        py-0.5
                        text-[10px]
                        font-medium
                        text-green-400
                      "
                    >
                      {cartao.checklist}
                    </span>

                    <div
                      className="
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-[var(--surface-secondary)]
                        text-[9px]
                        font-semibold
                      "
                    >
                      MA
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="
                mt-2
                rounded-md
                px-2
                py-2
                text-left
                text-[12px]
                text-[var(--text-secondary)]
                transition
                hover:bg-white/10
              "
            >
              + Adicionar um cartão
            </button>
          </section>
        ))}

        <button
          type="button"
          className="
            h-10
            w-[240px]
            shrink-0
            rounded-lg
            bg-white/20
            px-3
            text-left
            text-[13px]
            font-medium
            text-white
            transition
            hover:bg-white/25
          "
        >
          + Adicionar outra lista
        </button>
      </div>

      <CardModal
        aberto={cartaoSelecionado !== null}
        titulo={cartaoSelecionado?.titulo ?? ""}
        empresa={cartaoSelecionado?.empresa ?? ""}
        checklist={cartaoSelecionado?.checklist ?? ""}
        onClose={() => setCartaoSelecionado(null)}
      />
    </>
  );
}