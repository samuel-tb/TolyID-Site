document.addEventListener('DOMContentLoaded', function () {
    // Obtém o modal
    var modal = document.getElementById('microchipModal');

    // Obtém o botão de cadastro e o ícone de microchip
    var openCadastroBtn = document.getElementById('openCadastroBtn');
    var microchipIcon = document.getElementById('microchipIcon');

    // Obtém o elemento <span> que fecha o modal
    var closeBtn = document.querySelector('.close');

    // Quando o botão de cadastrar ou o ícone de microchip for clicado, abre o modal
    openCadastroBtn.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    microchipIcon.addEventListener('click', function (event) {
        event.preventDefault(); // Previne a navegação padrão
        modal.style.display = 'block';
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

    // Array para armazenar os microchips cadastrados
    var chipsCadastrados = [];

    // Lógica para o botão "Adicionar"
    var addBtn = document.querySelector('.btn.add');
    addBtn.addEventListener('click', function () {
        var microchipId = document.getElementById('microchipId').value.trim();

        // Verifica se o campo de ID está vazio
        if (!microchipId) {
            var errorMessage = document.createElement('p');
            errorMessage.style.color = 'red';
            errorMessage.innerText = "Por favor, insira o número do microchip.";
            document.querySelector('.modal-content').appendChild(errorMessage);

            // Remove a mensagem após um tempo
            setTimeout(function () {
                errorMessage.remove();
            }, 3000);
            return;
        }

        // Verifica se o microchip já foi cadastrado
        if (chipsCadastrados.includes(microchipId)) {
            var errorMessage = document.createElement('p');
            errorMessage.style.color = 'red';
            errorMessage.innerText = "Esse microchip já foi cadastrado!";
            document.querySelector('.modal-content').appendChild(errorMessage);

            // Remove a mensagem após um tempo
            setTimeout(function () {
                errorMessage.remove();
            }, 3000);

            return;
        }

        // Se o microchip não estiver cadastrado, adiciona ao array e na lista
        chipsCadastrados.push(microchipId);

        // Exibe a área de registros se ainda estiver oculta
        var registroMicrochips = document.getElementById('registroMicrochips');
        registroMicrochips.style.display = 'block';

        // Adiciona o novo microchip à lista
        var listaMicrochips = document.getElementById('listaMicrochips');
        var microchipItem = document.createElement('div');
        microchipItem.className = 'microchip-item';

        // Cria o HTML para o novo microchip com um link clicável
        microchipItem.innerHTML = `
            <img src="../img/tatu-2.jpg" alt="Tatu">
            <p><a href="../html/cadastro-geral.html?id=${microchipId}" class="microchip-link">Microchip: ${microchipId}</a></p>
        `;

        // Adiciona o novo item à lista de microchips
        listaMicrochips.appendChild(microchipItem);

        // Limpa o campo de entrada
        document.getElementById('microchipId').value = '';

        // Exibe a mensagem de sucesso no modal de cadastro
        var successMessage = document.createElement('p');
        successMessage.style.color = 'green';
        successMessage.innerText = "Microchip cadastrado com sucesso!";
        document.querySelector('.modal-content').appendChild(successMessage);

        // Remove a mensagem após um tempo e fecha o modal
        setTimeout(function () {
            successMessage.remove();
            modal.style.display = 'none'; // Fecha o modal após adicionar
        }, 3000);
    });
    

});
