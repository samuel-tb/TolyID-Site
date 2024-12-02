document.addEventListener('DOMContentLoaded', function () {
    const IdAnimais = [];
    const ChipAnimais = [];
    var registroAnimais = document.getElementById('registroAnimais');
    var SexoAnimal;

    //#region O modal de boas-vindas
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

    // Seleciona os inputs de rádio
const sexoRadios = document.getElementsByName("sexo");
const SexoM = document.getElementById("SexoM");
const SexoF = document.getElementById("SexoF");

// Aqui a parte da seleção do sexo
sexoRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
        if(radio.value == "masculino"){
            SexoAnimal = "M";
            SexoF.disabled = true;
        }
        else if(radio.value == "feminino"){
            SexoAnimal = "F";
            SexoM.disabled = true;
        }    

        localStorage.setItem("SexoAnimal", SexoAnimal);

    });
});


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
                    
                    // Preenche o array IdAnimais com os IDs e o array ChipAnimais com os Chip
                    data.content.forEach(content => {
                        IdAnimais.push(content.identificacaoAnimal) && 
                        ChipAnimais.push(content.numeroMicrochip);
                    });
                    localStorage.setItem("ChipAnimais", JSON.stringify(ChipAnimais));

                    // Atualiza a lista de animais cadastrados
                    ListaAnimaisApi(IdAnimais);

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
   
        // Variáveis principais para o modal e botões
        var modal = document.getElementById('animalModal');
        var registroAnimais = document.getElementById('registroAnimais');
        var listaAnimais = document.getElementById('listaAnimais');
    
        // Botões para abrir e fechar o modal
        var addAnimalBtn = document.getElementById('addAnimalBtn'); // Botão "+"
        var closeBtn = document.querySelector('.close');
        var cancelBtn = document.querySelector('.btn.cancel');
        var addBtn = document.querySelector('.btn.add'); // Botão "Adicionar"
    
        // Função para abrir o modal quando o botão "+" for clicado
        if (addAnimalBtn) {
            addAnimalBtn.addEventListener('click', function () {
                console.log("Botão '+' clicado, modal aberto");
                modal.style.display = 'block'; // Abre o modal
            });
        }

      
    // Quando o usuário clicar no <span> (x), fecha o modal
    if(closeBtn){
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });
    }

    // Quando o usuário clicar fora do modal, fecha o modal
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Lógica para o botão "Cancelar"
    cancelBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Lógica para o botão "Adicionar"
    if (addBtn) {
        addBtn.addEventListener('click', function () {
             var animalId = document.getElementById('animalId').value;
             localStorage.setItem('IdDigitado', animalId);

            // Verifica se o campo está vazio
            if (!animalId || animalId.trim() === '') {
                console.error("Campo de identificação do animal está vazio.");
                alert("Por favor, insira a Identificação do animal.");
                return;
            }

            // Verifica se o ID já está cadastrado
            if (IdAnimais.includes(animalId)) {
                console.warn("Identificação duplicada.");
                alert("Já existe um tatu com essa Identificação.");
                return;
            }
            // Adiciona o ID ao array e exibe o registro
            registroAnimais.style.display = 'block';
            // Cria o novo item para a lista de microchips
            var animalItem = document.createElement('div');
            animalItem.className = 'animal-item';
            animalItem.innerHTML = `
                <img src="../img/tatu.jpg" alt="Foto do Tatu">
                <p><a href="../html/tela-chip.html?id=${animalId}" class="animal-link">ID: ${animalId}</a></p>
            `;
            listaAnimais.appendChild(animalItem);

            // Limpa o campo de entrada
            document.getElementById('animalId').value = '';

            // Exibe a mensagem de sucesso no modal de cadastro
            var successMessage = document.createElement('p');
            successMessage.style.color = 'green';
            successMessage.innerText = "Id cadastrado com sucesso!";
            document.querySelector('.modal-content').appendChild(successMessage);

            // Remove a mensagem após um tempo e fecha o modal
            setTimeout(function () {
                successMessage.remove();
                modal.style.display = 'none';
            }, 3000);

            IdAnimais.push(animalId);
        
        });
    }
        
        //#region FUNÇÕES
        // Função que cria os model para os valores que recebe da API
        function ListaAnimaisApi(IdAnimais) {
            if (IdAnimais.length === 0) {
                console.log("Nenhum animal no sistema");
                return;
            }
    
            var listaAnimais = document.getElementById('listaAnimais');
            
            
            IdAnimais.forEach(IdAnimal => {
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
    
        }

        //#endregion

});
