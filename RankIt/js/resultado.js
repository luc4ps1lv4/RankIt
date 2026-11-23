const resultadoLista = document.getElementById("resultadoLista");

// Identifica o ranking atual
const rankingAtual = localStorage.getItem("rankingAtual");

// Cria as chaves exclusivas deste ranking
const chaveItens = "itensRanking_" + rankingAtual;
const chaveResultado = "resultadoRanking_" + rankingAtual;

// Carrega os itens e os resultados deste ranking
const itensSalvos = localStorage.getItem(chaveItens);
const resultadoSalvo = localStorage.getItem(chaveResultado);

if (!itensSalvos || !resultadoSalvo) {

    resultadoLista.innerHTML = `
        <p class="empty-message">
            Nenhum ranking foi criado ainda.
        </p>
    `;

} else {

    const itens = JSON.parse(itensSalvos);
    const vitorias = JSON.parse(resultadoSalvo);

    // Junta os itens com suas respectivas vitórias
    const ranking = itens.map((item) => {

        return {
            nome: item.nome,
            imagem: item.imagem,
            vitorias: vitorias[item.nome] || 0
        };

    });

    // Ordena do maior número de vitórias para o menor
    ranking.sort((a, b) => b.vitorias - a.vitorias);


    // Cria os cards
    ranking.forEach((item, indice) => {

        const card = document.createElement("div");

        card.classList.add("result-card");

        let medalha;

        if (indice === 0) {
            medalha = "🥇";
        } else if (indice === 1) {
            medalha = "🥈";
        } else if (indice === 2) {
            medalha = "🥉";
        } else {
            medalha = `${indice + 1}º`;
        }


        let imagem = "";

        if (item.imagem) {

            imagem = `
                <div
                    class="result-image"
                    style="background-image: url('${item.imagem}')">
                </div>
            `;

        } else {

            imagem = `
                <div class="result-image">
                    🎮
                </div>
            `;

        }


        card.innerHTML = `

            <div class="result-position">
                ${medalha}
            </div>

            ${imagem}

            <div class="result-info">

                <h2>${item.nome}</h2>

                <p>
                    ${item.vitorias} vitória${item.vitorias === 1 ? "" : "s"}
                </p>

            </div>

        `;


        resultadoLista.appendChild(card);

    });

}