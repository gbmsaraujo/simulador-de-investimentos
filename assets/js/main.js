
/* ----------------------------------Fazendo os Imports--------------------------------- */
const bruto = document.querySelector(".bruto");
const liquido = document.querySelector(".liquido");
const pre = document.querySelector(".pre")
const pos = document.querySelector(".pos")
const fixado = document.querySelector(".fixado")
const tagImg = document.querySelectorAll(".tag-img");
const aporteRent = document.getElementById('aporte-r')
const prazo = document.getElementById('prazo-r')
const ipca = document.getElementById('ipca')
const aporteIndex = document.getElementById('aporte-i')
const rentabilidade = document.getElementById('rentabilidade')
const cdiRent = document.getElementById('cdi')
const simular = document.getElementById('simular')
const limpar =document.getElementById ('limpar')
const labelClass = document.querySelectorAll('.labelClass')
const formGroup = document.querySelectorAll('.form-group')


/*----------------- Codificando a Parte de Rendimento ----------------------*/

let ativo = false;

bruto.addEventListener("click", (event) => {
  ativo = true;
  tagImg.forEach((element, i) => {
    if (i === 0) {
      element.setAttribute("src", "./assets/img/icons/check-svgrepo-com 1.svg");
    }
  });
  bruto.style.background = "#ED8E53";
  bruto.style.color = "white";
  liquido.style.background = "#EFEFEF";
  liquido.style.color = "black";
  tagImg[1].setAttribute("src", "");
});

liquido.addEventListener("click", (event) => {
  if (ativo == true) {
    bruto.style.background = "#EFEFEF";
    bruto.style.color = "black";
    tagImg[0].setAttribute("src", "");
  }

  tagImg.forEach((element, i) => {
    if (i === 1) {
      element.setAttribute("src", "./assets/img/icons/check-svgrepo-com 1.svg");
    }
  });

  liquido.style.background = "#ED8E53";
  liquido.style.color = "white";

});

aporteRent.addEventListener('focus',()=>{
    aporteRent.removeAttribute('placeholder')
})

/*----------------- Codificando a Parte de Indexação ----------------------*/

pre.addEventListener("click", (event) => {
    tagImg.forEach((element, i) => {
      if (i === 2) {
        element.setAttribute("src", "./assets/img/icons/check-svgrepo-com 1.svg");
      }
    });
    pre.style.background = "#ED8E53";
    pre.style.color = "white";
    pos.style.background = "#EFEFEF";
    pos.style.color = "black";
    fixado.style.background = "#EFEFEF";
    fixado.style.color = "black";
    tagImg[3].setAttribute("src", "");
    tagImg[4].setAttribute("src", "");
  });

pos.addEventListener("click", (event) => {
    tagImg.forEach((element, i) => {
      if (i === 3) {
        element.setAttribute("src", "./assets/img/icons/check-svgrepo-com 1.svg");
      }
    });
    pos.style.background = "#ED8E53";
    pos.style.color = "white";
    pre.style.background = "#EFEFEF";
    pre.style.color = "black";
    fixado.style.background = "#EFEFEF";
    fixado.style.color = "black";
    tagImg[2].setAttribute("src", "");
    tagImg[4].setAttribute("src", "");
  });

fixado.addEventListener("click", (event) => {
    tagImg.forEach((element, i) => {
      if (i === 4) {
        element.setAttribute("src", "./assets/img/icons/check-svgrepo-com 1.svg");
      }
    });
    fixado.style.background = "#ED8E53";
    fixado.style.color = "white";
    pre.style.background = "#EFEFEF";
    pre.style.color = "black";
    pos.style.background = "#EFEFEF";
    pos.style.color = "black";
    tagImg[2].setAttribute("src", "");
    tagImg[3].setAttribute("src", "");
  });

  aporteIndex.addEventListener('focus',()=>{
    aporteIndex.removeAttribute('placeholder')
})
  
 aporteIndex.addEventListener('focus',()=>{
    aporteIndex.removeAttribute('placeholder')
})

/*-------------------------------- Validando os Dados-------------------------------*/
const creatP = document.createElement('p')

  function msgErro (msg,i) {
      creatP.innerText = msg
      creatP.style.color = 'red'
      formGroup[i].appendChild(creatP)
  }



simular.addEventListener('click', ()=>{
    let aporteValueRent = Number(aporteRent.value.replace(',','.'))
    let prazoValue = Number(prazo.value)

    if (isNaN(aporteValueRent)){
        msgErro ('Aporte deve ser um número válido', 0)
        labelClass[0].style.color = 'red' 
    } else {
        labelClass[0].style.color = 'black'
        creatP.innerText = '' 
    }
    
    
    if (isNaN(prazoValue)){
        msgErro ('Prazo deve ser um número válido', 1)
        labelClass[1].style.color = 'red' 
    } else {
        labelClass[1].style.color = 'black'
        
    }

})
