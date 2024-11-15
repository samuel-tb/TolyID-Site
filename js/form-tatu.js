const link = window.location.href;
var url = new URL(link);
const CapturaId = url.searchParams.get('CapturaId');
var token = localStorage.getItem('Token');
const IdApi = localStorage.getItem('IdApi');

const registroCapturas = localStorage.getItem('registroCapturas');
const listaCapturas = localStorage.getItem('listaCapturas');

//#region FUNÇÕES
async function DadosApi(){
        
    if (CapturaId == null) {
        console.log('Captura fora do banco de dados');
        return;
    }
    
        try {
            console.log(CapturaId);
            const response = await fetch(`http://localhost:8080/capturas/listar/${CapturaId}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });


            if (response.ok) {
                const data = await response.json();
                const dadosGerais = data.dadosGerais;
                var [datacaptura, horacaptura] = dadosGerais.dataCaptura.split('T');

                //Dados Gerais
                console.log(dadosGerais);
                document.querySelector('[name="localDeCaptura"]').value = dadosGerais.localDeCaptura;
                document.querySelector('[name="equipeResponsavel"]').value = dadosGerais.equipeResponsavel;
                document.querySelector('[name="instituicao"]').value = dadosGerais.instituicao;
                document.querySelector('[name="pesoDoTatu"]').value = dadosGerais.pesoDoTatu;
                document.querySelector('[name="dataCaptura"]').value = datacaptura;
                document.querySelector('[name="horaCaptura"]').value = horacaptura;
                document.querySelector('[name="contatoDoResponsavel"]').value = dadosGerais.contatoDoResponsavel;
                document.querySelector('[name="observacoes"]').value = dadosGerais.observacoes;

                const ficharAnestesica = data.fichaAnestesica;
                console.log(ficharAnestesica);
                //Ficha Anestesica
                document.querySelector('[name="tipoAnestesicoOuDose"]').value = ficharAnestesica.tipoAnestesicoOuDose;
                document.querySelector('[name="viaDeAdministracao"]').value = ficharAnestesica.viaDeAdministracao;
                document.querySelector('[name="aplicacao"]').value = ficharAnestesica.aplicacao;
                document.querySelector('[name="inducao"]').value = ficharAnestesica.inducao;
                document.querySelector('[name="retorno"]').value = ficharAnestesica.retorno;
                document.querySelector('[name="frequenciaCardica"]').value = ficharAnestesica.frequenciaCardica;
                document.querySelector('[name="frequenciaRespiratoria"]').value = ficharAnestesica.frequenciaRespiratoria;
                document.querySelector('[name="oximetria"]').value = ficharAnestesica.oximetria;
                document.querySelector('[name=temperatura]').value = ficharAnestesica.temperatura;

                const Biometria = data.biometria;
                //Biometria
                document.querySelector('[name="comprimentoTotal"]').value = Biometria.comprimentoTotal;
                document.querySelector('[name="comprimentoDaCabeca"]').value = Biometria.comprimentoDaCabeca;
                document.querySelector('[name="larguraDaCabeca"]').value = Biometria.larguraDaCabeca;
                document.querySelector('[name="padraoEscudoCefalico"]').value = Biometria.padraoEscudoCefalico;
                document.querySelector('[name="comprimentoEscudoCefalico"]').value = Biometria.comprimentoEscudoCefalico;
                document.querySelector('[name="larguraEscudoCefalico"]').value = Biometria.larguraEscudoCefalico;
                document.querySelector('[name="larguraInterOrbital"]').value = Biometria.larguraInterOrbital;
                document.querySelector('[name="larguraInterLacrimal"]').value = Biometria.larguraInterLacrimal;
                document.querySelector('[name="comprimentoDaOrelha"]').value = Biometria.comprimentoDaOrelha;
                document.querySelector('[name="comprimentoDaCauda"]').value = Biometria.comprimentoDaCauda;
                document.querySelector('[name="larguraDaCauda"]').value = Biometria.larguraDaCauda;
                document.querySelector('[name="comprimentoEscudoEscapular"]').value = Biometria.comprimentoEscudoEscapular;
                document.querySelector('[name="semicircunferenciaEscudoEscapular"]').value = Biometria.semicircunferenciaEscudoEscapular;
                document.querySelector('[name="comprimentoEscudoPelvico"]').value = Biometria.comprimentoEscudoPelvico;
                document.querySelector('[name="semicircunferenciaEscudoPelvico"]').value = Biometria.semicircunferenciaEscudoPelvico;
                document.querySelector('[name="larguraNaSegundaCinta"]').value = Biometria.larguraNaSegundaCinta;
                document.querySelector('[name="numeroDeCintas"]').value = Biometria.numeroDeCintas;
                document.querySelector('[name="comprimentoMaoSemUnha"]').value = Biometria.comprimentoMaoSemUnha;
                document.querySelector('[name="comprimentoUnhaDaMao"]').value = Biometria.comprimentoUnhaDaMao;
                document.querySelector('[name="comprimentoPeSemUnha"]').value = Biometria.comprimentoPeSemUnha;
                document.querySelector('[name="comprimentoUnhaDoPe"]').value = Biometria.comprimentoUnhaDoPe;
                document.querySelector('[name="comprimentoDoPenis"]').value = Biometria.comprimentoDoPenis;
                document.querySelector('[name="larguraBasePenis"]').value = Biometria.larguraBasePenis;
                document.querySelector('[name="comprimentoDoClitoris"]').value = Biometria.comprimentoDoClitoris;

                const Amostras = data.amostra;
                //Amostras
                document.querySelector('[name="sangue"]').checked = Amostras.sangue;
                document.querySelector('[name="fezes"]').checked = Amostras.fezes;
                document.querySelector('[name="pelo"]').checked = Amostras.pelo;
                document.querySelector('[name="ectoparasitos"]').checked = Amostras.sangue;
                document.querySelector('[name="swab"]').checked = Amostras.swab;
                document.querySelector('[name="local"]').checked = Amostras.local;
                document.querySelector('[name="outros"]').value = Amostras.outros;
                


            } else {
                alert("Erro ao obter dados dos tatus.");
                return;
            }
        } catch (error) {
            alert("Erro de conexão: " + error.message);
            return;
        }
}
//#endregion

var Idnova;
DadosApi();

var btnSalvar = document.getElementById("btnSalvar");

const comp_penis = document.getElementById('comprimento_penis');
const larg_penis = document.getElementById('largura_penis');
const comp_clitoris = document.getElementById('comprimento_clitoris');

// Seleciona o botão e o formulário que contém os inputs
var botao_salvar = document.getElementById("Btn_SalvarParametros");
const FichaAnestesica_frmTatu = document.getElementById("step2");

// Inicializa o array para armazenar os conjuntos de parâmetros fisiológicos
const parametrosFisiologicos = [];

// Função para adicionar um novo conjunto de parâmetros ao array
botao_salvar.addEventListener('click', function(event) {
    event.preventDefault();

    // Seleciona os inputs e cria um objeto para armazenar os valores
    const inputsParametros = FichaAnestesica_frmTatu.querySelectorAll('table[name="parametrosFisiologicos"] input');
    const parametrosAtuais = {};
    console.log(inputsParametros);

    // Itera sobre cada input e adiciona seus valores ao objeto
    inputsParametros.forEach(input => {
        parametrosAtuais[input.name] = input.value; // Usa o nome do input como chave e o valor inserido como valor
    });

    // Adiciona o conjunto de parâmetros ao array `parametrosFisiologicos`
    parametrosFisiologicos.push(parametrosAtuais);

    inputsParametros.forEach(input => input.value = '');

});

//#region Parte de configuração para quando digitar nos inputs de penis bloquear no clitoris e vice-versa
comp_penis.addEventListener('input', function() {
    if (comp_penis.value.length > 0) {
        comp_clitoris.disabled = true; // Desativa comp_clitoris
    } else {
        comp_clitoris.disabled = false; // Ativa novamente se o comp_penis estiver vazio
    }
});

larg_penis.addEventListener('input', function() {
    if (larg_penis.value.length > 0) {
        comp_clitoris.disabled = true; // Desativa comp_clitoris
    } else {
        comp_clitoris.disabled = false; // Ativa novamente se o larg_penis estiver vazio
    }
});

comp_clitoris.addEventListener('input', function() {
    if (comp_clitoris.value.length > 0) {
        comp_penis.disabled = true; // Desativa comp_penis
        larg_penis.disabled = true; // Desativa larg_penis
    } else {
        comp_penis.disabled = false; // Ativa novamente se o comp_clitoris estiver vazio
        larg_penis.disabled = false; // Ativa novamente se o comp_clitoris estiver vazio
    }
});

btnSalvar.addEventListener("click", async function () {

    // Dados gerais
    const DadosGerais_frmTatu = document.getElementById("step1");
    const dataHoraFormatadacadastro = `${DadosGerais_frmTatu.dataCaptura.value}T${DadosGerais_frmTatu.horaCaptura.value}`;
    const Resp_DadosGerais = {
        localDeCaptura: DadosGerais_frmTatu.localDeCaptura.value,
        equipeResponsavel: DadosGerais_frmTatu.equipeResponsavel.value,
        instituicao: DadosGerais_frmTatu.instituicao.value,
        pesoDoTatu: DadosGerais_frmTatu.pesoDoTatu.value,
        dataCaptura: dataHoraFormatadacadastro,
        contatoDoResponsavel: DadosGerais_frmTatu.contatoDoResponsavel.value,
        observacoes: DadosGerais_frmTatu.observacoes.value
    };
    var Data = DadosGerais_frmTatu.dataCaptura.value;
    var Hora = DadosGerais_frmTatu.horaCaptura.value;
var Hora = localStorage.getItem("HoraCaptura");
    // Ficha Anestésica

// Estrutura o objeto JSON com os valores capturados
const Resp_FichaAnestesica = {
    tipoAnestesicoOuDose: FichaAnestesica_frmTatu.tipoAnestesicoOuDose.value,
        viaDeAdministracao: FichaAnestesica_frmTatu.viaDeAdministracao.value,
        aplicacao: FichaAnestesica_frmTatu.aplicacao.value,
        inducao: FichaAnestesica_frmTatu.inducao.value,
        retorno: FichaAnestesica_frmTatu.retorno.value,
   parametrosFisiologicos: parametrosFisiologicos, 
};

// Exibe o objeto JSON no console
console.log(JSON.stringify(Resp_FichaAnestesica, null, 2));



    // Biometria
    const Biometria_frmTatu = document.getElementById("step3");
    const Resp_Biometria = {
        comprimentoTotal: Biometria_frmTatu.comprimentoTotal.value,
        comprimentoDaCabeca: Biometria_frmTatu.comprimentoDaCabeca.value,
        larguraDaCabeca: Biometria_frmTatu.larguraDaCabeca.value,
        padraoEscudoCefalico: Biometria_frmTatu.padraoEscudoCefalico.value,
        comprimentoEscudoCefalico: Biometria_frmTatu.comprimentoEscudoCefalico.value,
        larguraEscudoCefalico: Biometria_frmTatu.larguraEscudoCefalico.value,
        larguraInterOrbital: Biometria_frmTatu.larguraInterOrbital.value,
        larguraInterLacrimal: Biometria_frmTatu.larguraInterLacrimal.value,
        comprimentoDaOrelha: Biometria_frmTatu.comprimentoDaOrelha.value,
        comprimentoDaCauda: Biometria_frmTatu.comprimentoDaCauda.value,
        larguraDaCauda: Biometria_frmTatu.larguraDaCauda.value,
        comprimentoEscudoEscapular: Biometria_frmTatu.comprimentoEscudoEscapular.value,
        semicircunferenciaEscudoEscapular: Biometria_frmTatu.semicircunferenciaEscudoEscapular.value,
        comprimentoEscudoPelvico: Biometria_frmTatu.comprimentoEscudoPelvico.value,
        semicircunferenciaEscudoPelvico: Biometria_frmTatu.semicircunferenciaEscudoPelvico.value,
        larguraNaSegundaCinta: Biometria_frmTatu.larguraNaSegundaCinta.value,
        numeroDeCintas: Biometria_frmTatu.numeroDeCintas.value,
        comprimentoMaoSemUnha: Biometria_frmTatu.comprimentoMaoSemUnha.value,
        comprimentoUnhaDaMao: Biometria_frmTatu.comprimentoUnhaDaMao.value,
        comprimentoPeSemUnha: Biometria_frmTatu.comprimentoPeSemUnha.value,
        comprimentoUnhaDoPe: Biometria_frmTatu.comprimentoUnhaDoPe.value,
        comprimentoDoPenis: Biometria_frmTatu.comprimentoDoPenis.value,
        larguraBasePenis: Biometria_frmTatu.larguraBasePenis.value,
        comprimentoDoClitoris: Biometria_frmTatu.comprimentoDoClitoris.value
    };

    // Amostras
    const Amostras_frmTatu = document.getElementById("step4");
    const Resp_Amostras = {
        sangue: Amostras_frmTatu.sangue.checked,
        fezes: Amostras_frmTatu.fezes.checked,
        pelo: Amostras_frmTatu.pelo.checked,
        ectoparasitos: Amostras_frmTatu.ectoparasitos.checked,
        swab: Amostras_frmTatu.swab.checked,
        local: Amostras_frmTatu.local.checked,
        outros: Amostras_frmTatu.outros.checked
    };


    //#region Parte que faz a requisição de cadastro da captura
    try {
        // Envia a requisição de cadastro para a API
        const response = await fetch(`http://localhost:8080/capturas/cadastrar/${IdApi}`,{
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dadosGerais: Resp_DadosGerais,
                fichaAnestesica: Resp_FichaAnestesica,
                biometria: Resp_Biometria,
                amostra: Resp_Amostras
            })
        })

        // Processa a resposta
        .then(async (response) => {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              return response.json(); // Converta para JSON se o tipo for JSON
            } else {
              return response.text(); // Caso contrário, leia como texto
            }
          }).then((data) => {
            registroCapturas.style.display = 'block';

            var capturaItem = document.createElement('div');
            capturaItem.className = 'captura-item';
            capturaItem.innerHTML = `
                <p><a href="../html/cadastro-geral.html?id=${IdPagina}" class="captura-link">Data da Captura: ${data}</a></p>
                <p><a href="../html/tela-id.html?id=${IdPagina}" class="captura-link">Hora da Captura: ${Hora}</a></p>
            `;
            listaCapturas.appendChild(capturaItem);

          })
          .catch((error) => {
            console.error('Erro de conexão:', error);
          });
    } catch (error) {
        console.log("Erro de conexão: " + error.message);
    }
    //#endregion

   
});
