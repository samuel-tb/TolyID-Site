
alert(localStorage.getItem("Token"));

document.addEventListener('DOMContentLoaded', function () {
 //#region Função para o modal bem vindo 
    // Seleciona o modal
    const newmodal = document.getElementById("Bemvindo_Id");

    // Função para abrir o modal
    function openModal() {
        newmodal.style.display = "block";
    }

    // Função para fechar o modal
    function closeModal() {
        newmodal.style.display = "none";
    }

    // Exibe o modal ao carregar a página
    openModal();

    // Fecha o modal ao clicar no 'x' ou no botão 'Cancelar'
    document.querySelector(".Btn_Fechar").addEventListener("click", closeModal);
    
    // Fecha o modal ao clicar fora da área de conteúdo
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
//#region 
 

    var btnFechar = document.getElementById('Fechar');
   //#region Requisição Get da lista de Tatus por Id
    if (btnFechar) {
        btnFechar.addEventListener('click', async (event) => {
            event.preventDefault(); // Essa linha é útil se o botão estiver dentro de um formulário.
            
            let token = localStorage.getItem('Token');

            if (!token) {
                alert("Por favor, faça login primeiro.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/tatus/listar`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    alert("Dados dos tatus: " + JSON.stringify(data));
                } else {
                    alert("Erro ao obter dados dos tatus.");
                }
            } catch (error) {
                alert("Erro de conexão: " + error.message);
            }
        });
    } else {
        console.error('Elemento #Btn_Fechar não encontrado.');
    }
    //#endregion

   
    // Obtém o modal
    var modal = document.getElementById('animalModal');
    
 
    // Obtém os botões que abrem o modal
    var addAnimalBtn = document.getElementById('addAnimalBtn');
    var openCadastroBtn = document.getElementById('openCadastroBtn'); // Novo botão

    // Obtém o elemento <span> que fecha o modal
    var closeBtn = document.querySelector('.close');

    // Quando o botão de cadastrar animal ou novo botão for clicado, abre o modal
    if (addAnimalBtn) {
        addAnimalBtn.addEventListener('click', function () {
            modal.style.display = 'block';
        });
    }

    if (openCadastroBtn) {
        openCadastroBtn.addEventListener('click', function () {
            modal.style.display = 'block'; // Reutiliza o modal de identificação de animal
        });
    }


    // Quando o usuário clicar no <span> (x), fecha o modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Lógica para o botão "Cancelar"
    var cancelBtn = document.querySelector('.btn.cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Lógica para o botão "Adicionar"
    var addBtn = document.querySelector('.btn.add');
    if (addBtn) {
        addBtn.addEventListener('click', function () {
            var animalId = document.getElementById('animalId').value.trim();

            // Verifica se o campo de ID está vazio
            if (!animalId) {
                var errorMessage = document.createElement('p');
                errorMessage.style.color = 'red';
                errorMessage.innerText = "Por favor, insira a identificação do animal.";
                document.querySelector('.modal-content').appendChild(errorMessage);

                // Remove a mensagem após um tempo
                setTimeout(function () {
                    errorMessage.remove();
                }, 3000);
                return;
            }

            // Aqui você continua com sua lógica...
        });
    }
});
