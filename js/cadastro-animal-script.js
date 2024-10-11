//#region Comandos das abas - Samuel
let currentTab = 1; // Aba inicial (primeira aba)

function goToTab(tabIndex) {
    currentTab = tabIndex;

    // Esconder todas as abas
    var tabContent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        tabContent[i].classList.remove("active");
    }

    // Mostrar a aba atual
    var currentTabContent = document.getElementById("step" + currentTab);
    currentTabContent.style.display = "block";
    currentTabContent.classList.add("active");
}

// Mostrar a primeira aba ao carregar a página em telas pequenas
document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth <= 800) {
        document.getElementById("step1").style.display = "block";
        document.getElementById("step1").classList.add("active");
    }
});

// Adicionar evento para detectar redimensionamento da tela
window.addEventListener('resize', function() {
    if (window.innerWidth > 800) {
        // Se o tamanho da tela for maior que 800px, mostrar todas as abas
        var tabContent = document.getElementsByClassName("tab-content");
        for (var i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "block"; // Exibir todas as abas
            tabContent[i].classList.remove("active");
        }
    } else {
        // Se a tela for menor, mostrar apenas a aba ativa
        goToTab(currentTab); // Manter a aba atual visível
    }
});
//#endregion 

//#region Comandos da API
const url = "http://localhost:8080/tatus/cadastrar"

// Dados que você quer enviar no corpo da requisição
const dados = {
    identificacaoAnimal:'',
    idade: 25
};

// Fazendo a requisição POST com fetch
fetch(url, {
    method: 'POST', // Método HTTP
    headers: {
        'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
    },
    body: JSON.stringify(dados) // Converte os dados para uma string JSON
})
.then(response => response.json()) // Converte a resposta para JSON
.then(data => {
    console.log('Sucesso:', data); // Manipula a resposta da API
})
.catch((error) => {
    console.error('Erro:', error); // Lida com possíveis erros
});
//#endregion