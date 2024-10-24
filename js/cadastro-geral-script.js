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

function tiraHifen(telefone) {
    const textoAtual = telefone.value;
    const textoAjustado = textoAtual.replace(/[-()]/g, '');

    telefone.value = textoAjustado;
}

function mascaraDeTelefone(telefone){
    const textoAtualInit = telefone.value;
    textoAtual = textoAtualInit.replace(/[^\d()-]/g, '');
    const isFixo = textoAtual.length === 10;
    const isCelular = textoAtual.length === 11;
    const isCelularNoDDD = textoAtual.length === 9;
    const isFixoNoDDD = textoAtual.length === 8;
let textoAjustado;
    if(isFixo) {
        const parte1 = textoAtual.slice(0,2);
        const parte2 = textoAtual.slice(2,6);
        const parte3 = textoAtual.slice(6,10);
        textoAjustado = `(${parte1})${parte2}-${parte3}`        
    } else if(isCelular){
        const parte1 = textoAtual.slice(0,2);
        const parte2 = textoAtual.slice(2,7);
        const parte3 = textoAtual.slice(7,14);
        textoAjustado = `(${parte1})${parte2}-${parte3}`  
    }
    else if(isCelularNoDDD){
        const parte1 = textoAtual.slice(0,5);
        const parte2 = textoAtual.slice(5,9);
        textoAjustado = `()${parte1}-${parte2}`
    }
    else if(isFixoNoDDD){
        const parte1 = textoAtual.slice(0,4);
        const parte2 = textoAtual.slice(4,8);
        textoAjustado = `()${parte1}-${parte2}`
    }
 else {
    textoAjustado = textoAtual; 
}
    telefone.value = textoAjustado;
}
//#endregion 
