document.addEventListener("DOMContentLoaded", function () {
    // Função para mostrar e esconder a senha
    function mostraSenha() {
        var inputPass = document.getElementById("inputsenha");
        var btnShowPass = document.getElementById("btn-senha");

<<<<<<< Updated upstream
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

//#region Pegando o Token, para usar a API
function Autenticacao(){
    const url = 'http://localhost:8080/login/token';
    
    // Dados que você quer enviar no corpo da requisição
    const dados = {
        email: 'guilherme@toly.com',
        senha: '123456',
    };
    
    // Fazendo a requisição POST com fetch
    fetch(url, {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(dados) // Converte os dados para uma string JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        const token = data;
    })
    .catch((error) => {
        console.error('Erro:', error); // Lida com possíveis erros
    });
    
    console.log(token);
    localStorage.setItem('Autenticacao', token);
    }
    //#endregion
    
});
=======
        if (inputPass.type === "password") {
            inputPass.setAttribute("type", "text");
            btnShowPass.classList.replace("bi-eye", "bi-eye-slash");
        } else {
            inputPass.setAttribute("type", "password");
            btnShowPass.classList.replace("bi-eye-slash", "bi-eye");
        }
    }

    // Associando a função mostraSenha ao botão de mostrar senha
    document.getElementById("btn-senha").onclick = mostraSenha;

    // Evento de login
    document.getElementById("login").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Obtém o valor do e-mail e senha
        let emailInput = document.querySelector('input[placeholder="Email"]').value;
        let senhaInput = document.querySelector('input[placeholder="Senha"]').value;

        try {
            // Envia a requisição de login para o backend
            const response = await fetch("http://localhost:8080/login/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailInput, senha: senhaInput }),
            });

            // Processa a resposta
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("Token", data.token);
                window.location.href = "./html/tela-id.html"; // Redireciona se o login for bem-sucedido
            } else {
                document.querySelector(".mensagem-cadastro").innerHTML = "Email ou senha inválidos. Por favor, tente novamente.";
            }
        } catch (error) {
            console.log("Erro de conexão: " + error.message);
        }
    });
});
>>>>>>> Stashed changes
