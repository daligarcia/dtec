//Referências dos elementos HTML
const paísInput = document.getElementById("paísInput")
const buscarBtn = document.getElementById("buscarBtn")
const container = document.getElementById("container")

document.addEventListener(`keydown`, (event) => {
    if(event.key === "Enter"){
        event.preventDefault()
        buscarBtn.click()
    }
})

//Adiciona um "ouvinte" ao evento clique no botão
buscarBtn.addEventListener('click',() => {
    const nomePaís = paísInput.value.trim();

    if(nomePaís === '') {
        alert("Digite o nome de um país")
        return;
}

    const url = `https://restcountries.com/v3.1/translation/ ${nomePaís}`

    fetch(url)
        .then(response => {
            
            if(!response.ok) {
                throw new Error('País não encontrado')
            }
            return response.json();
})
        .then(data => {
            const país = data[0];

            const moeda = Object.values(país.currencies)[0].name;

            container.innerHTML = `
                <h2>${país.translations.por.common}</h2>
                <img src="${país.flags.svg}" width=150>
                <p><strong>Capital:</strong> ${país.capital[0]}</p>
                <p><strong>População:</strong> ${país.population.toLocaleString()}</p>
                <p><strong>Moeda:</strong> ${moeda}</p>                
            `
})
    .catch(error => {
        console.error(error)
        container.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;
    })
})


