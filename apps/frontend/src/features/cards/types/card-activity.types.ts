// ============================================================
// FX - TIPOS DE COMENTÁRIOS E ATIVIDADES DO CARTÃO
// ============================================================

export type CardActivityType =
  | "comment"
  | "system";

// ============================================================
// ATIVIDADE DO CARTÃO
// ============================================================

export type CardActivityData = {
  id: number;
  tipo: CardActivityType;
  usuario: string;
  iniciais: string;
  horario: string;
  texto: string;
};