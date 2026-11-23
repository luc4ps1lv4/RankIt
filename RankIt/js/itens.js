let itens = [];

// Identifica o ranking que está sendo editado
const rankingAtual = localStorage.getItem("rankingAtual");

// Verifica se existe um ranking selecionado
if (!rankingAtual) {
    alert("Nenhum ranking foi selecionado. Crie um ranking primeiro.");
    window.location.href = "criar-ranking.html";
}

// Cria uma chave exclusiva para os itens deste ranking
const chaveItens = "itensRanking_" + rankingAtual;

// Carrega os itens salvos para este ranking
const itensSalvos = localStorage.getItem(chaveItens);

if (itensSalvos) {
    itens = JSON.parse(itensSalvos);
}

// Elementos da página
const nomeItem = document.getElementById("nomeItem");
const imagemItem = document.getElementById("imagemItem");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaItens = document.getElementById("listaItens");
const mensagemVazia = document.getElementById("mensagemVazia");
const btnComecar = document.getElementById("btnComecar");


// Adicionar item
btnAdicionar.addEventListener("click", () => {

    const nome = nomeItem.value.trim();
    const arquivo = imagemItem.files[0];

    if (nome === "") {
        alert("Digite o nome do item.");
        return;
    }

    // Se tiver imagem, transforma em Data URL
    if (arquivo) {

        const leitor = new FileReader();

        leitor.onload = function(evento) {

            const novoItem = {
                nome: nome,
                imagem: evento.target.result
            };

            itens.push(novoItem);

            salvarItens();
            atualizarLista();

            nomeItem.value = "";
            imagemItem.value = "";
        };

        leitor.readAsDataURL(arquivo);

    } else {

        const novoItem = {
            nome: nome,
            imagem: ""
        };

        itens.push(novoItem);

        salvarItens();
        atualizarLista();

        nomeItem.value = "";
        imagemItem.value = "";
    }

});


// Salvar os itens deste ranking no navegador
function salvarItens() {
    localStorage.setItem(chaveItens, JSON.stringify(itens));
}


// Atualizar lista na tela
function atualizarLista() {

    listaItens.innerHTML = "";

    if (itens.length === 0) {
        mensagemVazia.style.display = "block";
        return;
    }

    mensagemVazia.style.display = "none";

    itens.forEach((item, indice) => {

        const card = document.createElement("div");

        card.classList.add("item-card");

        if (item.imagem) {

            card.innerHTML = `
                <div
                    class="item-image"
                    style="background-image: url('${item.imagem}')"
                ></div>

                <span class="item-name">${item.nome}</span>

                <button
                    class="delete-button"
                    onclick="excluirItem(${indice})"
                >
                    Excluir
                </button>
            `;

        } else {

            card.innerHTML = `
                <div class="item-image">🎮</div>

                <span class="item-name">${item.nome}</span>

                <button
                    class="delete-button"
                    onclick="excluirItem(${indice})"
                >
                    Excluir
                </button>
            `;
        }

        listaItens.appendChild(card);
    });
}


// Excluir item
function excluirItem(indice) {

    itens.splice(indice, 1);

    salvarItens();
    atualizarLista();
}


// Começar comparação
btnComecar.addEventListener("click", () => {

    if (itens.length < 2) {
        alert("Adicione pelo menos 2 itens para começar.");
        return;
    }

    window.location.href = "comparacao.html";
});


// Mostra os itens quando a página abre
atualizarLista();