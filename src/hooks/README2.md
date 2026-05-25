  README — REFATORAÇÃO DO HOOK useTasks.ts
 
  PONTO 1 — ELIMINAÇÃO DE CÓDIGO DUPLICADO
  -----------------------------------------
  PROBLEMA:
    createTask e updateTask tinham blocos praticamente idênticos:
    validação de título vazio, setSubmitting(true/false), setError(null),
    tratamento de erro de rede e retorno boolean. Qualquer correção
    precisava ser feita em dois lugares.
 
  SOLUÇÃO:
    Criada a função auxiliar `withSubmit`, que recebe uma callback
    assíncrona e cuida de todo o ciclo de submissão (estado, erro,
    finally). createTask e updateTask agora só declaram o que é único
    delas: a URL, o método HTTP e o body.
    A validação do título foi extraída em `validateTitle`.
 
  POR QUE É MELHOR:
    Single source of truth para a lógica de submissão. Manutenção
    e testes centralizados.
 
  =============================================================
  PONTO 2 — FUNÇÃO DE REQUISIÇÃO GENÉRICA
  -----------------------------------------
  PROBLEMA:
    Todas as cinco funções construíam manualmente o objeto de opções
    do fetch, checavam `response.ok`, faziam `response.json()` e
    lançavam erros. Muita repetição estrutural.
 
  SOLUÇÃO:
    Criada a função `apiRequest<T>` que recebe endpoint, método,
    body opcional e uma mensagem de erro padrão. Ela monta o fetch,
    checa o status e devolve o JSON tipado (ou void para DELETE/PATCH
    sem corpo). Todas as funções do hook passaram a usar essa abstração.
 
  POR QUE É MELHOR:
    Qualquer mudança na lógica HTTP (ex.: adicionar headers de auth)
    acontece em um único lugar.
 
  =============================================================
  PONTO 3 — useCallback
  -----------------------------------------
  PROBLEMA:
    Funções declaradas com `function` dentro do hook são recriadas
    a cada render. Componentes filhos que recebem essas funções como
    props fazem re-render desnecessário mesmo sem mudança real.
 
  SOLUÇÃO:
    Todas as funções públicas do hook foram envoltas em `useCallback`.
    As dependências foram declaradas explicitamente (vazias onde não
    há deps externas, ou listando o que é lido do closure).
 
  POR QUE É MELHOR:
    Referência estável entre renders → componentes filhos memoizados
    (React.memo) não re-renderizam sem necessidade.
 
  =============================================================
  PONTO 4 — ATUALIZAÇÃO OTIMISTA (EXTRA)
  -----------------------------------------
  PROBLEMA:
    Após cada escrita (create, update, delete, toggle) o hook chamava
    fetchTasks() de volta, gerando uma segunda requisição de rede só
    para refletir uma mudança que já conhecemos localmente.
 
  SOLUÇÃO:
    Cada operação agora atualiza `tasks` diretamente via setTasks com
    o dado que acabou de chegar da API (ou derivado do estado local):
    - createTask  → spread [...prev, novaTask]
    - updateTask  → map substituindo o item pelo id
    - deleteTask  → filter removendo o item pelo id
    - toggleTask  → map invertendo `completed` pelo id
    fetchTasks continua disponível para forçar sincronização manual.
 
  POR QUE É MELHOR:
    Metade das requisições de rede. A UI responde instantaneamente
    sem aguardar o round-trip de releitura da lista inteira.
 
  =============================================================
  PONTO 5 — SEPARAÇÃO DE RESPONSABILIDADES (EXTRA)
  -----------------------------------------
  DECISÃO: manter junto, com justificativa.
 
  A separação em dois módulos (api.ts + useTasks.ts) faria sentido
  se a camada de API fosse reutilizada por outros hooks ou se os
  testes de unidade precisassem mockar só a comunicação HTTP.
  Neste projeto, `apiRequest` já isola completamente o fetch do
  estado; extraí-la para um arquivo separado seria over-engineering
  sem ganho real de legibilidade ou testabilidade neste momento.
  A função pode ser movida facilmente quando surgir essa necessidade.
  =============================================================
 /