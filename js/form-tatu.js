var btnSalvar = document.querySelector("#btnSalvar")

btnSalvar.addEventListener("click", function (event) {
    event.preventDefault();
    
        var frmTatu = document.querySelector("#step1");
    console.log(frmTatu.identificacao.value);
    console.log(frmTatu.localcaptura.value);
    console.log(frmTatu.equiperesponsavel.value);
    console.log(frmTatu.instituicao.value);
    console.log(frmTatu.peso.value);
    console.log(frmTatu.datacaptura.value);
    console.log(frmTatu.horacaptura.value);
    console.log(frmTatu.contatoresponsavel.value);
    console.log(frmTatu.observacoes.value);

        var frmTatu = document.querySelector("#step2");
    console.log(frmTatu.tipoanestesico.value);
    console.log(frmTatu.viaadministracao.value);
    console.log(frmTatu.horaaplicacao.value);
    console.log(frmTatu.horarioinducao.value);
    console.log(frmTatu.horaretorno.value);
    console.log(frmTatu.frequenciacardica.value);
    console.log(frmTatu.frequenciarespiratoria.value);
    console.log(frmTatu.oximetria.value);
    console.log(frmTatu.temperatura.value);

        var frmTatu = document.querySelector("#step3");
    console.log(frmTatu.comprimentototal.value);
    console.log(frmTatu.comprimentocabeca.value);
    console.log(frmTatu.larguracabeca.value);
    console.log(frmTatu.padraoescudocefalico.value);
    console.log(frmTatu.comprimentoescudocefalico.value);
    console.log(frmTatu.larguraescudocefalico.value);
    console.log(frmTatu.largurainterorbital.value);
    console.log(frmTatu.comprimentoorelha.value);
    console.log(frmTatu.comprimentocauda.value);

        var frmTatu = document.querySelector("#step4");
    console.log(frmTatu.sangue.checked);
    console.log(frmTatu.fezes.checked);
    console.log(frmTatu.pelo.checked);
    console.log(frmTatu.ectoparasitos.checked);
    console.log(frmTatu.swab.checked);
    console.log(frmTatu.local.checked);
    console.log(frmTatu.outros.value);
})