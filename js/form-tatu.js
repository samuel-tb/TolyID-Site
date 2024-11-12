const IdPagina = localStorage.getItem('IdPagina');
var token = localStorage.getItem('Token');
const IdApi = localStorage.getItem('IdApi');
alert(IdApi);

var Idnova;

try {
    const response = fetch(`http://localhost:8080/tatus/listar/${IdPagina}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (response.ok) {
        const data = response.json();
        Idnova = data.id;
    } else {
        alert("Erro ao obter dados dos tatus.");
    }
} catch (error) {
    alert("Erro de conexão: " + error.message);
}

var registroCapturas = document.getElementById('registroCapturas');

var Data = localStorage.getItem("DataCaptura");
var Hora = localStorage.getItem("HoraCaptura");

var btnSalvar = document.getElementById("btnSalvar");

const comp_penis = document.getElementById('comprimento_penis');
const larg_penis = document.getElementById('largura_penis');
const comp_clitoris = document.getElementById('comprimento_clitoris');

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
    const dataHoraFormatada = `${DadosGerais_frmTatu.dataCaptura.value}T${DadosGerais_frmTatu.horaCaptura.value}`;
    const Resp_DadosGerais = {
        localDeCaptura: DadosGerais_frmTatu.localDeCaptura.value,
        equipeResponsavel: DadosGerais_frmTatu.equipeResponsavel.value,
        instituicao: DadosGerais_frmTatu.instituicao.value,
        pesoDoTatu: DadosGerais_frmTatu.pesoDoTatu.value,
        dataCaptura: dataHoraFormatada,
        contatoDoResponsavel: DadosGerais_frmTatu.contatoDoResponsavel.value,
        observacoes: DadosGerais_frmTatu.observacoes.value
    };

    // Ficha Anestésica
    const FichaAnestesica_frmTatu = document.getElementById("step2");
    console.log(FichaAnestesica_frmTatu.parametrosFisiologicos);
    let Resp_parametros = FichaAnestesica_frmTatu.parametrosFisiologicos.forEach(parametro => {
        
        parametrosFisiologicos.push(parametro.textContent.trim());
        console.log(parametrosFisiologicos);
        
    });
    const Resp_FichaAnestesica = {
        tipoAnestesicoOuDose: FichaAnestesica_frmTatu.tipoAnestesicoOuDose.value,
        viaDeAdministracao: FichaAnestesica_frmTatu.viaDeAdministracao.value,
        aplicacao: FichaAnestesica_frmTatu.aplicacao.value,
        inducao: FichaAnestesica_frmTatu.inducao.value,
        retorno: FichaAnestesica_frmTatu.retorno.value,
        parametrosFisiologicos: Resp_parametros
        
    }
        /*parametrosFisiologicos: {
            frequenciaCardica: FichaAnestesica_frmTatu.frequenciaCardica1.value,
            frequenciaRespiratoria: FichaAnestesica_frmTatu.frequenciaRespiratoria1.value,
            oximetria: FichaAnestesica_frmTatu.oximetria1.value,
            temperatura: FichaAnestesica_frmTatu.temperatura1.value

            
        }*/


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

    // Salva os dados no localStorage
    localStorage.setItem("DataCaptura", DadosGerais_frmTatu.dataCaptura.value);
    localStorage.setItem("HoraCaptura", DadosGerais_frmTatu.horaCaptura.value);

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
            console.log('Resposta:', data);
          })
          .catch((error) => {
            console.error('Erro de conexão:', error);
          });
        /*} else {
            const errorData = await response.json();
            console.log("Erro na requisição:", errorData);
            document.querySelector(".mensagem-cadastro").innerHTML = "Algum dado é inválido. Por favor, tente novamente.";
        }*/
    } catch (error) {
        console.log("Erro de conexão: " + error.message);
    }
    //#endregion
});
