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

type ChecklistItemData = {
  id: number;
  texto: string;
  concluido: boolean;
};

type ChecklistData = {
  id: number;
  titulo: string;
  itens: ChecklistItemData[];
};

// ============================================================
// CHECKLISTS INICIAIS TEMPORÁRIOS
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

  const tituloInputRef =
    useRef<HTMLTextAreaElement | null>(null);

  // ----------------------------------------------------------
  // DESCRIÇÃO
  // ----------------------------------------------------------

  const descricaoInicial =
    `${empresa}\n\nÁrea reservada para descrição e orientações da tarefa.`;

  const [descricaoAtual, setDescricaoAtual] =
    useState(descricaoInicial);

  const [descricaoEdicao, setDescricaoEdicao] =
    useState(descricaoInicial);

  const [editandoDescricao, setEditandoDescricao] =
    useState(false);

  // ----------------------------------------------------------
  // CHECKLISTS
  // ----------------------------------------------------------

  const [checklists, setChecklists] =
    useState<ChecklistData[]>(criarChecklistsIniciais);

  // ----------------------------------------------------------
  // CRIAÇÃO DE NOVO CHECKLIST
  // ----------------------------------------------------------

  const [criandoChecklist, setCriandoChecklist] =
    useState(false);

  const [tituloNovoChecklist, setTituloNovoChecklist] =
    useState("");

  const tituloNovoChecklistRef =
    useRef<HTMLInputElement | null>(null);

  // ----------------------------------------------------------
  // ADIÇÃO DE ITEM
  // Guarda o ID do checklist que está recebendo um novo item.
  // ----------------------------------------------------------

  const [checklistAdicionandoItemId, setChecklistAdicionandoItemId] =
    useState<number | null>(null);

  const [novoItem, setNovoItem] =
    useState("");

  const novoItemInputRef =
    useRef<HTMLInputElement | null>(null);

  // ----------------------------------------------------------
  // SINCRONIZAR CARTÃO SELECIONADO
  // ----------------------------------------------------------

  useEffect(() => {
    setTituloAtual(titulo);
    setTituloEdicao(titulo);
    setEditandoTitulo(false);

    const novaDescricao =
      `${empresa}\n\nÁrea reservada para descrição e orientações da tarefa.`;

    setDescricaoAtual(novaDescricao);
    setDescricaoEdicao(novaDescricao);
    setEditandoDescricao(false);

    // --------------------------------------------------------
    // TEMPORÁRIO:
    // Enquanto não houver persistência, cada cartão recebe
    // novamente os checklists de demonstração ao ser aberto.
    // --------------------------------------------------------

    setChecklists(criarChecklistsIniciais());

    setCriandoChecklist(false);
    setTituloNovoChecklist("");

    setChecklistAdicionandoItemId(null);
    setNovoItem("");
  }, [titulo, empresa, checklist]);

  // ----------------------------------------------------------
  // FOCO AUTOMÁTICO AO EDITAR TÍTULO
  // ----------------------------------------------------------

  useEffect(() => {
    if (!editandoTitulo) {
      return;
    }

    tituloInputRef.current?.focus();
    tituloInputRef.current?.select();
  }, [editandoTitulo]);

  // ----------------------------------------------------------
  // FOCO AUTOMÁTICO AO CRIAR CHECKLIST
  // ----------------------------------------------------------

  useEffect(() => {
    if (!criandoChecklist) {
      return;
    }

    tituloNovoChecklistRef.current?.focus();
  }, [criandoChecklist]);

  // ----------------------------------------------------------
  // FOCO AUTOMÁTICO AO ADICIONAR ITEM
  // ----------------------------------------------------------

  useEffect(() => {
    if (checklistAdicionandoItemId === null) {
      return;
    }

    novoItemInputRef.current?.focus();
  }, [checklistAdicionandoItemId]);

  // ==========================================================
  // TÍTULO
  // ==========================================================

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
  // CANCELAR EDIÇÃO DO TÍTULO
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

  // ==========================================================
  // DESCRIÇÃO
  // ==========================================================

  // ----------------------------------------------------------
  // INICIAR EDIÇÃO
  // ----------------------------------------------------------

  function iniciarEdicaoDescricao() {
    setDescricaoEdicao(descricaoAtual);
    setEditandoDescricao(true);
  }

  // ----------------------------------------------------------
  // SALVAR DESCRIÇÃO
  // ----------------------------------------------------------

  function salvarDescricao() {
    const descricaoLimpa = descricaoEdicao.trim();

    setDescricaoAtual(descricaoLimpa);
    setDescricaoEdicao(descricaoLimpa);
    setEditandoDescricao(false);
  }

  // ----------------------------------------------------------
  // CANCELAR EDIÇÃO
  // ----------------------------------------------------------

  function cancelarEdicaoDescricao() {
    setDescricaoEdicao(descricaoAtual);
    setEditandoDescricao(false);
  }

  // ----------------------------------------------------------
  // TECLADO DA DESCRIÇÃO
  // ----------------------------------------------------------

  function handleDescricaoKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelarEdicaoDescricao();
    }
  }

  // ==========================================================
  // CHECKLISTS
  // ==========================================================

  // ----------------------------------------------------------
  // ABRIR CRIAÇÃO DE CHECKLIST
  // ----------------------------------------------------------

  function iniciarNovoChecklist() {
    setTituloNovoChecklist("");
    setCriandoChecklist(true);

    setChecklistAdicionandoItemId(null);
    setNovoItem("");
  }

  // ----------------------------------------------------------
  // CANCELAR NOVO CHECKLIST
  // ----------------------------------------------------------

  function cancelarNovoChecklist() {
    setTituloNovoChecklist("");
    setCriandoChecklist(false);
  }

  // ----------------------------------------------------------
  // CRIAR NOVO CHECKLIST
  // ----------------------------------------------------------

  function adicionarNovoChecklist() {
    const tituloLimpo = tituloNovoChecklist.trim();

    if (tituloLimpo.length === 0) {
      return;
    }

    setChecklists((checklistsAtuais) => {
      const maiorId = checklistsAtuais.reduce(
        (maiorAtual, checklistAtual) =>
          checklistAtual.id > maiorAtual
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

  // ----------------------------------------------------------
  // TECLADO DO NOVO CHECKLIST
  // ----------------------------------------------------------

  function handleNovoChecklistKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelarNovoChecklist();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      adicionarNovoChecklist();
    }
  }

  // ----------------------------------------------------------
  // EXCLUIR CHECKLIST
  // ----------------------------------------------------------

  function excluirChecklist(checklistId: number) {
    setChecklists((checklistsAtuais) =>
      checklistsAtuais.filter(
        (checklistAtual) =>
          checklistAtual.id !== checklistId,
      ),
    );

    if (checklistAdicionandoItemId === checklistId) {
      setChecklistAdicionandoItemId(null);
      setNovoItem("");
    }
  }

  // ----------------------------------------------------------
  // MARCAR / DESMARCAR ITEM
  // ----------------------------------------------------------

  function alternarItemChecklist(
    checklistId: number,
    itemId: number,
  ) {
    setChecklists((checklistsAtuais) =>
      checklistsAtuais.map((checklistAtual) => {
        if (checklistAtual.id !== checklistId) {
          return checklistAtual;
        }

        return {
          ...checklistAtual,
          itens: checklistAtual.itens.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  concluido: !item.concluido,
                }
              : item,
          ),
        };
      }),
    );
  }

  // ----------------------------------------------------------
  // ABRIR CAMPO PARA NOVO ITEM
  // ----------------------------------------------------------

  function iniciarNovoItem(checklistId: number) {
    setNovoItem("");
    setChecklistAdicionandoItemId(checklistId);

    setCriandoChecklist(false);
    setTituloNovoChecklist("");
  }

  // ----------------------------------------------------------
  // CANCELAR NOVO ITEM
  // ----------------------------------------------------------

  function cancelarNovoItem() {
    setNovoItem("");
    setChecklistAdicionandoItemId(null);
  }

  // ----------------------------------------------------------
  // ADICIONAR NOVO ITEM
  // ----------------------------------------------------------

  function adicionarNovoItem(checklistId: number) {
    const textoLimpo = novoItem.trim();

    if (textoLimpo.length === 0) {
      return;
    }

    setChecklists((checklistsAtuais) =>
      checklistsAtuais.map((checklistAtual) => {
        if (checklistAtual.id !== checklistId) {
          return checklistAtual;
        }

        const maiorId = checklistAtual.itens.reduce(
          (maiorAtual, item) =>
            item.id > maiorAtual
              ? item.id
              : maiorAtual,
          0,
        );

        const novoChecklistItem: ChecklistItemData = {
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
      }),
    );

    setNovoItem("");
    setChecklistAdicionandoItemId(null);
  }

  // ----------------------------------------------------------
  // TECLADO DO NOVO ITEM
  // ----------------------------------------------------------

  function handleNovoItemKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    checklistId: number,
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelarNovoItem();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      adicionarNovoItem(checklistId);
    }
  }

  // ----------------------------------------------------------
  // EXCLUIR ITEM
  // ----------------------------------------------------------

  function excluirItemChecklist(
    checklistId: number,
    itemId: number,
  ) {
    setChecklists((checklistsAtuais) =>
      checklistsAtuais.map((checklistAtual) => {
        if (checklistAtual.id !== checklistId) {
          return checklistAtual;
        }

        return {
          ...checklistAtual,
          itens: checklistAtual.itens.filter(
            (item) => item.id !== itemId,
          ),
        };
      }),
    );
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

            {/* =================================================
                AÇÕES RÁPIDAS
                ================================================= */}

            <div className="mt-5 flex flex-wrap gap-2">
              <QuickAction label="+ Adicionar" />

              <QuickAction label="Etiquetas" />

              <QuickAction label="Datas" />

              <QuickAction
                label="Checklist"
                onClick={iniciarNovoChecklist}
              />
            </div>

            {/* =================================================
                CRIAR NOVO CHECKLIST
                ================================================= */}

            {criandoChecklist && (
              <div
                className="
                  mt-3
                  rounded-md
                  border
                  border-[var(--border)]
                  bg-[var(--surface-secondary)]
                  p-3
                "
              >
                <p
                  className="
                    mb-2
                    text-[12px]
                    font-semibold
                    text-[var(--text-primary)]
                  "
                >
                  Adicionar checklist
                </p>

                <input
                  ref={tituloNovoChecklistRef}
                  type="text"
                  value={tituloNovoChecklist}
                  onChange={(event) =>
                    setTituloNovoChecklist(event.target.value)
                  }
                  onKeyDown={handleNovoChecklistKeyDown}
                  placeholder="Título do checklist"
                  aria-label="Título do novo checklist"
                  className="
                    h-9
                    w-full
                    rounded-md
                    border
                    border-[var(--border)]
                    bg-[var(--background)]
                    px-3
                    text-[12px]
                    text-[var(--text-primary)]
                    outline-none
                    placeholder:text-[var(--text-muted)]
                    focus:border-[var(--primary)]
                  "
                />

                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={adicionarNovoChecklist}
                    disabled={
                      tituloNovoChecklist.trim().length === 0
                    }
                    className="
                      rounded-md
                      bg-[var(--primary)]
                      px-3
                      py-1.5
                      text-[12px]
                      font-medium
                      text-white
                      transition
                      hover:bg-[var(--primary-hover)]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    Adicionar
                  </button>

                  <button
                    type="button"
                    onClick={cancelarNovoChecklist}
                    className="
                      rounded-md
                      px-3
                      py-1.5
                      text-[12px]
                      text-[var(--text-secondary)]
                      transition
                      hover:bg-[var(--surface-hover)]
                    "
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* =================================================
                MEMBROS
                ================================================= */}

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

            {/* =================================================
                DESCRIÇÃO
                ================================================= */}

            <div className="mt-7">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-semibold">
                  Descrição
                </h3>

                {!editandoDescricao && (
                  <button
                    type="button"
                    onClick={iniciarEdicaoDescricao}
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
                )}
              </div>

              {editandoDescricao ? (
                <div className="mt-3">
                  <textarea
                    value={descricaoEdicao}
                    onChange={(event) =>
                      setDescricaoEdicao(event.target.value)
                    }
                    onKeyDown={handleDescricaoKeyDown}
                    rows={7}
                    autoFocus
                    aria-label="Editar descrição do cartão"
                    className="
                      w-full
                      resize-y
                      rounded-md
                      border
                      border-[var(--primary)]
                      bg-[var(--surface-secondary)]
                      p-3
                      text-[13px]
                      leading-6
                      text-[var(--text-primary)]
                      outline-none
                      ring-2
                      ring-[var(--primary)]/20
                    "
                  />

                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={salvarDescricao}
                      className="
                        rounded-md
                        bg-[var(--primary)]
                        px-3
                        py-1.5
                        text-[12px]
                        font-medium
                        text-white
                        transition
                        hover:bg-[var(--primary-hover)]
                      "
                    >
                      Salvar
                    </button>

                    <button
                      type="button"
                      onClick={cancelarEdicaoDescricao}
                      className="
                        rounded-md
                        px-3
                        py-1.5
                        text-[12px]
                        text-[var(--text-secondary)]
                        transition
                        hover:bg-[var(--surface-hover)]
                      "
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={iniciarEdicaoDescricao}
                  className="
                    mt-3
                    min-h-[90px]
                    w-full
                    whitespace-pre-wrap
                    rounded-md
                    bg-[var(--surface-secondary)]
                    p-3
                    text-left
                    text-[13px]
                    leading-6
                    text-[var(--text-secondary)]
                    transition
                    hover:bg-[var(--surface-hover)]
                  "
                >
                  {descricaoAtual.length > 0
                    ? descricaoAtual
                    : "Adicionar uma descrição..."}
                </button>
              )}
            </div>

            {/* =================================================
                CHECKLISTS
                ================================================= */}

            <div className="mt-7 space-y-8">
              {checklists.map((checklistAtual) => {
                const totalItens =
                  checklistAtual.itens.length;

                const totalConcluidos =
                  checklistAtual.itens.filter(
                    (item) => item.concluido,
                  ).length;

                const percentual =
                  totalItens === 0
                    ? 0
                    : Math.round(
                        (totalConcluidos / totalItens) * 100,
                      );

                return (
                  <section
                    key={checklistAtual.id}
                    className="
                      border-t
                      border-[var(--border)]
                      pt-5
                      first:border-t-0
                      first:pt-0
                    "
                  >
                    {/* =========================================
                        CABEÇALHO
                        ========================================= */}

                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h3
                          className="
                            truncate
                            text-[14px]
                            font-semibold
                          "
                        >
                          {checklistAtual.titulo}
                        </h3>

                        <p
                          className="
                            mt-0.5
                            text-[10px]
                            text-[var(--text-muted)]
                          "
                        >
                          {totalConcluidos}/{totalItens} concluídos
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          excluirChecklist(checklistAtual.id)
                        }
                        className="
                          shrink-0
                          rounded-md
                          px-2.5
                          py-1.5
                          text-[11px]
                          text-[var(--text-muted)]
                          transition
                          hover:bg-red-500/10
                          hover:text-red-400
                        "
                      >
                        Excluir
                      </button>
                    </div>

                    {/* =========================================
                        PROGRESSO
                        ========================================= */}

                    <div className="mt-3 flex items-center gap-3">
                      <span
                        className="
                          w-8
                          shrink-0
                          text-[11px]
                          text-[var(--text-muted)]
                        "
                      >
                        {percentual}%
                      </span>

                      <div
                        className="
                          h-2
                          flex-1
                          overflow-hidden
                          rounded-full
                          bg-[var(--surface-secondary)]
                        "
                      >
                        <div
                          className="
                            h-full
                            rounded-full
                            bg-green-500
                            transition-[width]
                            duration-200
                          "
                          style={{
                            width: `${percentual}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* =========================================
                        ITENS
                        ========================================= */}

                    <div className="mt-4 space-y-1">
                      {checklistAtual.itens.map((item) => (
                        <ChecklistItem
                          key={item.id}
                          item={item}
                          onToggle={() =>
                            alternarItemChecklist(
                              checklistAtual.id,
                              item.id,
                            )
                          }
                          onDelete={() =>
                            excluirItemChecklist(
                              checklistAtual.id,
                              item.id,
                            )
                          }
                        />
                      ))}
                    </div>

                    {/* =========================================
                        CHECKLIST VAZIO
                        ========================================= */}

                    {totalItens === 0 && (
                      <div
                        className="
                          mt-3
                          rounded-md
                          border
                          border-dashed
                          border-[var(--border)]
                          px-3
                          py-4
                          text-center
                          text-[12px]
                          text-[var(--text-muted)]
                        "
                      >
                        Nenhum item adicionado.
                      </div>
                    )}

                    {/* =========================================
                        ADICIONAR ITEM
                        ========================================= */}

                    {checklistAdicionandoItemId ===
                    checklistAtual.id ? (
                      <div
                        className="
                          mt-3
                          rounded-md
                          border
                          border-[var(--border)]
                          bg-[var(--surface-secondary)]
                          p-3
                        "
                      >
                        <input
                          ref={novoItemInputRef}
                          type="text"
                          value={novoItem}
                          onChange={(event) =>
                            setNovoItem(event.target.value)
                          }
                          onKeyDown={(event) =>
                            handleNovoItemKeyDown(
                              event,
                              checklistAtual.id,
                            )
                          }
                          placeholder="Adicionar um item..."
                          aria-label={`Novo item de ${checklistAtual.titulo}`}
                          className="
                            h-9
                            w-full
                            rounded-md
                            border
                            border-[var(--border)]
                            bg-[var(--background)]
                            px-3
                            text-[12px]
                            text-[var(--text-primary)]
                            outline-none
                            placeholder:text-[var(--text-muted)]
                            focus:border-[var(--primary)]
                          "
                        />

                        <div className="mt-2 flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              adicionarNovoItem(
                                checklistAtual.id,
                              )
                            }
                            disabled={
                              novoItem.trim().length === 0
                            }
                            className="
                              rounded-md
                              bg-[var(--primary)]
                              px-3
                              py-1.5
                              text-[12px]
                              font-medium
                              text-white
                              transition
                              hover:bg-[var(--primary-hover)]
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >
                            Adicionar
                          </button>

                          <button
                            type="button"
                            onClick={cancelarNovoItem}
                            className="
                              rounded-md
                              px-3
                              py-1.5
                              text-[12px]
                              text-[var(--text-secondary)]
                              transition
                              hover:bg-[var(--surface-hover)]
                            "
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          iniciarNovoItem(checklistAtual.id)
                        }
                        className="
                          mt-3
                          rounded-md
                          px-3
                          py-2
                          text-[12px]
                          text-[var(--text-secondary)]
                          transition
                          hover:bg-[var(--surface-hover)]
                        "
                      >
                        + Adicionar um item
                      </button>
                    )}
                  </section>
                );
              })}

              {/* ===============================================
                  SEM CHECKLISTS
                  =============================================== */}

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
                    onClick={iniciarNovoChecklist}
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
  onClick?: () => void;
}>;

function QuickAction({
  label,
  onClick,
}: QuickActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
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
  item: ChecklistItemData;
  onToggle: () => void;
  onDelete: () => void;
}>;

function ChecklistItem({
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