import Campotexto from 'components/Campotexto'
import ButtonSub from 'components/Button'

export const Form = () => {
    return (
        <section className='content_form'>
            <form className='form_content'>
                <Campotexto label="Nome" type="text" required={true}/>
                <Campotexto label="Qtd de Cadeira" type="number" required={true}/>
                <Campotexto label="Evento" type="text" required={true}/>
                <div className='container_btn'>
                    <ButtonSub nameBtn="Cadastrar"/>
                </div>
            </form>
        </section>
    )
}