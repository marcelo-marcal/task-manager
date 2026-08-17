// ============================================================
// FX - OPERAÇÕES GENÉRICAS SOBRE CONTEÚDO DE TEXTO RICO
//
// Responsável por manipular o conteúdo estruturado do editor.
//
// Não possui dependência de:
// - React;
// - cartões;
// - comentários;
// - toolbar;
// - interface;
// - DOM.
//
// As operações trabalham com posições absolutas no texto,
// permitindo:
// - aplicar formatação em seleções;
// - limpar formatação;
// - inserir texto em uma posição específica.
// ============================================================

import type {
  RichTextContent,
  RichTextMark,
  RichTextSegment,
  RichTextSelection,
} from "../types/rich-text.types";

import {
  aplicarCodigo,
  alternarMarca,
  limparMarcas,
} from "./rich-text-marks.utils";

// ============================================================
// CRIAR CONTEÚDO A PARTIR DE TEXTO SIMPLES
// ============================================================

export function criarRichTextContent(
  texto: string,
): RichTextContent {
  if (texto.length === 0) {
    return {
      segmentos: [],
    };
  }

  return {
    segmentos: [
      {
        texto,
        marcas: [],
      },
    ],
  };
}

// ============================================================
// CONVERTER CONTEÚDO RICO PARA TEXTO SIMPLES
// ============================================================

export function obterTextoPlano(
  conteudo: RichTextContent,
): string {
  return conteudo.segmentos
    .map((segmento) => segmento.texto)
    .join("");
}

// ============================================================
// NORMALIZAR SEGMENTOS
//
// Une segmentos vizinhos que possuem exatamente as mesmas
// marcas e remove segmentos vazios.
//
// Exemplo:
//
// "Tes" [bold]
// "te"  [bold]
//
// torna-se:
//
// "Teste" [bold]
// ============================================================

export function normalizarSegmentos(
  segmentos: readonly RichTextSegment[],
): RichTextSegment[] {
  const resultado: RichTextSegment[] =
    [];

  for (const segmento of segmentos) {
    if (
      segmento.texto.length === 0
    ) {
      continue;
    }

    const anterior =
      resultado[
        resultado.length - 1
      ];

    if (
      anterior &&
      possuemMesmasMarcas(
        anterior.marcas,
        segmento.marcas,
      )
    ) {
      resultado[
        resultado.length - 1
      ] = {
        texto:
          anterior.texto +
          segmento.texto,
        marcas: [
          ...anterior.marcas,
        ],
      };

      continue;
    }

    resultado.push({
      texto:
        segmento.texto,
      marcas: [
        ...segmento.marcas,
      ],
    });
  }

  return resultado;
}

// ============================================================
// INSERIR TEXTO EM POSIÇÃO ABSOLUTA
//
// Insere novo texto diretamente no modelo estruturado.
//
// Isso é importante porque NÃO dependemos da herança visual
// do DOM.
//
// Exemplo:
//
// conteúdo:
//
// "tachado" [strike]
//
// cursor:
//
// tacha|do
//
// inserir:
//
// "XXX" []
//
// resultado:
//
// "tacha" [strike]
// "XXX"   []
// "do"    [strike]
//
// O trecho original antes e depois do cursor continua com suas
// próprias marcas.
// ============================================================

export function inserirTextoNaPosicao(
  conteudo: RichTextContent,
  posicao: number,
  texto: string,
  marcas: readonly RichTextMark[],
): RichTextContent {
  if (
    texto.length === 0
  ) {
    return conteudo;
  }

  const tamanhoTotal =
    obterTextoPlano(
      conteudo,
    ).length;

  const posicaoNormalizada =
    Math.max(
      0,
      Math.min(
        posicao,
        tamanhoTotal,
      ),
    );

  // ----------------------------------------------------------
  // CONTEÚDO VAZIO
  // ----------------------------------------------------------

  if (
    conteudo.segmentos.length === 0
  ) {
    return {
      segmentos: [
        {
          texto,
          marcas: [
            ...marcas,
          ],
        },
      ],
    };
  }

  const novosSegmentos:
    RichTextSegment[] = [];

  let posicaoAtual =
    0;

  let inserido =
    false;

  for (
    const segmento
    of conteudo.segmentos
  ) {
    const inicioSegmento =
      posicaoAtual;

    const fimSegmento =
      inicioSegmento +
      segmento.texto.length;

    // --------------------------------------------------------
    // POSIÇÃO ESTÁ DENTRO DESTE SEGMENTO
    // --------------------------------------------------------

    if (
      !inserido &&
      posicaoNormalizada >=
        inicioSegmento &&
      posicaoNormalizada <=
        fimSegmento
    ) {
      const posicaoLocal =
        posicaoNormalizada -
        inicioSegmento;

      const textoAntes =
        segmento.texto.slice(
          0,
          posicaoLocal,
        );

      const textoDepois =
        segmento.texto.slice(
          posicaoLocal,
        );

      // ------------------------------------------------------
      // PARTE ORIGINAL ANTERIOR
      // ------------------------------------------------------

      if (
        textoAntes.length > 0
      ) {
        novosSegmentos.push({
          texto:
            textoAntes,
          marcas: [
            ...segmento.marcas,
          ],
        });
      }

      // ------------------------------------------------------
      // NOVO TEXTO
      // ------------------------------------------------------

      novosSegmentos.push({
        texto,
        marcas: [
          ...marcas,
        ],
      });

      // ------------------------------------------------------
      // PARTE ORIGINAL POSTERIOR
      // ------------------------------------------------------

      if (
        textoDepois.length > 0
      ) {
        novosSegmentos.push({
          texto:
            textoDepois,
          marcas: [
            ...segmento.marcas,
          ],
        });
      }

      inserido =
        true;

      posicaoAtual =
        fimSegmento;

      continue;
    }

    // --------------------------------------------------------
    // SEGMENTO NÃO AFETADO
    // --------------------------------------------------------

    novosSegmentos.push({
      texto:
        segmento.texto,
      marcas: [
        ...segmento.marcas,
      ],
    });

    posicaoAtual =
      fimSegmento;
  }

  // ----------------------------------------------------------
  // INSERÇÃO NO FINAL
  //
  // Em condições normais o último segmento já captura
  // posicao === tamanhoTotal.
  //
  // Mantemos esta proteção para o modelo continuar robusto.
  // ----------------------------------------------------------

  if (!inserido) {
    novosSegmentos.push({
      texto,
      marcas: [
        ...marcas,
      ],
    });
  }

  return {
    segmentos:
      normalizarSegmentos(
        novosSegmentos,
      ),
  };
}

