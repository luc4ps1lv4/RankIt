// Botão "Criar novo ranking"

const btnCriarRanking = document.getElementById("btnCriarRanking");

btnCriarRanking.addEventListener("click", function () {

    window.location.href = "criar-ranking.html";

});


// Botão "Meus Rankings"

const btnRankings = document.getElementById("btnRankings");

btnRankings.addEventListener("click", function () {

    window.location.href = "rankings.html";

});


// Botão "Configurações"

const btnConfiguracoes = document.getElementById("btnConfiguracoes");

btnConfiguracoes.addEventListener("click", function () {

    alert("Aqui ficarão as configurações!");

});


// Botão "Início"

const btnInicio = document.getElementById("btnInicio");

btnInicio.addEventListener("click", function () {

    alert("Você já está na página inicial!");

});