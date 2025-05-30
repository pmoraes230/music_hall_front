import Campotexto from 'components/Campotexto'
import './FormularioSenha.css'
import CampWithPassword from 'components/CampoSenha'
import Button from 'components/buttonLink'

export const FormWithPassword = () => {
    return (
        <section className='content_form'>
            <form className='form_content'>
                <Campotexto label="Nome" for="nome" name="nome" />
                <CampWithPassword label="Senha" />
                <div className='container_btn'>
                    <Button nameBtn="Entrar" to={'/Home'}/>
                </div>
            </form>
        </section>
    )
}