document.addEventListener('DOMContentLoaded', function () {

    const IdAnimais = [];
    var registroAnimais = document.getElementById('registroAnimais');

    //#region Função para o modal de boas-vindas
    const newmodal = document.getElementById("Bemvindo_Id");

    function openModal() {
        newmodal.style.display = "block";
    }

    function closeModal() {
        newmodal.style.display = "none";
    }

    openModal();

    document.querySelector(".Btn_Fechar").addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target === newmodal) {
            closeModal();
        }
    });
    //#endregion

    var btnFechar = document.getElementById('FecharModal');
    
    //#region Requisição Get da lista de tatus
    if (btnFechar) {
        btnFechar.addEventListener('click', async (event) => {
            event.preventDefault();

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
                    
                    // Preenche o array IdAnimais com os IDs dos animais
                    data.content.forEach(content => {
                        IdAnimais.push(content.identificacaoAnimal);
                    });

                    // Atualiza a lista de animais cadastrados
                    atualizarListaAnimais(IdAnimais);

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

    // Função para atualizar a lista de animais cadastrados na página
    function atualizarListaAnimais(IdAnimais) {
        if (IdAnimais.length === 0) {
            console.log("Nenhum animal no sistema");
            return;
        }

        var listaAnimais = document.getElementById('listaAnimais');
        
        
        IdAnimais.forEach(IdAnimal => {
            console.log(1);
            var animalItem = document.createElement('hr');
            animalItem.className = 'animal-item';

            animalItem.innerHTML = `
                <img src="../img/tatu.jpg" alt="Foto do Tatu">
                <p><a href="../html/tela-chip.html?id=${IdAnimal}" class="animal-link">ID: ${IdAnimal}</a></p>
            `;

            listaAnimais.appendChild(animalItem);
        });
    
        listaAnimais.style.display = "block";
        registroAnimais.style.display = "block";

        alert("Lista de animais atualizada com sucesso!");
    }

    //#region Configurações para Cadastrar o Identificador do tatu
    var modal = document.getElementById('animalModal');
    var addAnimalBtn = document.getElementById('addAnimalBtn');
    var openCadastroBtn = document.getElementById('openCadastroBtn');
    var closeBtn = document.querySelector('.close');

    if (addAnimalBtn) {
        addAnimalBtn.addEventListener('click', function () {
            modal.style.display = 'block';
        });
    }

    if (openCadastroBtn) {
        openCadastroBtn.addEventListener('click', function () {
            modal.style.display = 'block';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    var cancelBtn = document.querySelector('.btn.cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    var addBtn = document.querySelector('.btn.add');
    if (addBtn) {
        addBtn.addEventListener('click', function () {
            var animalId = document.getElementById('animalId').value.trim();

            if (!animalId) {
                var errorMessage = document.createElement('p');
                errorMessage.style.color = 'red';
                errorMessage.innerText = "Por favor, insira a identificação do animal.";
                document.querySelector('.modal-content').appendChild(errorMessage);

                setTimeout(function () {
                    errorMessage.remove();
                }, 3000);
                return;
            }

            idsCadastrados.push(animalId);

            
            registroAnimais.style.display = 'block';

            var listaAnimais = document.getElementById('listaAnimais');
            var animalItem = document.createElement('div');
            animalItem.className = 'animal-item';

            animalItem.innerHTML = `
                <img src="../img/tatu.jpg" alt="Foto do Tatu">
                <p><a href="../html/tela-chip.html?id=${animalId}" class="animal-link">ID: ${animalId}</a></p>
            `;

            listaAnimais.appendChild(animalItem);

            document.getElementById('animalId').value = '';

            var successMessage = document.createElement('p');
            successMessage.style.color = 'green';
            successMessage.innerText = "ID cadastrado com sucesso!";
            document.querySelector('.modal-content').appendChild(successMessage);

            setTimeout(function () {
                successMessage.remove();
                modal.style.display = 'none';
            }, 3000);
            
            localStorage.setItem('AnimalID', animalId);
        });
    }
    //#endregion
});
