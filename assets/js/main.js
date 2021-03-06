/* ----------------------------------Fazendo os Imports--------------------------------- */
const bruto = document.getElementById("bruto");
const liquido = document.getElementById("liquido");
const pre = document.getElementById("pre");
const pos = document.getElementById("pos");
const fixado = document.getElementById("fixado");
const aporteRent = document.getElementById("aporte-r");
const prazo = document.getElementById("prazo-r");
const ipca = document.getElementById("ipca");
const aporteIndex = document.getElementById("aporte-i");
const rentabilidade = document.getElementById("rentabilidade");
const cdiRent = document.getElementById("cdi");
const simular = document.getElementById("simular");
const limpar = document.getElementById("limpar");
const labelClass = document.querySelectorAll(".labelClass");
const formGroup = document.querySelectorAll(".form-group");
const msgP = document.querySelectorAll(".msg-p");
const resultadoSimulacao = document.getElementById("resultado-simulacao");
const paragrafo = document.querySelectorAll(".dados-simulacao");

/*----------------- Codificando a Parte de Rendimento ----------------------*/

let ativo = false;

bruto.addEventListener("click", (event) => {
  ativo = true;

  bruto.removeAttribute("button-disabled");
  bruto.setAttribute("class", "button-enabled");
  bruto.value = "selected";
  liquido.value = "";

  liquido.removeAttribute("button-enabled");
  liquido.setAttribute("class", "button-disabled");
});

liquido.addEventListener("click", (event) => {
  if (ativo == true) {
    bruto.removeAttribute("button-enabled");
    bruto.setAttribute("class", "button-disabled");
  }

  liquido.removeAttribute("button-disabled");
  liquido.setAttribute("class", "button-enabled");
  bruto.value = "";
  liquido.value = "selected";
});

aporteRent.addEventListener("focus", () => {
  aporteRent.removeAttribute("placeholder");
  aporteRent.value = "R$ ";
});

/*----------------- Codificando a Parte de Indexação ----------------------*/

pre.addEventListener("click", (event) => {
  pre.removeAttribute("button-disabled");
  pre.setAttribute("class", "button-enabled");
  pre.value = "selected";

  pos.removeAttribute("button-enabled");
  pos.setAttribute("class", "button-disabled");
  pos.value = "";

  fixado.removeAttribute("button-enabled");
  fixado.setAttribute("class", "button-disabled");
  fixado.value = "";
});

pos.addEventListener("click", (event) => {
  pos.removeAttribute("button-disabled");
  pos.setAttribute("class", "button-enabled");
  pos.value = "selected";

  pre.removeAttribute("button-enabled");
  pre.setAttribute("class", "button-disabled");
  pre.value = "";

  fixado.removeAttribute("button-enabled");
  fixado.setAttribute("class", "button-disabled");
  fixado.value = "";
});

fixado.addEventListener("click", (event) => {
  fixado.removeAttribute("button-disabled");
  fixado.setAttribute("class", "button-enabled");
  fixado.value = "selected";

  pre.removeAttribute("button-enabled");
  pre.setAttribute("class", "button-disabled");
  pre.value = "";

  pos.removeAttribute("button-enabled");
  pos.setAttribute("class", "button-disabled");
  pos.value = "";
});

aporteIndex.addEventListener("focus", () => {
  aporteIndex.removeAttribute("placeholder");
  aporteIndex.value = "R$ ";
});

/*-----------------Carregando os Dados Por Fetch API (GET)-------------------------*/
const dadosAPI = [];

fetch("http://localhost:3000/indicadores")
  .then((resposta) => resposta.json())
  .then((json) => (cdiRent.value = json[0].valor));

fetch("http://localhost:3000/indicadores")
  .then((resposta) => resposta.json())
  .then((json) => (ipca.value = json[1].valor));

fetch("http://localhost:3000/simulacoes")
  .then((resposta) => resposta.json())
  .then((json) => {
    for (let dados of json) {
      dadosAPI.push(dados);
    }
  });

function geraDados(index, rend) {
  const dadosIndex = dadosAPI.filter((valor) => {
    return valor.tipoIndexacao === index;
  });

  const filtrado = dadosIndex.filter((valor) => {
    return valor.tipoRendimento === rend;
  });

  return filtrado;
}

