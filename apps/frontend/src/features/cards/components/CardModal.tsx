"use client";

// ============================================================
// FX - MODAL DO CARTÃO
// ============================================================

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

// ============================================================
// TIPOS
// ============================================================

type CardModalProps = Readonly<{
  aberto: boolean;
  titulo: string;
  empresa: string;
  checklist: string;
  onClose: () => void;
}>;

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
  // TÍTULO
  // ----------------------------------------------------------

  const [tituloAtual, setTituloAtual] = useState(titulo);
  const [tituloEdicao, setTituloEdicao] = useState(titulo);
  const [editandoTitulo, setEditandoTitulo] = useState(false);

  const tituloInputRef = useRef<HTMLTextAreaElement | null>(null);

  // ----------------------------------------------------------
  // SINCRONIZAR CARTÃO SELECIONADO
  // ----------------------------------------------------------

  useEffect(() => {
    setTituloAtual(titulo);
    setTituloEdicao(titulo);
    setEditandoTitulo(false);
  }, [titulo]);

  // ----------------------------------------------------------
  // FOCO AUTOMÁTICO AO EDITAR
  // ----------------------------------------------------------

  useEffect(() => {
    if (!editandoTitulo) {
      return;
    }

    tituloInputRef.current?.focus();
    tituloInputRef.current?.select();
  }, [editandoTitulo]);

  // ----------------------------------------------------------
  // SALVAR TÍTULO
  // ----------------------------------------------------------

  function salvarTitulo() {
    const tituloLimpo = tituloEdicao.trim();

    if (tituloLimpo.length === 0) {
      setTituloEdicao(tituloAtual);
      setEditandoTitulo(false);
      return;
    }

    setTituloAtual(tituloLimpo);
    setTituloEdicao(tituloLimpo);
    setEditandoTitulo(false);
  }

  // ----------------------------------------------------------
  // CANCELAR EDIÇÃO
  // ----------------------------------------------------------

  function cancelarEdicaoTitulo() {
    setTituloEdicao(tituloAtual);
    setEditandoTitulo(false);
  }

  // ----------------------------------------------------------
  // TECLADO DO TÍTULO
  // ----------------------------------------------------------

  function handleTituloKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelarEdicaoTitulo();
      return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      salvarTitulo();
    }
  }

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
            TOPO
            ==================================================== */}

        <header
          className="
            flex
            h-12
            shrink-0
            items-center
            justify-between
            border-b
            border-[var(--border)]
            px-4
          "
        >
          <button
            type="button"
            className="
              rounded-md
              bg-[var(--surface-secondary)]
              px-3
              py-1.5
              text-xs
              text-[var(--text-secondary)]
              transition
              hover:bg-[var(--surface-hover)]
              hover:text-[var(--text-primary)]
            "
          >
            Concluído
          </button>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-md
                text-[var(--text-secondary)]
                hover:bg-[var(--surface-hover)]
                hover:text-[var(--text-primary)]
              "
              aria-label="Mais ações"
            >
              •••
            </button>

            <button
              type="button"
              onClick={onClose}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-md
                text-lg
                text-[var(--text-secondary)]
                hover:bg-[var(--surface-hover)]
                hover:text-[var(--text-primary)]
              "
              aria-label="Fechar"
            >
              ×
            </button>
          </div>
        </header>

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
            {/* =================================================
                TÍTULO
                ================================================= */}

            {editandoTitulo ? (
              <textarea
                ref={tituloInputRef}
                value={tituloEdicao}
                onChange={(event) =>
                  setTituloEdicao(event.target.value)
                }
                onBlur={salvarTitulo}
                onKeyDown={handleTituloKeyDown}
                rows={3}
                aria-label="Editar título do cartão"
                className="
                  w-full
                  resize-none
                  rounded-md
                  border
                  border-[var(--primary)]
                  bg-[var(--surface-secondary)]
                  px-2
                  py-1.5
                  text-[26px]
                  font-semibold
                  leading-[1.15]
                  text-[var(--text-primary)]
                  outline-none
                  ring-2
                  ring-[var(--primary)]/20
                "
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  setTituloEdicao(tituloAtual);
                  setEditandoTitulo(true);
                }}
                className="
                  block
                  w-full
                  rounded-md
                  px-2
                  py-1.5
                  text-left
                  text-[26px]
                  font-semibold
                  leading-[1.15]
                  text-[var(--text-primary)]
                  transition
                  hover:bg-[var(--surface-hover)]
                "
                title="Clique para editar o título"
              >
                {tituloAtual}
              </button>
            )}

            {/* EMPRESA */}

            <p
              className="
                mt-2
                px-2
                text-[12px]
                text-[var(--text-muted)]
              "
            >
              {empresa}
            </p>

            {/* AÇÕES RÁPIDAS */}

            <div className="mt-5 flex flex-wrap gap-2">
              <QuickAction label="+ Adicionar" />
              <QuickAction label="Etiquetas" />
              <QuickAction label="Datas" />
              <QuickAction label="Checklist" />
            </div>

            {/* MEMBROS */}

            <div className="mt-6">
              <p className="text-[11px] font-semibold text-[var(--text-muted)]">
                Membros
              </p>

              <div className="mt-2 flex items-center gap-2">
                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--primary)]
                    text-[10px]
                    font-semibold
                    text-white
                  "
                >
                  MA
                </div>

                <button
                  type="button"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--border)]
                    text-lg
                    text-[var(--text-secondary)]
                    hover:bg-[var(--surface-hover)]
                  "
                >
                  +
                </button>
              </div>
            </div>

            {/* DESCRIÇÃO */}

            <div className="mt-7">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-semibold">
                  Descrição
                </h3>

                <button
                  type="button"
                  className="
                    rounded-md
                    border
                    border-[var(--border)]
                    px-3
                    py-1.5
                    text-xs
                    text-[var(--text-secondary)]
                    hover:bg-[var(--surface-hover)]
                  "
                >
                  Editar
                </button>
              </div>

              <div
                className="
                  mt-3
                  min-h-[90px]
                  rounded-md
                  bg-[var(--surface-secondary)]
                  p-3
                  text-[13px]
                  leading-6
                  text-[var(--text-secondary)]
                "
              >
                <p>{empresa}</p>

                <p className="mt-2">
                  Área reservada para descrição e orientações da tarefa.
                </p>
              </div>
            </div>

            {/* CHECKLIST VISUAL TEMPORÁRIO */}

            <div className="mt-7">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-semibold">
                  Checklist
                </h3>

                <span className="text-[11px] text-[var(--text-muted)]">
                  {checklist}
                </span>
              </div>

              <div
                className="
                  mt-3
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-[var(--surface-secondary)]
                "
              >
                <div
                  className="
                    h-full
                    w-2/3
                    rounded-full
                    bg-green-500
                  "
                />
              </div>

              <div className="mt-4 space-y-2">
                <ChecklistItem
                  label="Baixar documentos"
                  concluido
                />

                <ChecklistItem
                  label="Importar arquivos"
                  concluido
                />

                <ChecklistItem
                  label="Conferir informações"
                />
              </div>

              <button
                type="button"
                className="
                  mt-3
                  rounded-md
                  px-3
                  py-2
                  text-[12px]
                  text-[var(--text-secondary)]
                  hover:bg-[var(--surface-hover)]
                "
              >
                + Adicionar um item
              </button>
            </div>
          </div>

          {/* ==================================================
              LADO DIREITO
              ================================================== */}

          <div
            className="
              overflow-y-auto
              bg-[var(--background)]
              p-4
            "
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-semibold">
                Comentários e atividade
              </h3>

              <button
                type="button"
                className="
                  rounded-md
                  border
                  border-[var(--border)]
                  px-3
                  py-1.5
                  text-xs
                  text-[var(--text-secondary)]
                  hover:bg-[var(--surface-hover)]
                "
              >
                Mostrar detalhes
              </button>
            </div>

            <textarea
              placeholder="Escrever um comentário..."
              className="
                mt-3
                min-h-[42px]
                w-full
                resize-none
                rounded-md
                border
                border-[var(--border)]
                bg-[var(--surface-secondary)]
                px-3
                py-2
                text-[13px]
                text-[var(--text-primary)]
                outline-none
                placeholder:text-[var(--text-muted)]
                focus:border-[var(--primary)]
              "
            />

            <div className="mt-5 space-y-5">
              <ActivityItem
                usuario="Marcelo Assis"
                horario="há 1 hora"
                texto="Início da conferência da tarefa."
              />

              <ActivityItem
                usuario="Marcelo Assis"
                horario="há 5 horas"
                texto="Adicionou este cartão ao quadro Contábil."
              />
            </div>
          </div>
        </div>

        {/* ====================================================
            RODAPÉ
            ==================================================== */}

        <footer
          className="
            flex
            h-11
            shrink-0
            items-center
            justify-center
            gap-2
            border-t
            border-[var(--border)]
            bg-[var(--surface)]
          "
        >
          <FooterAction label="Integrações" />
          <FooterAction label="Automações" />
          <FooterAction label="Comentários" ativo />
        </footer>
      </section>
    </>
  );
}

