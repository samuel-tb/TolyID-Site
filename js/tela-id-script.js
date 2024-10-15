document.addEventListener('DOMContentLoaded', function () {
    // Obtém o modal
    var modal = document.getElementById('animalModal');

    // Obtém os botões que abrem o modal
    var addAnimalBtn = document.getElementById('addAnimalBtn');
    var openCadastroBtn = document.getElementById('openCadastroBtn'); // Novo botão

    // Obtém o elemento <span> que fecha o modal
    var closeBtn = document.querySelector('.close');

    // Quando o botão de cadastrar animal ou novo botão for clicado, abre o modal
    addAnimalBtn.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    openCadastroBtn.addEventListener('click', function () {
        modal.style.display = 'block'; // Reutiliza o modal de identificação de animal
    });

    // Quando o usuário clicar no <span> (x), fecha o modal
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Quando o usuário clicar fora do modal, fecha o modal
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Lógica para o botão "Cancelar"
    var cancelBtn = document.querySelector('.btn.cancel');
    cancelBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Array para armazenar os IDs cadastrados
    var idsCadastrados = [];

    // Lógica para o botão "Adicionar"
    var addBtn = document.querySelector('.btn.add');
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

        // Verifica se o ID já foi cadastrado
        if (idsCadastrados.includes(animalId)) {
            // Exibe a mensagem de erro dentro do modal de identificação
            var errorMessage = document.createElement('p');
            errorMessage.style.color = 'red';
            errorMessage.innerText = "Esse ID já foi cadastrado!";
            document.querySelector('.modal-content').appendChild(errorMessage);

            // Remove a mensagem após um tempo
            setTimeout(function () {
                errorMessage.remove();
            }, 3000);

            return;
        }

        // Se o ID não estiver cadastrado, adiciona ao array e na lista
        idsCadastrados.push(animalId);

        // Exibe a área de registros se ainda estiver oculta
        var registroAnimais = document.getElementById('registroAnimais');
        registroAnimais.style.display = 'block';

        // Adiciona o novo animal à lista
        var listaAnimais = document.getElementById('listaAnimais');
        var animalItem = document.createElement('div');
        animalItem.className = 'animal-item';

        // Cria o HTML para o novo animal com um link clicável
        animalItem.innerHTML = `
            <img src="../img/tatu.jpg" alt="Foto do Tatu">
            <p><a href="../html/tela-chip.html?id=${animalId}" class="animal-link">ID: ${animalId}</a></p>
        `;

        // Adiciona o novo item à lista de animais
        listaAnimais.appendChild(animalItem);

        // Limpa o campo de entrada
        document.getElementById('animalId').value = '';

        // Exibe a mensagem de sucesso no modal de identificação
        var successMessage = document.createElement('p');
        successMessage.style.color = 'green';
        successMessage.innerText = "ID cadastrado com sucesso!";
        document.querySelector('.modal-content').appendChild(successMessage);

        // Remove a mensagem após um tempo e fecha o modal
        setTimeout(function () {
            successMessage.remove();
            modal.style.display = 'none'; // Fecha o modal após adicionar
        }, 3000);
    });
    
    //#region Salvando os dados da Aba Tela-id para a API
    localStorage.setItem('NumeroId', animalId);
    //#endregion
});
