
function mostrarAlerta(){

const h1 = document.querySelector("#título")
const conteudoH1 = h1.textContent

alert(conteudoH1)
}




//2. Altere o texto do <P>  para "texto alterado" usando JS

const p = document.querySelector(".texto")
p.innerText = "Texto alterado"
