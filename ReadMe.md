# CarePoints — Portal de Engajamento e Fidelização de Pacientes

O **CarePoints** é uma aplicação web interativa baseada em um Dashboard Desktop desenvolvida como uma solução inteligente de saúde (HealthTech). O objetivo principal do sistema é mitigar e reduzir o absenteísmo em consultas médicas (o fenômeno do *no-show*) através de uma abordagem inovadora combinando **psicologia comportamental (gamificação)** e **logística preditiva urbana**.

Este projeto foi desenvolvido como entrega oficial para o **Sprint 2** na **FIAP**.

---

## Funcionalidades Principais

* **Dashboard:** Painel unificado exibindo os dados da próxima consulta do paciente, status de confirmação em tempo real e o indicador de *Health Streak*.
* **Monitor de mobilidade preditivo:** Área logística onde o paciente insere seu CEP ou endereço. O sistema consome dados de localização, plota a rota exata até a clínica da Vila Olímpia na interface do Google Maps e calcula o tempo de percurso com alertas de tráfego dinâmicos.
* **Mecanismo de reagendamento em 1-clique:** Fluxo inteligente de horários que estimula a liberação de vagas ociosas. Se o paciente percebe um imprevisto pelo mapa, ele pode reagendar mantendo seu *Streak* protegido.
* **Clube de benefícios CarePoints:** Carteira virtual de pontuação acumulada por pontualidade ou avisos prévios, permitindo ao usuário resgatar e abater cupons em serviços parceiros (Gympass, farmácias, etc.).
* **Histórico de notificações:** Linha do tempo integrada que simula o recebimento de alertas e lembretes cruciais enviados por SMS nos gatilhos de 48h, 24h e no Dia D da consulta.

---

## Tecnologias Utilizadas

Para garantir leveza, carregamento instantâneo de interface e compatibilidade nativa com o ecossistema do GitHub Codespaces, adotei uma arquitetura limpa sem a necessidade de compilações pesadas:

* **HTML5:** Estruturação de layouts e seções para visualização em desktop.
* **CSS3:** Estilização, controle de paletas da Care Plus através de variáveis globais (`:root`), efeitos de botões e responsividade.
* **JavaScript:** Gerenciamento lógico do ecossistema de aplicação de página única (SPA), controle de saldo, manipulação e injeção do DOM.
* **Bootstrap 5:** Framework de estilização ágil para grids de posicionamento, inputs de formulário estruturados e espaçamentos.

---

## Integrações de APIs de Terceiros

* **API ViaCEP:** Consulta assíncrona disparada de forma automatizada via JavaScript assim que o usuário digita os 8 dígitos do CEP. Retorna dados instantâneos de logradouro e bairro direto para o input de endereço de origem.
* **API Google Maps Embed:** Injeção dinâmica do mapa oficial do Google no painel logístico, traçando a rota exata de deslocamento urbano entre o endereço digitado pelo paciente e o endereço fixo da unidade física da clínica médica.

---

## 📂 Estrutura do Repositório

```text
├── index.html        # Estrutura semântica de todas as telas (SPA)
├── style.css         # Variáveis de cores corporativas, fontes e design clean
├── script.js        # Lógica de telemetria, consumo de APIs e gamificação
└── README.md         # Documentação e guia do repositório
