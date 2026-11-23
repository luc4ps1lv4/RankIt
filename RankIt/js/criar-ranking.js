const btnContinuar = document.getElementById("btnContinuar");

btnContinuar.addEventListener("click", () => {

    const nomeRanking = document.getElementById("nomeRanking").value.trim();
    const categoria = document.getElementById("categoria").value;

    if (nomeRanking === "") {
        alert("Digite um nome para o ranking.");
        return;
    }

    if (categoria === "") {
        alert("Selecione uma categoria.");
        return;
    }

    // Cria os dados do novo ranking
    const ranking = {
        id: Date.now().toString(),
        nome: nomeRanking,
        categoria: categoria,
        dataCriacao: new Date().toLocaleDateString("pt-BR")
    };

    // Recupera os rankings já cadastrados
    let rankingsSalvos = JSON.parse(
        localStorage.getItem("rankings") || "[]"
    );

    // Adiciona o novo ranking à lista
    rankingsSalvos.push(ranking);

    // Salva a lista atualizada
    localStorage.setItem(
        "rankings",
        JSON.stringify(rankingsSalvos)
    );

    // Define qual ranking está sendo criado
    localStorage.setItem("rankingAtual", ranking.id);

    // Segue para a tela de adicionar itens
    window.location.href = "itens.html";

});