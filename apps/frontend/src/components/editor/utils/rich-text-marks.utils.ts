// ============================================================
// FX - REGRAS GENÉRICAS DE FORMATAÇÃO DE TEXTO RICO
//
// Este arquivo concentra apenas regras de negócio das marcas
// de texto.
//
// Não possui dependência de cartões, comentários ou React.
// Assim poderá ser reutilizado futuramente em:
//
// - comentários;
// - descrição;
// - chat;
// - notas;
// - outros editores do sistema.
// ============================================================

import type { RichTextMark } from "../types/rich-text.types";

// ============================================================
// VERIFICAR SE UMA MARCA EXISTE
// ============================================================

export function possuiMarca(
  marcas: readonly RichTextMark[],
  marca: RichTextMark,
): boolean {
  return marcas.includes(marca);
}

// ============================================================
// VERIFICAR SE UMA MARCA PODE SER APLICADA
//
// Regras confirmadas por engenharia reversa do Trello:
//
// Quando um trecho está formatado como "code", não é possível
// aplicar:
//
// - bold;
// - italic;
// - strike.
//
// Entretanto, o caminho contrário é permitido:
//
// Se o trecho estiver em bold, italic ou strike, ainda é
// possível aplicar "code".
//
// Nesse caso, "code" substitui as outras formatações.
// ============================================================

export function podeAplicarMarca(
  marcas: readonly RichTextMark[],
  marca: RichTextMark,
): boolean {
  const possuiCodigo =
    possuiMarca(marcas, "code");

  const marcaIncompativelComCodigo =
    marca === "bold" ||
    marca === "italic" ||
    marca === "strike";

  if (
    possuiCodigo &&
    marcaIncompativelComCodigo
  ) {
    return false;
  }

  return true;
}

// ============================================================
// NORMALIZAR MARCAS
//
// Garante que combinações incompatíveis não permaneçam juntas.
//
// Regra confirmada no Trello:
//
// "code" é exclusivo em relação a:
//
// - bold;
// - italic;
// - strike.
//
// Exemplo:
//
// ["bold", "italic", "strike", "code"]
//
// torna-se:
//
// ["code"]
// ============================================================

export function normalizarMarcas(
  marcas: readonly RichTextMark[],
): RichTextMark[] {
  const marcasUnicas =
    Array.from(new Set(marcas));

  if (marcasUnicas.includes("code")) {
    return marcasUnicas.filter(
      (marca) =>
        marca !== "bold" &&
        marca !== "italic" &&
        marca !== "strike",
    );
  }

  return marcasUnicas;
}

// ============================================================
// ALTERNAR MARCA
//
// Se a marca já existe:
// → remove.
//
// Se não existe:
// → adiciona, respeitando as regras de compatibilidade.
//
// Exemplos:
//
// bold + italic
// → permitido.
//
// bold + strike
// → permitido.
//
// italic + strike
// → permitido.
//
// code + bold
// → bloqueado.
//
// code + italic
// → bloqueado.
//
// code + strike
// → bloqueado.
// ============================================================

export function alternarMarca(
  marcas: readonly RichTextMark[],
  marca: RichTextMark,
): RichTextMark[] {
  if (possuiMarca(marcas, marca)) {
    return marcas.filter(
      (marcaAtual) =>
        marcaAtual !== marca,
    );
  }

  if (!podeAplicarMarca(marcas, marca)) {
    return [...marcas];
  }

  return normalizarMarcas([
    ...marcas,
    marca,
  ]);
}

// ============================================================
// APLICAR CÓDIGO
//
// "code" possui comportamento exclusivo.
//
// Se já estiver aplicado:
// → remove apenas "code".
//
// Se ainda não estiver aplicado:
// → substitui as demais formatações por "code".
//
// Comportamento confirmado no Trello:
//
// bold
// italic
// strike
//
// ao receberem "code":
//
// → deixam de existir naquele trecho.
//
// O resultado passa a ser somente:
//
// ["code"]
// ============================================================

export function aplicarCodigo(
  marcas: readonly RichTextMark[],
): RichTextMark[] {
  if (possuiMarca(marcas, "code")) {
    return marcas.filter(
      (marca) =>
        marca !== "code",
    );
  }

  return ["code"];
}

// ============================================================
// LIMPAR FORMATAÇÃO
//
// Remove todas as marcas do trecho recebido.
//
// O editor será responsável por chamar esta função somente
// para os segmentos pertencentes à seleção atual.
//
// Comportamento confirmado no Trello:
//
// - sem seleção apropriada:
//   ação desabilitada;
//
// - com seleção formatada:
//   remove somente a formatação daquela seleção;
//
// - o restante do conteúdo permanece inalterado.
// ============================================================

export function limparMarcas(): RichTextMark[] {
  return [];
}