/*-------------------------------- Validando os Dados-------------------------------*/

simular.addEventListener("click", () => {
  const aporteValueRent = Number(
    aporteRent.value.slice(2).trim().replace(",", ".")
  );
  const aporteValueIndex = Number(
    aporteIndex.value.slice(2).trim().replace(",", ".")
  );
  const prazoValue = Number(prazo.value);
  const rentabilidadeValue = Number(rentabilidade.value.slice(0, 2));

  if (aporteValueRent === 0 || aporteValueRent === NaN) {
    labelClass[0].style.color = "red";
    msgP[0].setAttribute("class", "msg-erro");
  } else {
    labelClass[0].style.color = "black";
    msgP[0].setAttribute("class", "msg-p");
  }

  console.log(prazoValue);

  if (isNaN(prazoValue) || prazoValue <= 0 || prazoValue > 12) {
    labelClass[1].style.color = "red";
    msgP[1].setAttribute("class", "msg-erro");
  } else {
    labelClass[1].style.color = "black";
    msgP[1].setAttribute("class", "msg-p");
  }

  if (aporteValueIndex === 0 || aporteValueIndex === NaN) {
    labelClass[3].style.color = "red";
    msgP[3].setAttribute("class", "msg-erro");
  } else {
    labelClass[3].style.color = "black";
    msgP[3].setAttribute("class", "msg-p");
  }

  if (isNaN(rentabilidadeValue) || rentabilidadeValue <= 0) {
    labelClass[4].style.color = "red";
    msgP[4].setAttribute("class", "msg-erro");
  } else {
    labelClass[4].style.color = "black";
    msgP[4].setAttribute("class", "msg-p");
  }
  /*----------------------- Verificando Rentabilidade e Indexação-------------------------*/

  if (bruto.value === "selected" && pre.value === "selected") {
    const dadosBrutoPre = geraDados("pre", "bruto");
    console.log(dadosBrutoPre);

    paragrafo[0].innerText = `R$ ${dadosBrutoPre[0].valorFinalBruto}`;
    paragrafo[1].innerText = `${dadosBrutoPre[0].aliquotaIR}%`;
    paragrafo[2].innerText = `R$ ${dadosBrutoPre[0].valorPagoIR}`;
    paragrafo[3].innerText = `R$ ${dadosBrutoPre[0].valorFinalLiquido}`;
    paragrafo[4].innerText = `R$ ${dadosBrutoPre[0].valorTotalInvestido}`;
    paragrafo[5].innerText = `R$ ${dadosBrutoPre[0].ganhoLiquido}`;

    paragrafo[3].style.color = "green";
    paragrafo[5].style.color = "green";
    resultadoSimulacao.style.display = "block";
  } else if (bruto.value === "selected" && pos.value === "selected") {
    const dadosBrutoPre = geraDados("pos", "bruto");
    console.log(dadosBrutoPre);

    paragrafo[0].innerText = `R$ ${dadosBrutoPre[0].valorFinalBruto}`;
    paragrafo[1].innerText = `${dadosBrutoPre[0].aliquotaIR}%`;
    paragrafo[2].innerText = `R$ ${dadosBrutoPre[0].valorPagoIR}`;
    paragrafo[3].innerText = `R$ ${dadosBrutoPre[0].valorFinalLiquido}`;
    paragrafo[4].innerText = `R$ ${dadosBrutoPre[0].valorTotalInvestido}`;
    paragrafo[5].innerText = `R$ ${dadosBrutoPre[0].ganhoLiquido}`;

    paragrafo[3].style.color = "green";
    paragrafo[5].style.color = "green";
    resultadoSimulacao.style.display = "block";
  } else if (bruto.value === "selected" && fixado.value === "selected") {
    const dadosBrutoPre = geraDados("ipca", "bruto");
    console.log(dadosBrutoPre);

    paragrafo[0].innerText = `R$ ${dadosBrutoPre[0].valorFinalBruto}`;
    paragrafo[1].innerText = `${dadosBrutoPre[0].aliquotaIR}%`;
    paragrafo[2].innerText = `R$ ${dadosBrutoPre[0].valorPagoIR}`;
    paragrafo[3].innerText = `R$ ${dadosBrutoPre[0].valorFinalLiquido}`;
    paragrafo[4].innerText = `R$ ${dadosBrutoPre[0].valorTotalInvestido}`;
    paragrafo[5].innerText = `R$ ${dadosBrutoPre[0].ganhoLiquido}`;

    paragrafo[3].style.color = "green";
    paragrafo[5].style.color = "green";
    resultadoSimulacao.style.display = "block";
  } else if (liquido.value === "selected" && pre.value === "selected") {
    const dadosBrutoPre = geraDados("pre", "liquido");
    console.log(dadosBrutoPre);

    paragrafo[0].innerText = `R$ ${dadosBrutoPre[0].valorFinalBruto}`;
    paragrafo[1].innerText = `${dadosBrutoPre[0].aliquotaIR}%`;
    paragrafo[2].innerText = `R$ ${dadosBrutoPre[0].valorPagoIR}`;
    paragrafo[3].innerText = `R$ ${dadosBrutoPre[0].valorFinalLiquido}`;
    paragrafo[4].innerText = `R$ ${dadosBrutoPre[0].valorTotalInvestido}`;
    paragrafo[5].innerText = `R$ ${dadosBrutoPre[0].ganhoLiquido}`;

    paragrafo[3].style.color = "green";
    paragrafo[5].style.color = "green";
    resultadoSimulacao.style.display = "block";
  } else if (liquido.value === "selected" && pos.value === "selected") {
    const dadosBrutoPre = geraDados("pos", "liquido");
    console.log(dadosBrutoPre);

    paragrafo[0].innerText = `R$ ${dadosBrutoPre[0].valorFinalBruto}`;
    paragrafo[1].innerText = `${dadosBrutoPre[0].aliquotaIR}%`;
    paragrafo[2].innerText = `R$ ${dadosBrutoPre[0].valorPagoIR}`;
    paragrafo[3].innerText = `R$ ${dadosBrutoPre[0].valorFinalLiquido}`;
    paragrafo[4].innerText = `R$ ${dadosBrutoPre[0].valorTotalInvestido}`;
    paragrafo[5].innerText = `R$ ${dadosBrutoPre[0].ganhoLiquido}`;

    paragrafo[3].style.color = "green";
    paragrafo[5].style.color = "green";
    resultadoSimulacao.style.display = "block";
  } else if (liquido.value === "selected" && fixado.value === "selected") {
    const dadosBrutoPre = geraDados("ipca", "liquido");
    console.log(dadosBrutoPre);

    paragrafo[0].innerText = `R$ ${dadosBrutoPre[0].valorFinalBruto}`;
    paragrafo[1].innerText = `${dadosBrutoPre[0].aliquotaIR}%`;
    paragrafo[2].innerText = `R$ ${dadosBrutoPre[0].valorPagoIR}`;
    paragrafo[3].innerText = `R$ ${dadosBrutoPre[0].valorFinalLiquido}`;
    paragrafo[4].innerText = `R$ ${dadosBrutoPre[0].valorTotalInvestido}`;
    paragrafo[5].innerText = `R$ ${dadosBrutoPre[0].ganhoLiquido}`;

    paragrafo[3].style.color = "green";
    paragrafo[5].style.color = "green";
    resultadoSimulacao.style.display = "block";
  } else {
    alert("Escolha Opções Válidas de Rentabilidade e Indexação");
  }
});

 /*----------------------- Limpar Campos-------------------------*/

 limpar.addEventListener('click',()=>{
  resultadoSimulacao.style.display = "none"
  bruto.removeAttribute("button-enabled");
  bruto.setAttribute("class", "button-disabled");
  liquido.removeAttribute("button-enabled");
  liquido.setAttribute("class", "button-disabled");
  pre.removeAttribute("button-enabled");
  pre.setAttribute("class", "button-disabled");
  pos.removeAttribute("button-enabled");
  pos.setAttribute("class", "button-disabled");
  fixado.removeAttribute("button-enabled");
  fixado.setAttribute("class", "button-disabled");
  aporteRent.value=''
  aporteIndex.value=''
  rentabilidade.value=''
  prazo.value=''

})

