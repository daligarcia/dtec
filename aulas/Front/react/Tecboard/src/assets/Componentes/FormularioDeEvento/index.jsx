import '../FormularioDeEvento/FormularioDeEvento.css'
import { CampoDeEntrada } from "../CampoDeEntrada";
import { CampoDeFormulario } from "../CampoDeFormulario"
import { Label } from "../Label";
import { TituloFormulario } from "../TituloDeFormulario";
import { VemLista } from "../VemLista";
import { Botao } from "../Botão";

export function FormularioDeEvento({ temas, aoSubmeter }) {

  function aoFormSubmetido(FormData) {
    console.log('Vamos adicionar um novo evento', FormData)

    const evento = {
      capa: FormData.get('capa'),
      tema: temas.find(function (item) {
        return item.id == FormData.get('tema')
      }),
      data: new Date(FormData.get('dataEvento')),
      titulo: FormData.get('nomeEvento')
    }
    aoSubmeter(evento)
  }
  return (
    <form className='form-evento' action={aoFormSubmetido}>
      <TituloFormulario>
        Preencha para criar um evento:
      </TituloFormulario>

      <div className='campos'>

        <CampoDeFormulario>
          <Label htmlFor="nomeEvento">Qual é o nome do evento?</Label>
          <CampoDeEntrada type="text" id='nomeEvento'
            name='nomeEvento' placeholder='Sumer dev hits' />
        </CampoDeFormulario>

        <CampoDeFormulario>
          <Label htmlFor="capa">Qual é o endereço da imagem de
            capa</Label>
          <CampoDeEntrada type="text" id='capa'
            name='capa' placeholder='Sumer dev hits' />
        </CampoDeFormulario>

        <CampoDeFormulario>
          <Label htmlFor="dataEvento">Qual é a data do evento?</Label>
          <CampoDeEntrada type="date" id='dataEvento' placeholder='data de evento' />
        </CampoDeFormulario>

        <CampoDeFormulario>
          <Label htmlFor="tema">Qual é o tema do evento?</Label>

          <VemLista name='tema' id='tema' itens={temas} /> {/*Lista Suspensa*/}
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