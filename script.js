// Controle de pontos globais do usuário
let totalPontos = 350;

// Armazenar a escolha de reagendamento
let dataEscolhida = "";
let horarioEscolhido = "";

// Inicialização do sistema ao carregar a página
window.onload = function() {
    configurarDataMinima();
    configurarOuvinteCEP();
};

// Navegação entre as abas
function navegarPara(telaId) {
    document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.list-nav-item').forEach(i => i.classList.remove('active'));

    document.getElementById('screen-' + telaId).classList.add('active');
    
    const navItem = document.getElementById('nav-' + telaId);
    if (navItem) navItem.classList.add('active');
    
    const titulos = {
        'dashboard': 'Dashboard Principal',
        'notifications': 'Centro de Notificações',
        'reschedule': 'Reagendamento de Consulta',
        'new-appt': 'Agendar Nova Consulta',
        'rewards': 'Clube de Recompensas CarePoints'
    };
    document.getElementById('current-page-title').innerText = titulos[telaId] || 'Portal do Paciente';
}

// Monitora o campo de CEP para buscar o endereço automaticamente via API
function configurarOuvinteCEP() {
    const inputCep = document.getElementById('input-cep');
    if (inputCep) {
        inputCep.addEventListener('blur', function() {
            const cep = this.value.replace(/\D/g, '');
            if (cep.length === 8) {
                const inputOrigem = document.getElementById('input-origem');
                inputOrigem.value = "Buscando endereço...";
                
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(res => res.json())
                    .then(data => {
                        if (!data.erro) {
                            inputOrigem.value = `${data.logradouro}, ${data.bairro} - ${data.localidade}`;
                        } else {
                            alert("CEP não encontrado. Digite o endereço manualmente.");
                            inputOrigem.value = "";
                        }
                    })
                    .catch(() => {
                        alert("Erro ao conectar na API de CEP.");
                        inputOrigem.value = "";
                    });
            }
        });
    }
}

// Gera a rota no Google Maps
function gerarRotaGoogle() {
    const origem = document.getElementById('input-origem').value;
    const destino = "Rua das Olimpíadas, 205, Vila Olímpia, São Paulo, SP";
    const btn = event.target;

    if (!origem) {
        alert("Por favor, insira um CEP ou um endereço de origem para traçar a rota.");
        return;
    }

    btn.innerText = "Calculando...";
    btn.disabled = true;

    // Atualiza o container
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(origem)}+to+${encodeURIComponent(destino)}&output=embed`;
    document.getElementById('box-mapa').innerHTML = `<iframe width="100%" height="100%" frameborder="0" src="${mapUrl}"></iframe>`;

    // Simula processamento
    setTimeout(() => {
        btn.innerText = "Calcular";
        btn.disabled = false;

        const tempoSimulado = origem.length > 22 ? 52 : 24;
        const statusCor = tempoSimulado > 40 ? "text-danger" : "text-success";

        document.getElementById('txt-tempo-estimado').innerText = `${tempoSimulado} min (Tráfego recalculado)`;
        document.getElementById('txt-tempo-estimado').className = `${statusCor} fw-bold mt-1 d-block`;

        const alertaSaida = document.getElementById('alert-sugestao-saida');
        alertaSaida.classList.remove('d-none');

        if (tempoSimulado > 40) {
            alertaSaida.innerHTML = "⚠️ <strong>Trânsito Intenso:</strong> Lentidão detectada no trajeto. Recomendamos sair 15 minutos antes para garantir seu bônus!";
            alertaSaida.className = "small mb-0 text-danger mt-2 text-center";
        } else {
            alertaSaida.innerHTML = "✅ <strong>Trajeto Livre:</strong> Condições ideais de tráfego. Saia no horário planejado.";
            alertaSaida.className = "small mb-0 text-success mt-2 text-center";
        }
    }, 1200);
}

// Gera os botões de horário
function mostrarHorarios(elementoCard, dataTexto, listaHorarios) {
    document.querySelectorAll('.date-slot-card').forEach(c => c.classList.remove('selected'));
    elementoCard.classList.add('selected');
    
    dataEscolhida = dataTexto;
    horarioEscolhido = ""; 
    
    document.getElementById('btn-confirmar-reagendar').disabled = true;
    document.getElementById('data-selecionada-texto').innerText = dataTexto;

    const listaBotoes = document.getElementById('lista-botoes-horarios');
    listaBotoes.innerHTML = "";

    listaHorarios.forEach(horario => {
        const botao = document.createElement('button');
        botao.className = "btn btn-outline-primary px-3 py-2 fw-bold me-2 mb-2";
        botao.type = "button";
        botao.innerText = horario;
        
        botao.onclick = function() {
            listaBotoes.querySelectorAll('button').forEach(b => {
                b.classList.remove('btn-primary', 'text-white');
                b.classList.add('btn-outline-primary');
            });
            
            botao.classList.remove('btn-outline-primary');
            botao.classList.add('btn-primary', 'text-white');
            
            horarioEscolhido = horario;
            document.getElementById('btn-confirmar-reagendar').disabled = false;
        };

        listaBotoes.appendChild(botao);
    });

    document.getElementById('container-horarios').classList.remove('d-none');
}

// Ação de reagendamento
function confirmarReagendamento() {
    if (!dataEscolhida || !horarioEscolhido) return;
    
    alert(`Sucesso Henrique! Consulta reagendada para ${dataEscolhida} às ${horarioEscolhido}.\nSeu Streak 🔥 de 4 dias foi protegido e você ganhou +10 CarePoints por liberar a vaga antiga antecipadamente!`);
    
    atualizarPontos(10);

    document.getElementById('container-horarios').classList.add('d-none');
    document.querySelectorAll('.date-slot-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('btn-confirmar-reagendar').disabled = true;

    navegarPara('dashboard');
}

// Formulário de novas consultas
function salvarNovaConsulta(event) {
    event.preventDefault();
    alert("Procurando as melhores vagas de acordo com seus critérios de mobilidade e horário... Concluído com sucesso!");
    document.getElementById('form-nova-consulta').reset();
    navegarPara('dashboard');
}

// Resgate de benefícios
function resgatarPremio(custo, nomePremio) {
    if (totalPontos < custo) {
        alert(`Saldo insuficiente! Você precisa de ${custo} CarePoints para resgatar: ${nomePremio}.`);
        return;
    }
    
    if (confirm(`Confirmar o resgate de "${nomePremio}" por ${custo} CarePoints?`)) {
        atualizarPontos(-custo);
        alert(`Cupom resgatado com sucesso! O código do voucher foi enviado para seu e-mail.`);
    }
}


// Sincroniza as interfaces com o saldo atual
function atualizarPontos(valor) {
    totalPontos += valor;
    document.getElementById('topbar-points').innerText = `${totalPontos} CarePoints`;
    
    const saldoRewards = document.getElementById('rewards-balance');
    if (saldoRewards) {
        saldoRewards.innerHTML = `${totalPontos} <span style="font-size: 24px; color: var(--cp-blue)">CarePoints</span>`;
    }
}

// Trava o seletor do calendário para não aceitar datas passadas
function configurarDataMinima() {
    const hoje = new Date().toISOString().split('T')[0];
    const inputData = document.getElementById('input-data-nova');
    if (inputData) {
        inputData.setAttribute('min', hoje);
        inputData.value = hoje; 
    }
}