var btnSalvar = document.querySelector("#btnSalvar")

btnSalvar.addEventListener("click", function (event) {
    event.preventDefault();
    
        var DadosGerais_frmTatu = document.querySelector("#DadosGerais");
    console.log(DadosGerais_frmTatu.identificacao.value);
    console.log(DadosGerais_frmTatu.localcaptura.value);
    console.log(DadosGerais_frmTatu.equiperesponsavel.value);
    console.log(DadosGerais_frmTatu.instituicao.value);
    console.log(DadosGerais_frmTatu.peso.value);
    console.log(DadosGerais_frmTatu.datacaptura.value);
    console.log(DadosGerais_frmTatu.horacaptura.value);
    console.log(DadosGerais_frmTatu.contatoresponsavel.value);
    console.log(DadosGerais_frmTatu.observacoes.value);

        var FichaAnestesica_frmTatu = document.querySelector("#FichaAnestesica");
    console.log(FichaAnestesica_frmTatu.tipoanestesico.value);
    console.log(FichaAnestesica_frmTatu.viaadministracao.value);
    console.log(FichaAnestesica_frmTatu.horaaplicacao.value);
    console.log(FichaAnestesica_frmTatu.horarioinducao.value);
    console.log(FichaAnestesica_frmTatu.horaretorno.value);
    console.log(FichaAnestesica_frmTatu.frequenciacardica.value);
    console.log(FichaAnestesica_frmTatu.frequenciarespiratoria.value);
    console.log(FichaAnestesica_frmTatu.oximetria.value);
    console.log(FichaAnestesica_frmTatu.temperatura.value);

        var Biometria_frmTatu = document.querySelector("#Biometria");
    console.log(Biometria_frmTatu.comprimentototal.value);
    console.log(Biometria_frmTatu.comprimentocabeca.value);
    console.log(Biometria_frmTatu.larguracabeca.value);
    console.log(Biometria_frmTatu.padraoescudocefalico.value);
    console.log(Biometria_frmTatu.comprimentoescudocefalico.value);
    console.log(Biometria_frmTatu.larguraescudocefalico.value);
    console.log(Biometria_frmTatu.largurainterorbital.value);
    console.log(Biometria_frmTatu.comprimentoorelha.value);
    console.log(Biometria_frmTatu.comprimentocauda.value);

        var Amostras_frmTatu = document.querySelector("#Amostras");
    console.log(Amostras_frmTatu.sangue.checked);
    console.log(Amostras_frmTatu.fezes.checked);
    console.log(Amostras_frmTatu.pelo.checked);
    console.log(Amostras_frmTatu.ectoparasitos.checked);
    console.log(Amostras_frmTatu.swab.checked);
    console.log(Amostras_frmTatu.local.checked);
    console.log(Amostras_frmTatu.outros.value);

    var Resp_DadosGerais = []
    Resp_DadosGerais.push(DadosGerais_frmTatu.identificacao.value);
    Resp_DadosGerais.push(DadosGerais_frmTatu.localcaptura.value);
    Resp_DadosGerais.push(DadosGerais_frmTatu.equiperesponsavel.value);
    Resp_DadosGerais.push(DadosGerais_frmTatu.instituicao.value);
    Resp_DadosGerais.push(DadosGerais_frmTatu.peso.value);
    Resp_DadosGerais.push(DadosGerais_frmTatu.datacaptura.value);
    Resp_DadosGerais.push(DadosGerais_frmTatu.horacaptura.value);
    Resp_DadosGerais.push(DadosGerais_frmTatu.contatoresponsavel.value);
    Resp_DadosGerais.push(DadosGerais_frmTatu.observacoes.value);

    var Resp_FichaAnestesica = []
    Resp_FichaAnestesica.push(FichaAnestesica_frmTatu.tipoanestesico.value);
    Resp_FichaAnestesica.push(FichaAnestesica_frmTatu.viaadministracao.value);
    Resp_FichaAnestesica.push(FichaAnestesica_frmTatu.horaaplicacao.value);
    Resp_FichaAnestesica.push(FichaAnestesica_frmTatu.horarioinducao.value);
    Resp_FichaAnestesica.push(FichaAnestesica_frmTatu.horaretorno.value);
    Resp_FichaAnestesica.push(FichaAnestesica_frmTatu.frequenciacardica.value);
    Resp_FichaAnestesica.push(FichaAnestesica_frmTatu.frequenciarespiratoria.value);
    Resp_FichaAnestesica.push(FichaAnestesica_frmTatu.oximetria.value);
    Resp_FichaAnestesica.push(FichaAnestesica_frmTatu.temperatura.value);

    var Resp_Biometria = []
    Resp_Biometria.push(Biometria_frmTatu.comprimentototal.value);
    Resp_Biometria.push(Biometria_frmTatu.comprimentocabeca.value);
    Resp_Biometria.push(Biometria_frmTatu.larguracabeca.value);
    Resp_Biometria.push(Biometria_frmTatu.padraoescudocefalico.value);
    Resp_Biometria.push(Biometria_frmTatu.comprimentoescudocefalico.value);
    Resp_Biometria.push(Biometria_frmTatu.larguraescudocefalico.value);
    Resp_Biometria.push(Biometria_frmTatu.largurainterorbital.value);
    Resp_Biometria.push(Biometria_frmTatu.comprimentoorelha.value);
    Resp_Biometria.push(Biometria_frmTatu.comprimentocauda.value);

    var Resp_Amostras = []
    Resp_Amostras.push(Amostras_frmTatu.sangue.checked);
    Resp_Amostras.push(Amostras_frmTatu.fezes.checked);
    Resp_Amostras.push(Amostras_frmTatu.pelo.checked);
    Resp_Amostras.push(Amostras_frmTatu.ectoparasitos.checked);
    Resp_Amostras.push(Amostras_frmTatu.swab.checked);
    Resp_Amostras.push(Amostras_frmTatu.local.checked);
    Resp_Amostras.push(Amostras_frmTatu.outros.checked);
})