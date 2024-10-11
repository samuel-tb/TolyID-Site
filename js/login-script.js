// Função para formatar o CPF (mesma função usada no cadastro)
function formatarCPF(cpf) {

    cpf = cpf.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Insere o primeiro ponto
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Insere o segundo ponto
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Insere o traço
    return cpf;

}

// Evento que formata o CPF no campo de login enquanto o usuário digita
document.querySelector('input[placeholder="CPF"]').addEventListener('input', function (e) {

    e.target.value = formatarCPF(e.target.value);

});

// Script para o login
document.querySelector('#login').addEventListener('click', function (event) {

    event.preventDefault(); // Previne o comportamento padrão do botão de submit

    let cpfInput = document.querySelector('input[placeholder="CPF"]').value;
    let senhaInput = document.querySelector('input[placeholder="Senha"]').value;

    // Recupera os dados do localStorage
    let cpfs = JSON.parse(localStorage.getItem('cpfs')) || [];
    let senhas = JSON.parse(localStorage.getItem('senhas')) || [];

    // Verifica se o CPF e a senha existem e correspondem
    let cpfIndex = cpfs.indexOf(cpfInput); // Localiza o índice do CPF

    if (cpfIndex !== -1 && senhas[cpfIndex] === senhaInput) {
        // CPF e senha correspondem
        window.location.href = "./html/tela-id.html"; // Redireciona para a página do site
    } 
    
    else {
        // CPF ou senha inválidos
        document.querySelector(".mensagem-cadastro").innerHTML = "CPF ou senha inválidos. Por favor, tente novamente.";
    }
});
