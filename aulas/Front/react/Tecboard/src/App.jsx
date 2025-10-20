
import './App.css'
import { Banner } from './assets/Componentes/Banner';
import { FormularioDeEvento } from "./assets/Componentes/FormularioDeEvento";
import { Tema } from "./assets/Componentes/Tema";
import { CardEvento } from './assets/Componentes/CardEvento';

//function no React é Componente
function App() {
  const temas = [
    {
      id: 1,
      nome: 'front-end'
    },
    {
      id: 2,
      nome: 'back-end'
    },
    {
      id: 3,
      nome: 'devops'
    },
    {
      id: 4,
      nome: 'inteligência artificial'
    },
    {
      id: 5,
      nome: 'data science'
    },
    {
      id: 6,
      nome: 'cloud'
    }

  ]

  const eventos = [
    {
      capa: 'https://raw.githubusercontent.com/viniciosneves/tecboard-assets/refs/heads/main/imagem_1.png',
      tema: temas[0],
      data: new Date(),
      titulo: 'Mulheres no Front'
    }
  ]

  function adicionarEvento (evento) {
    eventos.push(evento)
    console.log('eventos  =>' ,eventos)
  }


  return (
    <main>
      <header>
        <img src="/logo.png" alt="Logo" />
      </header>
      
      <Banner />

      <FormularioDeEvento temas={temas} aoSubmeter={adicionarEvento}/>

      {temas.map(function (item) {
        return (
          <section key={item.id}>
            <Tema tema={item} />
            <CardEvento evento={eventos[0]}/>
          </section>
        )
      })}



      {/* 



      <section>
        <Tema tema={temas[1]} />
      </section>

      <section>
        <Tema tema={temas[2]} />
      </section>

      <section>
        <Tema tema={temas[3]} />
      </section>

      <section>
        <Tema tema={temas[4]} />
      </section>
 */}


    </main>

  )
}

export default App
