
/* ----------------------------------Fazendo os Imports--------------------------------- */
const bruto = document.querySelector(".bruto");
const liquido = document.querySelector(".liquido");
const tagImg = document.querySelectorAll(".tag-img");
const aporteRent = document.getElementById('aporte-r')
const prazo = document.getElementById('prazo-r')
const ipca = document.getElementById('ipca')
const aporteIndex = document.getElementById('aporte-i')
const rentabilidade = document.getElementById('rentabilidade')
const cdiRent = document.getElementById('cdi')


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
