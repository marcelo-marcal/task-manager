"use client";

// ============================================================
// FX - MENU DE MAIS FORMATAÇÕES DO EDITOR DE TEXTO RICO
//
// Componente genérico e reutilizável.
//
// Não possui conhecimento sobre:
// - cartões;
// - comentários;
// - chat;
// - descrição.
//
// Ele apenas representa visualmente as opções de formatação
// que foram confirmadas pela engenharia reversa do Trello.
//
// A lógica real de seleção e aplicação das marcas ficará fora
// deste componente.
// ============================================================

// ============================================================
// TIPOS
// ============================================================

type RichTextMoreFormattingMenuProps = Readonly<{
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

export function RichTextMoreFormattingMenu({
  strikeDisabled = false,
  codeActive = false,
  clearFormattingDisabled = true,
  onStrike,
  onCode,
  onClearFormatting,
}: RichTextMoreFormattingMenuProps) {
  return (
    <div
      role="menu"
      aria-label="Mais formatações"
      className="
        absolute
        left-0
        top-full
        z-50
        mt-1
        w-[210px]
        overflow-hidden
        rounded-md
        border
        border-[var(--border)]
        bg-[var(--surface-secondary)]
        py-2
        shadow-lg
      "
    >
      {/* ====================================================
          TACHADO
      ==================================================== */}

      <FormattingMenuItem
        label="Tachado"
        shortcut="Ctrl+Shift+S"
        disabled={strikeDisabled}
        onClick={onStrike}
      />

      {/* ====================================================
          CÓDIGO
      ==================================================== */}

      <FormattingMenuItem
        label="Código"
        shortcut="Ctrl+Shift+M"
        active={codeActive}
        onClick={onCode}
      />

      {/* ====================================================
          SEPARADOR
      ==================================================== */}

      <div
        className="
          my-2
          h-px
          bg-[var(--border)]
        "
      />

      {/* ====================================================
          LIMPAR FORMATAÇÃO
      ==================================================== */}

      <FormattingMenuItem
        label="Limpar formatação"
        shortcut={"Ctrl+\\"}
        disabled={clearFormattingDisabled}
        onClick={onClearFormatting}
      />
    </div>
  );
}

// ============================================================
// ITEM DO MENU
//
// Mantido dentro deste arquivo porque, neste momento,
// pertence exclusivamente ao menu de formatações.
//
// Se futuramente outros menus utilizarem exatamente o mesmo
// padrão, poderemos promovê-lo para um componente genérico.
// ============================================================

type FormattingMenuItemProps = Readonly<{
  label: string;
  shortcut: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}>;

function FormattingMenuItem({
  label,
  shortcut,
  active = false,
  disabled = false,
  onClick,
}: FormattingMenuItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        justify-between
        gap-4
        px-4
        py-2
        text-left
        text-[13px]
        transition

        ${
          active
            ? "bg-[var(--surface-hover)] text-[var(--primary)]"
            : "text-[var(--text-secondary)]"
        }

        ${
          disabled
            ? "cursor-not-allowed opacity-40"
            : "hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
        }
      `}
    >
      <span>{label}</span>

      <kbd
        className="
          whitespace-nowrap
          rounded
          bg-[var(--surface-hover)]
          px-1.5
          py-0.5
          font-sans
          text-[10px]
          text-[var(--text-muted)]
        "
      >
        {shortcut}
      </kbd>
    </button>
  );
}