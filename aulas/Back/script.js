//OPERADOR AND (&&)
//para  gerar true, todas as condições devem ser verdadeiras (true)

/*const temDinheiro = true;
const estaSol = true;
const tenhoTempo = true;

const vouSair = temDinheiro && estaSol && tenhoTempo;
console.log(vouSair)*/

//OPERADOR OR(||)
//se pelo menos uma das condições for  verdadeira retorna verdade(true)
/*const temDinheiro = true;
const estaSol = false;
const vouSair = temDinheiro || estaSol;
console.log(vouSair)

//OPERADOR NOT(!) INVERTE O VALOR BOLEANO
const estaChovendo = true;
console.log(!estaChovendo)

//DUPLA NEGAÇÃO (!!)
console.log(!!123)
console.log(!!"texto")
console.log(!!"")
console.log(!!0)*/

//EXEMPLO  DE USO DUPLA NEGAÇÃO (!!)
const email = ""
if(!!email) {
    console.log("Email preenchido")
} else {
    console.log("Campo de email vazio")
}