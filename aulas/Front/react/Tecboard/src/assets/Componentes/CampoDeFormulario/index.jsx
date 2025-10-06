import './CampoDeFormulario.css'

export function CampoDeFormulario({children}) {
    return(
      <fieldset>
        {children}
      </fieldset>
    )
  }
