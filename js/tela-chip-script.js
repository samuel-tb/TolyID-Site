document.addEventListener('DOMContentLoaded', function () {
    var chip;
    var IdApi;
    var AnimaisCaptura = [];
    var DatasCaptura = [];
    var HorasCaptura = []
    const link = window.location.href;
    let token = localStorage.getItem('Token');

    localStorage.setItem('registroCapturas', document.getElementById('registroMicrochips').innerText);

    localStorage.setItem('listaCapturas', document.getElementById('listaCapturas').innerText);

    const registroCapturas = document.getElementById('registroCapturas');
    const listaCapturas = document.getElementById('listaCapturas');


    var listaMicrochips = document.getElementById('listaMicrochips');

    //#region RECUPERAÇÃO DE DADOS DA PÁGINA ANTERIOR
    const IdDigitado = localStorage.getItem('IdDigitado');
    console.log(IdDigitado);
    // Array com os microchips da API
    const ChipAnimais = [];
    
    const ChipsApi = JSON.parse(localStorage.getItem("ChipAnimais"));
    ChipsApi.forEach(chip => { 
        ChipAnimais.push(chip);
    });
    console.log(ChipAnimais);
    //#endregion

    // Extrai o parâmetro 'id' da URL do link
    const url = new URL(link);
    const IdPagina = url.searchParams.get('id');
    localStorage.setItem('IdPagina', IdPagina);

    //#region O modal de boas-vindas
    const Newmodal = document.getElementById("Bemvindo_chip"); // Certifique-se que o ID corresponde exatamente ao HTML

    // Verifique se o elemento foi encontrado
    console.log("Newmodal:", Newmodal);

    function openModal() {
        if (Newmodal) Newmodal.style.display = "block";
    }

    function closeModal() {
        if (Newmodal) Newmodal.style.display = "none";
    }

    openModal();

    document.querySelector(".Btn_Fechar")?.addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target === Newmodal) {
            closeModal();
        }
    });
    //#endregion

    var listaMicrochips = document.getElementById('listaMicrochips');
    var registroMicrochips = document.getElementById('registroMicrochips');
    var btnFechar = document.getElementById('FecharModal');
    
    //#region Requisição GET da lista de microchip do tatu
    if (btnFechar) {
        btnFechar.addEventListener('click', async (event) => {
            event.preventDefault();

            if (!token) {
                alert("Por favor, faça login primeiro.");
                return;
            }
            //#region Requisição Get para os Chips cadastrados
            try {
                const response = await fetch(`http://localhost:8080/tatus/listar/${IdPagina}`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    IdApi = data.id;
                    chip = data.numeroMicrochip;
                    localStorage.setItem('IdApi', IdApi);
                    ListaMicrochipApi(IdPagina, chip);
                } else {
                    alert("Erro ao obter dados dos tatus.");
                }
            } catch (error) {
                alert("Erro de conexão: " + error.message);
            }
            //#endregion

            //#region Requisição para as capturas cadastradas
            try{
                const response = await fetch(`http://localhost:8080/capturas/listar`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    data.content.forEach(content =>{
                      if(content.tatu.identificacaoAnimal == IdPagina) {
                      var [datacaptura, horacaptura] = content.dadosGerais.dataCaptura.split('T');
                      DatasCaptura.push(datacaptura);
                      HorasCaptura.push(horacaptura);
                      AnimaisCaptura.push(content.id);
                      
                      }
                      
                    });
                    for(let i = 0 ; i< AnimaisCaptura.length; i++){
                        ListaCapturasApi(AnimaisCaptura[i], DatasCaptura[i], HorasCaptura[i]);
                    }
                    
                } else {
                    alert("Erro ao obter dados dos tatus.");
                }
            } catch (error) {
                alert("Erro de conexão: " + error.message);
            }

        });
    } else {
        console.error('Elemento #FecharModal não encontrado.');
    }
    //#endregion

    //#region PARTE DO DESIGN E FUNÇÕES ANTES
    // Obtém o modal
    var modal = document.getElementById('microchipModal');

    // Obtém o ícone de microchip
    var microchipIcon = document.getElementById('microchipIcon');

    // Obtém o elemento <span> que fecha o modal
    var closeBtn = document.querySelector('.close');

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

    // Lógica para o botão "Adicionar"
    var addBtn = document.querySelector('.btnadd');
    if (addBtn) {
        addBtn.addEventListener('click', async function () {
            let microchipId = document.getElementById('microchipId').value;

            // Verifica se o campo está vazio
            if (!microchipId || microchipId.trim() === '') {
                console.error("Campo do microchip do animal está vazio.");
                alert("Por favor, insira o Microchip do animal.");
                return;
            }

            // Verifica se o ID já está cadastrado
            if (ChipAnimais.includes(microchipId)) {
                console.warn("Microchip duplicada.");
                alert("Já existe um tatu com esse microchip.");
                return;
            }

            if(listaMicrochips.childElementCount > 0){
                console.warn("Tatu já possui Microchip.");
                alert("Já existe um microchip nesse tatu.");
                return;
            }
            
            
            if (!token) {
                alert("Por favor, faça login primeiro.");
                return;
            }
                IdString = String(IdDigitado);
                microchipInt = parseInt(microchipId);
                
            try {
                // Envia a requisição do cadastro do tatu
                const response = await fetch('http://localhost:8080/tatus/cadastrar', {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        identificacaoAnimal: IdString, numeroMicrochip: microchipInt}),
                });
    
                // Processa a resposta
                if (response.ok) {
                    const data = await response.json();
                } else {
                    const errorData = await response.json();
                    console.error("Erro do servidor:", errorData);
                    document.querySelector(".mensagem-cadastro").innerHTML = "Número inválido. Por favor, tente novamente.";
                }
            } catch (error) {
                console.log("Erro de conexão: " + error.message);
            }
           

            // Adiciona o ID ao array e exibe o registro
            registroMicrochips.style.display = 'block';

            // Cria o novo item para a lista de microchips
            var microchipItem = document.createElement('div');
            microchipItem.className = 'microchip-item';
            microchipItem.innerHTML = `
                <img src="../img/tatu-2.jpg" alt="Foto do Tatu">
                <p><a href="../html/cadastro-geral.html?id=${Id}" class="microchip-link">Microchip: ${microchipId}</a></p>
            `;
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
                modal.style.display = 'none';
            }, 3000);

            ChipAnimais.push(microchipId);
        
        });
    }
    //#endregion

    //#region FUNÇÕES
    // Modelo para resposta da API se tiver chip
    function ListaMicrochipApi(IdPagina, chip) {
        if (ChipAnimais.length === 0) {
            console.log("Nenhum animal no sistema");
            return;
        }

        
        var microchipItem = document.createElement('hr');
        microchipItem.className = 'microchip-item';

        microchipItem.innerHTML = `
            <img src="../img/tatu-2.jpg" alt="Foto do Tatu">
            <p><a href="../html/cadastro-geral.html?id=${IdPagina}" class="microchip-link">Microchip: ${chip}</a></p>
        `;

        listaMicrochips.appendChild(microchipItem);
        listaMicrochips.style.display = "block";
        registroMicrochips.style.display = "block";
    }

    function ListaCapturasApi(AnimaisCaptura, DatasCaptura, HorasCaptura) {
        if (AnimaisCaptura.length === 0) {
            console.log("Nenhuma captura no sistema");
            return;
        }

        var capturaItem = document.createElement('div');
        capturaItem.className = 'captura-item';

        capturaItem.innerHTML = `
             <p><a href="../html/cadastro-geral.html?CapturaId=${AnimaisCaptura}" class="captura-link">Data da Captura: ${DatasCaptura}</a></p>
             <br /> 
                <p><a href="../html/cadastro-geral.html?CapturaId=${AnimaisCaptura}" class="captura-link">Hora da Captura: ${HorasCaptura}</a></p>
            `;


        listaCapturas.appendChild(capturaItem);
        listaCapturas.style.display = "block";
        registroCapturas.style.display = "block";
    }

    //#endregion

});
