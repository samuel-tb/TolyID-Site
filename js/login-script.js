document.addEventListener("DOMContentLoaded", function () {
    // Função para mostrar e esconder a senha
    function mostraSenha() {
        var inputPass = document.getElementById("inputsenha");
        var btnShowPass = document.getElementById("btn-senha");

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
    document.getElementById("login").addEventListener("click", async function (event) {
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
