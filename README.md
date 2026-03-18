# Sistema RH - Adriana

Sistema baseado no módulo RH da 300f, com os seguintes módulos:

## Módulos incluídos

1. **Perfil** – Perfil da Adriana (usuário RH)
2. **Gestão de Pessoas** – Colaboradores, busca, filtro por área, link para perfil individual
3. **Treinamentos** – Treinamentos, trilhas, certificados, vencimentos
4. **Documentos** – Compliance, documentos de colaboradores, vencimentos
5. **Clima Organizacional** – Pesquisas, resultados, dashboard
6. **Comunicação** – Comunicados, caixa de sugestões, biblioteca
7. **Avaliação Individual** – Scores, última avaliação, risco, link para avaliar
8. **Comparativo** – Seleção de até 3 colaboradores, gráfico de scores
9. **Relatórios** – Exportar CSV (colaboradores com scores)
10. **NPS** – Net Promoter Score, resultados, pesquisas, histórico
11. **Trilha de Entregas** – Trilhas de aprendizagem, entregas, progresso

## Como rodar

```bash
npm install
npm run dev
```

Acesse http://localhost:3000. O sistema simula login como Adriana e redireciona para `/rh/painel`.

## Estrutura de rotas

| Rota | Descrição |
|------|-----------|
| `/` | Redireciona para `/rh/painel` (com login simulado) |
| `/rh` | Redireciona para `/rh/perfil` |
| `/rh/painel` | Painel inicial |
| `/rh/perfil` | Perfil Adriana |
| `/rh/gestao-pessoas` | Gestão de pessoas |
| `/rh/colaboradores/[id]` | Perfil do colaborador |
| `/rh/treinamentos` | Treinamentos |
| `/rh/documentos` | Documentos |
| `/rh/clima` | Clima organizacional |
| `/rh/comunicacao` | Comunicação |
| `/rh/avaliacao` | Avaliação individual |
| `/rh/comparativo` | Comparativo |
| `/rh/relatorios` | Relatórios |
| `/rh/nps` | NPS |
| `/rh/trilha-entregas` | Trilha de entregas |

## Dados

Os dados são mock em `lib/data.ts`. Para produção, substitua por chamadas ao Supabase ou APIs.
