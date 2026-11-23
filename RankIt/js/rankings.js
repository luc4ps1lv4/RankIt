const listaRankings = document.getElementById("listaRankings");

// Recupera os rankings salvos
const rankings = JSON.parse(
    localStorage.getItem("rankings") || "[]"
);

// Verifica se existem rankings
if (rankings.length === 0) {

    listaRankings.innerHTML = `
        <p class="empty-message">
            Você ainda não criou nenhum ranking.
        </p>
    `;

} else {

    // Percorre os rankings cadastrados
    rankings.forEach((ranking) => {

        const card = document.createElement("div");

        card.classList.add("ranking-card");

        // Recupera os itens deste ranking
        const chaveItens = "itensRanking_" + ranking.id;

        const itens = JSON.parse(
            localStorage.getItem(chaveItens) || "[]"
        );

        // Verifica se existem resultados salvos
        const chaveResultado = "resultadoRanking_" + ranking.id;

        const resultadoSalvo = localStorage.getItem(chaveResultado);

        // Monta o card
        card.innerHTML = `
            <h2>${ranking.nome}</h2>

            <p>Categoria: ${ranking.categoria}</p>

            <p>Data de criação: ${ranking.dataCriacao}</p>

            <p>Quantidade de itens: ${itens.length}</p>

            <button class="primary-button btnAbrirRanking">
				Abrir ranking
			</button>

		${resultadoSalvo ? `
			<button class="secondary-button btnVerResultado">
				Ver resultado
			</button>
		` : ""}

			<button class="delete-button btnExcluirRanking">
				Excluir
			</button>
		`;

        // Botão para abrir o ranking
        const btnAbrir = card.querySelector(".btnAbrirRanking");

        btnAbrir.addEventListener("click", () => {

            localStorage.setItem("rankingAtual", ranking.id);

            window.location.href = "itens.html";

        });

        // Botão para visualizar o resultado
        const btnVerResultado = card.querySelector(".btnVerResultado");

        if (btnVerResultado) {

            btnVerResultado.addEventListener("click", () => {

                localStorage.setItem("rankingAtual", ranking.id);

                window.location.href = "resultado.html";

            });

        }
		
		// Botão para excluir o ranking
	const btnExcluir = card.querySelector(".btnExcluirRanking");

	btnExcluir.addEventListener("click", () => {

		const confirmar = confirm(
			`Tem certeza que deseja excluir o ranking "${ranking.nome}"?`
		);

		if (!confirmar) {
			return;
		}

		// Recupera a lista mais recente de rankings
		const rankingsAtuais = JSON.parse(
			localStorage.getItem("rankings") || "[]"
		);

		// Remove somente o ranking selecionado
		const rankingsAtualizados = rankingsAtuais.filter((item) => {
			return item.id !== ranking.id;
		});

		// Atualiza o armazenamento
		localStorage.setItem(
			"rankings",
			JSON.stringify(rankingsAtualizados)
		);

		// Remove os itens e resultados associados
		localStorage.removeItem("itensRanking_" + ranking.id);
		localStorage.removeItem("resultadoRanking_" + ranking.id);

		// Limpa a seleção atual, se necessário
		if (localStorage.getItem("rankingAtual") === ranking.id) {
			localStorage.removeItem("rankingAtual");
		}

		// Remove o card imediatamente
		card.remove();

		// Mostra mensagem caso não existam mais rankings
		if (rankingsAtualizados.length === 0) {

			listaRankings.innerHTML = `
				<p class="empty-message">
					Você ainda não criou nenhum ranking.
				</p>
			`;

		}

		alert("Ranking excluído com sucesso!");

	});

        // Adiciona o card à página
        listaRankings.appendChild(card);

    });

}