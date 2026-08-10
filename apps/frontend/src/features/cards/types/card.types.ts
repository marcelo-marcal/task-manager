// ============================================================
// FX - TIPOS DOS CARTÕES
// ============================================================

// ============================================================
// PROPRIEDADES DO MODAL DO CARTÃO
// ============================================================

export type CardModalProps = Readonly<{
  aberto: boolean;
  titulo: string;
  empresa: string;
  checklist: string;
  onClose: () => void;
}>;

// ============================================================
// ITEM DE CHECKLIST
// ============================================================

export type ChecklistItemData = {
  id: number;
  texto: string;
  concluido: boolean;
};

// ============================================================
// CHECKLIST DO CARTÃO
// ============================================================

export type ChecklistData = {
  id: number;
  titulo: string;
  itens: ChecklistItemData[];
};