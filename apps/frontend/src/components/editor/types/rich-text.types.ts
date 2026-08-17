// ============================================================
// FX - TIPOS GENÉRICOS DE TEXTO RICO
//
// Estes tipos não pertencem especificamente a cartões.
// Poderão ser reutilizados em:
//
// - comentários de cartões;
// - descrições;
// - chat;
// - atividades;
// - outros quadros;
// - futuras áreas com editor de texto.
// ============================================================

// ============================================================
// FORMATAÇÕES INLINE
// ============================================================

export type RichTextMark =
  | "bold"
  | "italic"
  | "strike"
  | "code";

// ============================================================
// TRECHO DE TEXTO
//
// Um texto pode possuir nenhuma, uma ou várias formatações.
//
// Exemplo:
//
// {
//   texto: "Marcelo",
//   marcas: ["bold", "italic"]
// }
// ============================================================

export type RichTextSegment = {
  texto: string;
  marcas: RichTextMark[];
};

// ============================================================
// CONTEÚDO DO EDITOR
//
// Por enquanto trabalharemos com uma sequência de trechos.
//
// Mais adiante este modelo poderá crescer para suportar:
// - links;
// - menções;
// - emojis;
// - listas;
// - imagens;
// - citações;
// - blocos de código.
//
// Sem precisar reescrever o editor inteiro.
// ============================================================

export type RichTextContent = {
  segmentos: RichTextSegment[];
};

// ============================================================
// SELEÇÃO DE TEXTO
//
// Representa uma seleção através de posições absolutas dentro
// do texto completo.
//
// Exemplo:
//
// Texto:
// "Teste de codigo"
//
// Seleção:
// "codigo"
//
// inicio = 9
// fim    = 15
//
// Este tipo é genérico e não depende de React, hooks ou de
// qualquer componente visual.
// ============================================================

export type RichTextSelection = Readonly<{
  inicio: number;
  fim: number;
}>;

// ============================================================
// ESTADO DO PONTO DE INSERÇÃO / CURSOR
//
// Representa o contexto atual do cursor quando NÃO existe
// necessariamente uma seleção de texto.
//
// Isso permite ao editor saber não somente:
// - onde o cursor está;
//
// mas também:
// - quais marcas estão ativas naquele ponto.
//
// Exemplo:
//
// Texto:
//
// "Teste de tachado"
//
// Cursor:
//
// "Teste de tacha|do"
//
// Estado:
//
// {
//   posicao: 14,
//   marcasAtivas: ["strike"]
// }
//
// Esse estado será utilizado pela toolbar para decidir:
// - quais botões ficam ativos;
// - quais botões ficam habilitados;
// - qual formatação deve ser usada na próxima digitação.
// ============================================================

export type RichTextCursorState = Readonly<{
  posicao: number;
  marcasAtivas: RichTextMark[];
}>;

// ============================================================
// ESTADO COMPLETO DA SELEÇÃO DO EDITOR
//
// Reúne:
//
// - intervalo selecionado;
// - posição/contexto atual do cursor.
//
// Isso evita que toolbar, comentários ou outros consumidores
// precisem descobrir diretamente detalhes do DOM.
//
// Exemplo 1:
//
// Texto selecionado:
//
// "Teste de [tachado]"
//
// selecao:
// {
//   inicio: 9,
//   fim: 16
// }
//
// cursor:
// {
//   posicao: 16,
//   marcasAtivas: ["strike"]
// }
//
// Exemplo 2:
//
// Apenas cursor:
//
// "Teste de tacha|do"
//
// selecao:
// {
//   inicio: 14,
//   fim: 14
// }
//
// cursor:
// {
//   posicao: 14,
//   marcasAtivas: ["strike"]
// }
// ============================================================

export type RichTextSelectionState = Readonly<{
  selecao: RichTextSelection;
  cursor: RichTextCursorState;
}>;