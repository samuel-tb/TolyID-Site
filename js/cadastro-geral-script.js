//#region Código dos botões para passar de aba
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
