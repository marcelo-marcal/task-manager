"use client";

// ============================================================
// FX - BARRA DO EDITOR DE COMENTÁRIOS
//
// A barra utiliza componentes genéricos do editor sempre que
// o comportamento puder ser reutilizado em outras áreas.
//
// A toolbar NÃO altera diretamente o conteúdo do editor.
//
// Ela apenas comunica as ações executadas pelo usuário para
// o componente responsável pelo conteúdo.
//
// A implementação das funções está sendo feita gradualmente,
// seguindo a engenharia reversa do Trello.
// ============================================================

import { RichTextMoreFormattingControl } from "@/components/editor/toolbar/RichTextMoreFormattingControl";
import { BoldIcon } from "@/components/icons/BoldIcon";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { HelpCircleIcon } from "@/components/icons/HelpCircleIcon";
import { ItalicIcon } from "@/components/icons/ItalicIcon";
import { ListIcon } from "@/components/icons/ListIcon";
import { PaperclipIcon } from "@/components/icons/PaperclipIcon";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { TextStyleIcon } from "@/components/icons/TextStyleIcon";

// ============================================================
// TIPOS
// ============================================================

type CommentEditorToolbarProps = Readonly<{
  onStrike: () => void;
  strikeDisabled?: boolean;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function CommentEditorToolbar({
  onStrike,
  strikeDisabled = false,
}: CommentEditorToolbarProps) {
  // ----------------------------------------------------------
  // CÓDIGO
  //
  // Ainda não conectado nesta etapa.
  // Será implementado somente depois que Tachado estiver
  // completamente funcional e validado.
  // ----------------------------------------------------------

  function aplicarCodigo() {
    return;
  }

  // ----------------------------------------------------------
  // LIMPAR FORMATAÇÃO
  //
  // Ainda não conectado nesta etapa.
  // ----------------------------------------------------------

  function limparFormatacao() {
    return;
  }

  return (
    <div
      className="
        flex
        h-10
        items-center
        gap-1
        border-b
        border-[var(--border)]
        px-2
      "
    >
      {/* ====================================================
          ESTILO DE TEXTO
      ==================================================== */}

      <ToolbarIconButton
        title="Estilo de texto"
        icon={
          <span className="flex items-center gap-0.5">
            <TextStyleIcon />
            <ChevronDownIcon />
          </span>
        }
      />

      {/* ====================================================
          NEGRITO
      ==================================================== */}

      <ToolbarIconButton
        title="Negrito"
        icon={<BoldIcon />}
      />

      {/* ====================================================
          ITÁLICO
      ==================================================== */}

      <ToolbarIconButton
        title="Itálico"
        icon={<ItalicIcon />}
      />

      {/* ====================================================
          MAIS FORMATAÇÕES

          Nesta etapa:
          - Tachado já comunica a ação ao editor;
          - Código ainda será implementado;
          - Limpar formatação ainda será implementado.

          Comportamentos do controle já implementados:
          - abre ao clicar;
          - fecha clicando novamente;
          - fecha clicando fora;
          - não captura Escape.
      ==================================================== */}

      <RichTextMoreFormattingControl
        strikeDisabled={strikeDisabled}
        codeActive={false}
        clearFormattingDisabled
        onStrike={onStrike}
        onCode={aplicarCodigo}
        onClearFormatting={
          limparFormatacao
        }
      />

      <div
        className="
          mx-1
          h-5
          w-px
          bg-[var(--border)]
        "
      />

      {/* ====================================================
          LISTAS
      ==================================================== */}

      <ToolbarIconButton
        title="Listas"
        icon={
          <span className="flex items-center gap-0.5">
            <ListIcon />
            <ChevronDownIcon />
          </span>
        }
      />

      <div
        className="
          mx-1
          h-5
          w-px
          bg-[var(--border)]
        "
      />

      {/* ====================================================
          INSERIR
      ==================================================== */}

      <ToolbarIconButton
        title="Inserir"
        icon={
          <span className="flex items-center gap-0.5">
            <PlusIcon />
            <ChevronDownIcon />
          </span>
        }
      />

      <div className="flex-1" />

      {/* ====================================================
          ANEXAR
      ==================================================== */}

      <ToolbarIconButton
        title="Anexar"
        icon={<PaperclipIcon />}
      />

      {/* ====================================================
          AJUDA
      ==================================================== */}

      <ToolbarIconButton
        title="Ajuda"
        icon={<HelpCircleIcon />}
      />
    </div>
  );
}

// ============================================================
// BOTÃO COM ÍCONE DA TOOLBAR
//
// Componente local utilizado pelos controles que ainda não
// possuem um comportamento genérico próprio.
//
// Conforme avançarmos na engenharia reversa, outros controles
// poderão ser promovidos para componentes reutilizáveis do
// editor.
// ============================================================

type ToolbarIconButtonProps = Readonly<{
  title: string;
  icon: React.ReactNode;
}>;

function ToolbarIconButton({
  title,
  icon,
}: ToolbarIconButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      className="
        flex
        h-7
        min-w-7
        items-center
        justify-center
        rounded
        px-1.5
        text-[var(--text-secondary)]
        transition
        hover:bg-[var(--surface-hover)]
        hover:text-[var(--text-primary)]
      "
    >
      {icon}
    </button>
  );
}