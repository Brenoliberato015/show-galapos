# Banco de perguntas e progressão

O banco reúne as 20 perguntas originais e as 20 linhas do CSV fornecido pelo usuário. Cada pergunta possui ID estável, nível de dificuldade e conceito. A classificação individual e sua justificativa estão em `classificacao-perguntas.csv`.

Os níveis foram avaliados pelo esforço cognitivo: reconhecimento direto de conceitos (fácil), aplicação/distinção de conceitos e estruturação de propostas (intermediário), e detalhes de baremas, limites, recomendações percentuais ou relações entre maturidade e risco (difícil). Trata-se de classificação editorial inicial, sem calibração estatística com jogadores. O nome “difícil” do arquivo de entrada não determina o nível de todas as linhas.

São 8 perguntas fáceis, 24 intermediárias e 8 difíceis. As 16 rodadas seguem 4 fáceis, 7 intermediárias e 5 difíceis. O sorteio ocorre dentro de cada faixa e busca conceitos distintos. As alternativas são embaralhadas, preservando a resposta correta. As perguntas não utilizadas formam as reservas; pular mantém a dificuldade, consome uma reserva e não reutiliza um ID já selecionado. Variantes de um conceito podem aparecer quando não houver reservas de conceitos inéditos. O último desafio não permite pular, como antes.

Para manter os três pulos possíveis em qualquer faixa, o gerador exige no mínimo três reservas por nível. Ao editar o banco ou os tamanhos das etapas, preserve essa condição. O número de perguntas do banco e o número de rodadas são diferentes.

## Ajustes editoriais no conteúdo

- `original-12` e `csv-09`: removida a ideia de que ausência de P&D anterior deve ser ocultada ou é universalmente proibida. O histórico deve ser verdadeiro, com elegibilidade verificada no edital.
- `original-10` e `csv-06`: o percentual de participação de ICTs foi contextualizado como recomendação do material, não obrigação universal.
- `original-14`, `csv-01`, `csv-02` e `csv-03`: notas e limites foram vinculados ao barema considerado pelo material, sem apresentá-los como regra de todos os editais.
- `csv-17`: elegibilidade por TRL foi condicionada a uma chamada que efetivamente exija início em TRL 3.
- `csv-05`: o crescimento da exposição econômica foi associado ao cenário de protótipos e testes mais caros, sem afirmá-lo como lei geral.

Não foi fornecido o edital/guia de origem para validação independente dos baremas e percentuais. A classificação de dificuldade não certifica validade regulatória; confira esses detalhes com o material específico utilizado no treinamento.

## Ativação do áudio

O volume e o estado de silenciamento continuam salvos no navegador. A aplicação tenta ativar o contexto de áudio ao carregar e novamente a cada interação, sem depender de alteração na barrinha. O ganho mestre é reaplicado quando o contexto passa a funcionar ou retorna de uma suspensão; a música é retomada no modo atual.

Se a política de reprodução automática bloquear o áudio, a interface mostra “Ativar som”, e o primeiro clique/toque ou tecla válida retenta a ativação. O clique no próprio botão pendente ativa o áudio em vez de silenciá-lo. Essa implementação respeita o bloqueio do navegador: não há garantia de som antes da primeira interação quando a reprodução automática é proibida.
