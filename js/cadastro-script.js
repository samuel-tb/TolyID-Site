// Criação das variáveis para armazenar os valores digitados
let nomes = JSON.parse(localStorage.getItem('nomes')) || [];
let cpfs = JSON.parse(localStorage.getItem('cpfs')) || [];
let emails = JSON.parse(localStorage.getItem('emails')) || [];
let telefones = JSON.parse(localStorage.getItem('telefones')) || [];
let senhas = JSON.parse(localStorage.getItem('senhas')) || [];

let cadastro = document.getElementById("cadastro");
cadastro.addEventListener("click", function cadastrarUsuario() {

    // Obtém os valores digitados no formulário
    let nome = String(document.getElementById('nome').value);
    let cpf = String(document.getElementById('cpf').value);
    let email = String(document.getElementById('email').value);
    let telefone = String(document.getElementById('telefone').value);
    let senha = String(document.getElementById('senha').value);

    // Expressões para validação
    let nomeRegex = /^[A-Za-z\s]+$/; // Aceita apenas letras e espaços
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validação básica de e-mail
    let semEmojiRegex = /^[\w\s!@#$%^&*()_+=\-{}[\]<>.,;:]*$/; // Aceita apenas caracteres comuns (sem emojis)

    // Verifica se todos os campos estão preenchidos e seguem as regras de validação
    if (!nome.match(nomeRegex)) {
        document.querySelector(".mensagem-cadastro").innerHTML = "O nome deve conter apenas letras e espaços.";
    } 

    else if (!email.match(emailRegex)) {
        document.querySelector(".mensagem-cadastro").innerHTML = "Por favor, insira um e-mail válido.";
    } 

    else if (!senha.match(semEmojiRegex)) {
        document.querySelector(".mensagem-cadastro").innerHTML = "A senha não pode conter emojis.";
    } 

    else if (nome && cpf && email && telefone && senha) {
        
        // Verifica se o CPF ou o e-mail já estão cadastrados
        if (cpfs.includes(cpf)) {
            document.querySelector(".mensagem-cadastro").innerHTML = "CPF já cadastrado. Por favor, utilize outro.";
        } 
        
        else if (emails.includes(email)) {
            document.querySelector(".mensagem-cadastro").innerHTML = "E-mail já cadastrado. Por favor, utilize outro.";
        } 
        
        else {

            // Armazena os valores nos arrays correspondentes
            nomes.push(nome);
            cpfs.push(cpf);
            emails.push(email);
            telefones.push(telefone);
            senhas.push(senha);

            // Salva no localStorage
            localStorage.setItem('nomes', JSON.stringify(nomes));
            localStorage.setItem('cpfs', JSON.stringify(cpfs));
            localStorage.setItem('emails', JSON.stringify(emails));
            localStorage.setItem('telefones', JSON.stringify(telefones));
            localStorage.setItem('senhas', JSON.stringify(senhas));

            // Limpa os campos do formulário após o cadastro
            document.getElementById('nome').value = '';
            document.getElementById('cpf').value = '';
            document.getElementById('email').value = '';
            document.getElementById('telefone').value = '';
            document.getElementById('senha').value = '';

            // Exibe uma mensagem de sucesso
            document.querySelector(".mensagem-cadastro").innerHTML = "Usuário cadastrado com sucesso! Volte para a tela de login para acessar sua conta.";
        }
    } else {
        document.querySelector(".mensagem-cadastro").innerHTML = "Por favor, preencha todos os campos corretamente!";
    }
});

// Função para formatar o CPF
function formatarCPF(cpf) {

    cpf = cpf.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    if (cpf.length > 11) cpf = cpf.substring(0, 11); // Limita a 11 dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Insere o primeiro ponto
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Insere o segundo ponto
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Insere o traço
    return cpf;
}

// Função para formatar o telefone
function formatarTelefone(telefone) {

    telefone = telefone.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    if (telefone.length > 11) telefone = telefone.substring(0, 11); // Limita o telefone a 11 dígitos
    telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2"); // Insere os parênteses no DDD
    telefone = telefone.replace(/(\d{4,5})(\d{4})$/, "$1-$2"); // Insere o traço no número
    return telefone;
}

// Evento que formata o CPF no campo de cadastro enquanto o usuário digita
document.getElementById('cpf').addEventListener('input', function (e) {
    e.target.value = formatarCPF(e.target.value);
});

// Evento que formata o telefone no campo de cadastro enquanto o usuário digita
document.getElementById('telefone').addEventListener('input', function (e) {
    e.target.value = formatarTelefone(e.target.value);
});
