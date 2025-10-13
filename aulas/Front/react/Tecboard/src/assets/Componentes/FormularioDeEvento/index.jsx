import '../FormularioDeEvento/FormularioDeEvento.css'
import { CampoDeEntrada } from "../CampoDeEntrada";
import { CampoDeFormulario } from "../CampoDeFormulario"
import { Label } from "../Label";
import { TituloFormulario  } from "../TituloDeFormulario";
import { VemLista } from "../VemLista"

export function FormularioDeEvento() {
  return (
    <form className='form-evento'>
      <TituloFormulario>
        Preencha para criar um evento:
      </TituloFormulario>

      <div className='campos'>

      <CampoDeFormulario>
        <Label htmlFor="">Qual é  o nome do evento?</Label>
        <CampoDeEntrada type="text" id='nome' placeholder='Sumer dev hits' />
      </CampoDeFormulario>

      <CampoDeFormulario>
        <Label htmlFor="dataEvento">Qual é a data do evento?</Label>
        <CampoDeEntrada type="date" id='nome' placeholder='data de evento' />
      </CampoDeFormulario>

      <CampoDeFormulario>
        <Label htmlFor="">Qual é  o nome do evento?</Label>
        
        <VemLista/> {/*Lista Suspensa*/}
      </CampoDeFormulario>

      </div>

      <div className='acoes'>
        <Botao>
          Criar Evento
        </Botao>
      </div>
    </form>
  )
}