//Referências dos elementos HTML
const paísInput = document.getElementById("paísInput")
const buscarBtn = document.getElementById("buscarBtn")
const container = document.getElementById("container")

//Adiciona um "ouvinte" ao evento clique no botão
buscarBtn.addEventListener('click',() => {
    const nomePaís = paísInput.value.trim();

    if(nomePaís === '') {
        alert("Digite o nome de um país")
        return;
    }

    const url = `https://restcountries.com/v3.1/name/${nomePaís}`

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const país = data[0];

            container.innerHTML = `
                <h2>${país.name.common}</h2>
            
            
            
            
            `
        })


})


