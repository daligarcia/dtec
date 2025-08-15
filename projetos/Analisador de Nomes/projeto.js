const nome = prompt("DIGITE SEU NOME COMPLETO: ");

document.body.innerHTML += `<strong>Seu nome é:</strong> ${nome}<br>`;
document.body.innerHTML += `<strong>Seu nome tem</strong>: ${nome.length} letras<br>`;
document.body.innerHTML += `<strong>A segunda letra do seu nome é:</strong> ${nome[1]}<br>`;
document.body.innerHTML += `<strong>O índice da primeira letra "a" é:</strong> ${nome.indexOf('a')}<br>`;
document.body.innerHTML += `<strong>O índice da última letra "a" é:</strong> ${nome.lastIndexOf('a')}<br>`;
document.body.innerHTML += `<strong>As últimas 3 letras do seu nome são:</strong> ${nome.slice(-3)}<br>`;
document.body.innerHTML += `<strong>As palavras do seu nome são:</strong> ${nome.split(' ')}<br>`;
document.body.innerHTML += `<strong>Seu nome com letras maiúsculas:</strong> ${nome.toUpperCase()}<br>`;
document.body.innerHTML += `<strong>Seu nome com letras minúsculas:</strong> ${nome.toLowerCase()}<br>`;