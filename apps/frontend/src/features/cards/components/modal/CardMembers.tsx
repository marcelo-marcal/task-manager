"use client";

// ============================================================
// FX - MEMBROS DO CARTÃO
// ============================================================

export function CardMembers() {
  return (
    <div className="mt-6">
      <p className="text-[11px] font-semibold text-[var(--text-muted)]">
        Membros
      </p>

      <div className="mt-2 flex items-center gap-2">
        {/* ====================================================
            AVATAR TEMPORÁRIO
        ==================================================== */}

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

        {/* ====================================================
            ADICIONAR MEMBRO
        ==================================================== */}

        <button
          type="button"
          aria-label="Adicionar membro"
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
            transition
            hover:bg-[var(--surface-hover)]
          "
        >
          +
        </button>
      </div>
    </div>
  );
}