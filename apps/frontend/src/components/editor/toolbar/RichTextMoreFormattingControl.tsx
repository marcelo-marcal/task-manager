"use client";

// ============================================================
// FX - CONTROLE DE MAIS FORMATAÇÕES DO EDITOR
//
// Componente genérico responsável por:
//
// - exibir o botão "...";
// - abrir e fechar o menu;
// - manter o estado visual do botão;
// - preservar a seleção do editor ao abrir o menu;
// - fechar ao clicar novamente no botão;
// - fechar ao clicar fora;
// - fechar depois de executar uma opção.
//
// IMPORTANTE:
//
// O componente NÃO trata a tecla Escape.
//
// Pela engenharia reversa do Trello, o Escape pertence ao
// comportamento do modal/painel que contém o editor e pode
// fechar a interface maior inteira.
// ============================================================

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { MoreHorizontalIcon } from "@/components/icons/MoreHorizontalIcon";
import { Tooltip } from "@/components/ui/Tooltip";

import { RichTextMoreFormattingMenu } from "./RichTextMoreFormattingMenu";

// ============================================================
// TIPOS
// ============================================================

type RichTextMoreFormattingControlProps = Readonly<{
  strikeDisabled?: boolean;
  codeActive?: boolean;
  clearFormattingDisabled?: boolean;

  onStrike: () => void;
  onCode: () => void;
  onClearFormatting: () => void;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function RichTextMoreFormattingControl({
  strikeDisabled = false,
  codeActive = false,
  clearFormattingDisabled = true,
  onStrike,
  onCode,
  onClearFormatting,
}: RichTextMoreFormattingControlProps) {
  const [menuAberto, setMenuAberto] =
    useState(false);

  const controlRef =
    useRef<HTMLDivElement | null>(null);

  // ----------------------------------------------------------
  // FECHAR AO CLICAR FORA
  //
  // Comportamento confirmado no Trello.
  // ----------------------------------------------------------

  useEffect(() => {
    if (!menuAberto) {
      return;
    }

    function handlePointerDown(
      event: PointerEvent,
    ) {
      const alvo =
        event.target;

      if (!(alvo instanceof Node)) {
        return;
      }

      if (
        controlRef.current?.contains(alvo)
      ) {
        return;
      }

      setMenuAberto(false);
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, [menuAberto]);

  // ----------------------------------------------------------
  // PRESERVAR FOCO / SELEÇÃO DO EDITOR
  //
  // Um botão normal recebe foco no mousedown.
  //
  // Em uma toolbar de contentEditable isso pode fazer o
  // navegador abandonar a seleção/cursor que estava dentro
  // do editor antes de a ação da toolbar ser executada.
  //
  // Cancelamos somente o comportamento padrão do mousedown.
  //
  // O click continua acontecendo normalmente, portanto:
  //
  // - o menu continua abrindo;
  // - o menu continua fechando;
  // - navegação por teclado continua disponível;
  // - a seleção do editor permanece preservada.
  // ----------------------------------------------------------

  function preservarSelecaoDoEditor(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
  }

  // ----------------------------------------------------------
  // ALTERNAR MENU
  //
  // Clicar novamente no botão fecha o menu.
  // ----------------------------------------------------------

  function alternarMenu() {
    setMenuAberto(
      (estadoAtual) => !estadoAtual,
    );
  }

  // ----------------------------------------------------------
  // EXECUTAR TACHADO
  //
  // O Trello fecha o menu depois da ação.
  // ----------------------------------------------------------

  function executarTachado() {
    setMenuAberto(false);

    onStrike();
  }

  // ----------------------------------------------------------
  // EXECUTAR CÓDIGO
  // ----------------------------------------------------------

  function executarCodigo() {
    setMenuAberto(false);

    onCode();
  }

  // ----------------------------------------------------------
  // EXECUTAR LIMPAR FORMATAÇÃO
  // ----------------------------------------------------------

  function executarLimparFormatacao() {
    setMenuAberto(false);

    onClearFormatting();
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      ref={controlRef}
      className="relative"
    >
      {/* ====================================================
          BOTÃO
      ==================================================== */}

      <Tooltip
        content="Mais formatações"
        placement="top"
      >
        <button
          type="button"
          aria-label="Mais formatações"
          aria-haspopup="menu"
          aria-expanded={menuAberto}
          onMouseDown={
            preservarSelecaoDoEditor
          }
          onClick={alternarMenu}
          className={`
            flex
            h-7
            min-w-7
            items-center
            justify-center
            rounded
            px-1.5
            transition

            ${
              menuAberto
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
            }
          `}
        >
          <MoreHorizontalIcon />
        </button>
      </Tooltip>

      {/* ====================================================
          MENU
      ==================================================== */}

      {menuAberto && (
        <RichTextMoreFormattingMenu
          strikeDisabled={strikeDisabled}
          codeActive={codeActive}
          clearFormattingDisabled={
            clearFormattingDisabled
          }
          onStrike={executarTachado}
          onCode={executarCodigo}
          onClearFormatting={
            executarLimparFormatacao
          }
        />
      )}
    </div>
  );
}