// ============================================================
// AÇÃO RÁPIDA
// ============================================================

type QuickActionProps = Readonly<{
  label: string;
}>;

function QuickAction({ label }: QuickActionProps) {
  return (
    <button
      type="button"
      className="
        rounded-md
        border
        border-[var(--border)]
        bg-[var(--surface-secondary)]
        px-3
        py-1.5
        text-[12px]
        text-[var(--text-secondary)]
        transition
        hover:bg-[var(--surface-hover)]
        hover:text-[var(--text-primary)]
      "
    >
      {label}
    </button>
  );
}

// ============================================================
// ITEM DO CHECKLIST
// ============================================================

type ChecklistItemProps = Readonly<{
  label: string;
  concluido?: boolean;
}>;

function ChecklistItem({
  label,
  concluido = false,
}: ChecklistItemProps) {
  return (
    <label
      className="
        flex
        items-center
        gap-2
        rounded-md
        px-2
        py-1.5
        text-[12px]
        text-[var(--text-secondary)]
        hover:bg-[var(--surface-hover)]
      "
    >
      <input
        type="checkbox"
        checked={concluido}
        readOnly
        className="accent-green-500"
      />

      <span
        className={
          concluido
            ? "line-through opacity-70"
            : ""
        }
      >
        {label}
      </span>
    </label>
  );
}

// ============================================================
// ATIVIDADE
// ============================================================

type ActivityItemProps = Readonly<{
  usuario: string;
  horario: string;
  texto: string;
}>;

function ActivityItem({
  usuario,
  horario,
  texto,
}: ActivityItemProps) {
  return (
    <div className="flex gap-3">
      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[var(--primary)]
          text-[10px]
          font-semibold
          text-white
        "
      >
        MA
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-semibold">
            {usuario}
          </span>

          <span className="text-[10px] text-[var(--text-muted)]">
            {horario}
          </span>
        </div>

        <div
          className="
            mt-2
            rounded-md
            bg-[var(--surface-secondary)]
            p-3
            text-[12px]
            leading-5
            text-[var(--text-secondary)]
          "
        >
          {texto}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// AÇÃO DO RODAPÉ
// ============================================================

type FooterActionProps = Readonly<{
  label: string;
  ativo?: boolean;
}>;

function FooterAction({
  label,
  ativo = false,
}: FooterActionProps) {
  return (
    <button
      type="button"
      className={`
        rounded-md
        px-3
        py-1.5
        text-[12px]
        transition

        ${
          ativo
            ? "bg-blue-500/15 text-blue-400"
            : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
        }
      `}
    >
      {label}
    </button>
  );
}