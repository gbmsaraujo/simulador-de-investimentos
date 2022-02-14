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
const msgP = document.querySelectorAll('.msg-p')

/*----------------- Codificando a Parte de Rendimento ----------------------*/

let ativo = false;

bruto.addEventListener("click", (event) => {
  ativo = true;

  bruto.removeAttribute("button-disabled");
  bruto.setAttribute("class", "button-enabled");

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
});

aporteRent.addEventListener("focus", () => {
  aporteRent.removeAttribute("placeholder");
  aporteRent.value = "R$ ";
});

/*----------------- Codificando a Parte de Indexação ----------------------*/

pre.addEventListener("click", (event) => {

  pre.removeAttribute("button-disabled");
  pre.setAttribute("class", "button-enabled");

  pos.removeAttribute("button-enabled");
  pos.setAttribute("class", "button-disabled");

  fixado.removeAttribute("button-enabled");
  fixado.setAttribute("class", "button-disabled");
});

pos.addEventListener("click", (event) => {
  pos.removeAttribute("button-disabled");
  pos.setAttribute("class", "button-enabled");

  pre.removeAttribute("button-enabled");
  pre.setAttribute("class", "button-disabled");

  fixado.removeAttribute("button-enabled");
  fixado.setAttribute("class", "button-disabled");
});

fixado.addEventListener("click", (event) => {
  fixado.removeAttribute("button-disabled");
  fixado.setAttribute("class", "button-enabled");

  pre.removeAttribute("button-enabled");
  pre.setAttribute("class", "button-disabled");

  pos.removeAttribute("button-enabled");
  pos.setAttribute("class", "button-disabled");

});

aporteIndex.addEventListener("focus", () => {
  aporteIndex.removeAttribute("placeholder");
  aporteIndex.value = "R$ ";
});

/*-------------------------------- Validando os Dados-------------------------------*/


simular.addEventListener("click", () => {
  
  const aporteValueRent = Number(aporteRent.value.slice(2).trim().replace(",", "."));
  const aporteValueIndex = Number(aporteIndex.value.slice(2).trim().replace(",", "."));
  const prazoValue = Number(prazo.value);
  const rentabilidadeValue = Number(rentabilidade.value.slice(0,2))
 
  if (aporteValueRent === 0 || aporteValueRent === NaN) {
    labelClass[0].style.color = "red";
    msgP[0].setAttribute('class', 'msg-erro')
  } else {
      labelClass[0].style.color = "black";
      msgP[0].setAttribute('class', 'msg-p')
  }
  
  console.log (prazoValue)

  if (isNaN(prazoValue) || prazoValue <=0 || prazoValue>12){
    labelClass[1].style.color = "red";
    msgP[1].setAttribute('class', 'msg-erro')
  } else {
    labelClass[1].style.color = "black";
    msgP[1].setAttribute('class', 'msg-p')
  }

  if (aporteValueIndex === 0 || aporteValueIndex === NaN) {
    labelClass[3].style.color = "red";
    msgP[3].setAttribute('class', 'msg-erro')
  } else {
      labelClass[3].style.color = "black";
      msgP[3].setAttribute('class', 'msg-p')
  }
  
  if (isNaN(rentabilidadeValue) || rentabilidadeValue <=0){
    labelClass[4].style.color = "red";
    msgP[4].setAttribute('class', 'msg-erro')
  } else {
    labelClass[4].style.color = "black";
    msgP[4].setAttribute('class', 'msg-p')
  }


})

/*------------Carregando os Dados Por Fetch API (GET)---------*/

  fetch ('http://localhost:3000/indicadores')
      .then(resposta => resposta.json())
      .then (json => 
        cdiRent.value = json[0].valor)

  fetch ('http://localhost:3000/indicadores')
      .then(resposta => resposta.json())
      .then (json => 
        ipca.value = json[1].valor)
     
document.addEventListener("click", (event) => {
  const el = event.target;
  const filtraBruto = [];

  if (el.id === "bruto") {
    fetch("http://localhost:3000/simulacoes")
      .then((resposta) => resposta.json())
      .then((json) => {
        const array = json;
        for (let i = 0; i < array.length; i++) {
          if (array[i].tipoRendimento === "bruto") {
            filtraBruto.push(array[i]);
          }
        }

        console.log(filtraBruto);
      });
  }

  if( el.id ==='pre'){
    
  }
});

