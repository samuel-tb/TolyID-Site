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
      //AQUIIIIIIIIII ------
        // Função de adicionar animal com verificação de execução
        if (addBtn) {
            addBtn.addEventListener('click', function () {
                console.log("Botão 'Adicionar' clicado"); // Log de início da função
    
                let IdDigitado = document.querySelector('input[placeholder="Animal"]').value; // Pega o valor do campo
    
                console.log("Valor digitado:", IdDigitado); // Exibe o valor digitado no console
    
                // Verifica se o campo está vazio
                if (!IdDigitado || IdDigitado.trim() === '') {
                    console.error("Campo de identificação do animal está vazio.");
                    alert("Por favor, insira a identificação do animal.");
                    return;
                }
    
                console.log(`Valor digitado após trim(): "${IdDigitado.trim()}"`);
    
                // Verifica se o ID já está cadastrado
                if (IdAnimais.includes(IdDigitado)) {
                    console.warn("Identificação duplicada.");
                    alert("Já existe um tatu com essa Identificação.");
                    return;
                }
    
                // Adiciona o ID ao array e exibe o registro
                IdAnimais.push(IdDigitado);
                registroAnimais.style.display = 'block';
    
                var animalItem = document.createElement('div');
                animalItem.className = 'animal-item';
                animalItem.innerHTML = `
                    <img src="../img/tatu.jpg" alt="Foto do Tatu">
                    <p><a href="../html/tela-chip.html?id=${IdDigitado}" class="animal-link">ID: ${IdDigitado}</a></p>
                `;
    
                listaAnimais.appendChild(animalItem);
    
                // Limpa o campo de entrada e fecha o modal
                document.getElementById('Idanimal_digitado').value = '';
                alert("ID cadastrado com sucesso!");
                modal.style.display = 'none';
    
                // Armazena o ID no localStorage
                localStorage.setItem('IdDigitado', IdDigitado);
            });
        } else {
            console.warn("Botão 'Adicionar' não encontrado. Verifique o HTML.");
        }
    
        // Eventos de fechamento do modal
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                modal.style.display = 'none'; // Fecha o modal
            });
        }
    
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function () {
                modal.style.display = 'none'; // Fecha o modal
            });
        }    
    

/*
    // Variáveis principais para o modal e botões
    var modal = document.getElementById('animalModal');
    var registroAnimais = document.getElementById('registroAnimais');
    var listaAnimais = document.getElementById('listaAnimais');

    // Botões para abrir e fechar o modal
    var addAnimalBtn = document.getElementById('addAnimalBtn');
    var closeBtn = document.querySelector('.close');
    var cancelBtn = document.querySelector('.btn.cancel');
    var addBtn = document.querySelector('.btn.add'); // Botão "Adicionar"

    // Abrir o modal quando qualquer botão de abertura for clicado
    if (addAnimalBtn) {
        addAnimalBtn.addEventListener('click', function () {
            modal.style.display = 'block';
        });
    }


    // Fechar o modal quando o botão "close" ou "cancelar" for clicado
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Função de adicionar animal
    if (addBtn) {
        addBtn.addEventListener('click', function () {
            var IdDigitado = document.getElementById('Idanimal_digitado').value.trim();

            // Verifica se o campo de entrada está vazio
            if (!IdDigitado) {
                var errorMessage = document.createElement('p');
                errorMessage.style.color = 'red';
                errorMessage.innerText = "Por favor, insira a identificação do animal.";
                document.querySelector('.modal-content').appendChild(errorMessage);

                setTimeout(function () {
                    errorMessage.remove();
                }, 3000);
                return;
            }

            // Verifica se o ID já está cadastrado
            if (IdAnimais.includes(IdDigitado)) {
                var duplicateMessage = document.createElement('p');
                duplicateMessage.style.color = 'red';
                duplicateMessage.innerText = "Já tem um tatu com essa Identificação.";
                document.querySelector('.modal-content').appendChild(duplicateMessage);

                setTimeout(function () {
                    duplicateMessage.remove();
                }, 3000);
                return;
            }

            // Adiciona o ID ao array e exibe o registro
            IdAnimais.push(IdDigitado);
            registroAnimais.style.display = 'block';

            var animalItem = document.createElement('div');
            animalItem.className = 'animal-item';
            animalItem.innerHTML = `
            <img src="../img/tatu.jpg" alt="Foto do Tatu">
            <p><a href="../html/tela-chip.html?id=${IdDigitado}" class="animal-link">ID: ${IdDigitado}</a></p>
        `;

            listaAnimais.appendChild(animalItem);

            // Limpa o campo de entrada e exibe uma mensagem de sucesso
            document.getElementById('Idanimal_digitado').value = '';
            var successMessage = document.createElement('p');
            successMessage.style.color = 'green';
            successMessage.innerText = "ID cadastrado com sucesso!";
            document.querySelector('.modal-content').appendChild(successMessage);

            setTimeout(function () {
                successMessage.remove();
                modal.style.display = 'none';
            }, 3000);

            // Armazena o ID no localStorage
            localStorage.setItem('IdDigitado', IdDigitado);
        });
    } else {
        console.warn("Botão de adicionar não encontrado. Verifique se existe um botão com a classe '.btn.add' no HTML.");
    }
*/

    
    //#endregion
});