// ============================================================
// APLICAR UMA MARCA À SELEÇÃO
//
// Divide automaticamente os segmentos quando a seleção ocupa
// somente parte deles.
// ============================================================

export function aplicarMarcaNaSelecao(
  conteudo: RichTextContent,
  selecao: RichTextSelection,
  marca: RichTextMark,
): RichTextContent {
  return transformarSelecao(
    conteudo,
    selecao,
    (marcas) =>
      alternarMarca(
        marcas,
        marca,
      ),
  );
}

// ============================================================
// APLICAR CÓDIGO À SELEÇÃO
//
// Código possui regras próprias:
//
// - remove bold;
// - remove italic;
// - remove strike;
// - torna-se a única marca do trecho.
// ============================================================

export function aplicarCodigoNaSelecao(
  conteudo: RichTextContent,
  selecao: RichTextSelection,
): RichTextContent {
  return transformarSelecao(
    conteudo,
    selecao,
    (marcas) =>
      aplicarCodigo(
        marcas,
      ),
  );
}

// ============================================================
// LIMPAR FORMATAÇÃO DA SELEÇÃO
// ============================================================

export function limparFormatacaoNaSelecao(
  conteudo: RichTextContent,
  selecao: RichTextSelection,
): RichTextContent {
  return transformarSelecao(
    conteudo,
    selecao,
    () =>
      limparMarcas(),
  );
}

// ============================================================
// TRANSFORMAR SELEÇÃO
//
// Motor interno utilizado pelas operações de formatação.
//
// As posições são absolutas considerando todo o texto,
// independentemente da quantidade de segmentos.
// ============================================================

function transformarSelecao(
  conteudo: RichTextContent,
  selecao: RichTextSelection,
  transformarMarcas: (
    marcas: readonly RichTextMark[],
  ) => RichTextMark[],
): RichTextContent {
  if (
    selecao.fim <=
    selecao.inicio
  ) {
    return conteudo;
  }

  const novosSegmentos:
    RichTextSegment[] = [];

  let posicaoAtual =
    0;

  for (
    const segmento
    of conteudo.segmentos
  ) {
    const inicioSegmento =
      posicaoAtual;

    const fimSegmento =
      inicioSegmento +
      segmento.texto.length;

    const inicioIntersecao =
      Math.max(
        selecao.inicio,
        inicioSegmento,
      );

    const fimIntersecao =
      Math.min(
        selecao.fim,
        fimSegmento,
      );

    const possuiIntersecao =
      inicioIntersecao <
      fimIntersecao;

    if (!possuiIntersecao) {
      novosSegmentos.push({
        texto:
          segmento.texto,
        marcas: [
          ...segmento.marcas,
        ],
      });

      posicaoAtual =
        fimSegmento;

      continue;
    }

    // --------------------------------------------------------
    // PARTE ANTERIOR À SELEÇÃO
    // --------------------------------------------------------

    const tamanhoAntes =
      inicioIntersecao -
      inicioSegmento;

    if (
      tamanhoAntes > 0
    ) {
      novosSegmentos.push({
        texto:
          segmento.texto.slice(
            0,
            tamanhoAntes,
          ),
        marcas: [
          ...segmento.marcas,
        ],
      });
    }

    // --------------------------------------------------------
    // PARTE SELECIONADA
    // --------------------------------------------------------

    const inicioLocal =
      inicioIntersecao -
      inicioSegmento;

    const fimLocal =
      fimIntersecao -
      inicioSegmento;

    novosSegmentos.push({
      texto:
        segmento.texto.slice(
          inicioLocal,
          fimLocal,
        ),
      marcas:
        transformarMarcas(
          segmento.marcas,
        ),
    });

    // --------------------------------------------------------
    // PARTE POSTERIOR À SELEÇÃO
    // --------------------------------------------------------

    const tamanhoDepois =
      fimSegmento -
      fimIntersecao;

    if (
      tamanhoDepois > 0
    ) {
      novosSegmentos.push({
        texto:
          segmento.texto.slice(
            fimLocal,
          ),
        marcas: [
          ...segmento.marcas,
        ],
      });
    }

    posicaoAtual =
      fimSegmento;
  }

  return {
    segmentos:
      normalizarSegmentos(
        novosSegmentos,
      ),
  };
}

// ============================================================
// COMPARAR MARCAS
// ============================================================

function possuemMesmasMarcas(
  marcasA: readonly RichTextMark[],
  marcasB: readonly RichTextMark[],
): boolean {
  if (
    marcasA.length !==
    marcasB.length
  ) {
    return false;
  }

  return marcasA.every(
    (marca) =>
      marcasB.includes(
        marca,
      ),
  );
}