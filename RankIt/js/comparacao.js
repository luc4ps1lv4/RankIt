let itens = [];
let indiceAtual = 0;

// Guarda quantas vezes cada item venceu
let vitorias = {};

// Identifica o ranking atual
const rankingAtual = localStorage.getItem("rankingAtual");

// Cria a chave exclusiva dos itens deste ranking
const chaveItens = "itensRanking_" + rankingAtual;

// Carrega os itens salvos para este ranking
const itensSalvos = localStorage.getItem(chaveItens);

if (itensSalvos) {
    itens = JSON.parse(itensSalvos);
}

// Cria todas as combinações possíveis
let comparacoes = [];

for (let i = 0; i < itens.length; i++) {

    for (let j = i + 1; j < itens.length; j++) {

        comparacoes.push({
            itemA: i,
            itemB: j
        });

    }

}

// Verifica se existem itens suficientes
if (itens.length < 2) {
    alert("Você precisa cadastrar pelo menos 2 itens.");
    window.location.href = "itens.html";
}

// Cria o contador de vitórias
itens.forEach((item) => {
    vitorias[item.nome] = 0;
});

// Número total de comparações
const totalComparacoes = (itens.length * (itens.length - 1)) / 2;

// Elementos da página
const tituloComparacao = document.querySelector(".comparison-label");
const progressoTexto = document.querySelector(".progress-text");
const barraProgresso = document.querySelector(".progress-fill");

const cards = document.querySelectorAll(".comparison-card");
const botoesEscolher = document.querySelectorAll(".choose-button");

// Guarda os dois itens da comparação atual
let itemAtualA;
let itemAtualB;


// Mostra uma comparação
function mostrarComparacao() {

    if (indiceAtual >= totalComparacoes) {
        finalizarComparacoes();
        return;
    }

    const comparacaoAtual = comparacoes[indiceAtual];

	const itemA = itens[comparacaoAtual.itemA];
	const itemB = itens[comparacaoAtual.itemB];

    itemAtualA = itemA;
    itemAtualB = itemB;

    cards[0].querySelector("h2").textContent = itemA.nome;
    cards[1].querySelector("h2").textContent = itemB.nome;

    // Imagem do primeiro item
    const imagemA = cards[0].querySelector(".comparison-image");

    if (itemA.imagem) {
        imagemA.textContent = "";
        imagemA.style.backgroundImage = `url('${itemA.imagem}')`;
    } else {
        imagemA.style.backgroundImage = "";
        imagemA.textContent = "🎮";
    }

    // Imagem do segundo item
    const imagemB = cards[1].querySelector(".comparison-image");

    if (itemB.imagem) {
        imagemB.textContent = "";
        imagemB.style.backgroundImage = `url('${itemB.imagem}')`;
    } else {
        imagemB.style.backgroundImage = "";
        imagemB.textContent = "🎮";
    }

    // Atualiza progresso
    progressoTexto.textContent =
        `${indiceAtual + 1} de ${totalComparacoes}`;

    const porcentagem =
        ((indiceAtual + 1) / totalComparacoes) * 100;

    barraProgresso.style.width = `${porcentagem}%`;

    tituloComparacao.textContent =
        `COMPARAÇÃO ${indiceAtual + 1} DE ${totalComparacoes}`;
}


// Finaliza as comparações
function finalizarComparacoes() {
    // Salva os resultados do ranking atual
    const chaveResultado = "resultadoRanking_" + rankingAtual;

    localStorage.setItem(
        chaveResultado,
        JSON.stringify(vitorias)
    );

    alert("Todas as comparações foram concluídas!");
    window.location.href = "resultado.html";
}


// Botões de escolha
botoesEscolher.forEach((botao, indice) => {

    botao.addEventListener("click", () => {

        // Verifica qual item foi escolhido
        if (indice === 0) {
            vitorias[itemAtualA.nome]++;
        } else {
            vitorias[itemAtualB.nome]++;
        }

        console.log("Vitórias:", vitorias);

        // Vai para a próxima comparação
        indiceAtual++;

        mostrarComparacao();
    });

});


// Inicia a primeira comparação
mostrarComparacao();