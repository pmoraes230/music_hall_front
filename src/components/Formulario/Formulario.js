import Campotexto from 'components/Campotexto'
import './Formulario.css'
import ListaSuspensa from 'components/ListaSuspensa'
import ButtonSub from 'components/Button/';


export const Formulario = () => {
    const perfis = [
        'Administrador',
        'Vendedor',
        'Leitor'
    ]

    return (
        <section className='content_form'>
            <form className='form_content'>
                <Campotexto required={true} label="Nome" for="nome" name="nome" type="text" />
                <Campotexto required={true} label="Usuario" for="usuario" name="usuario" type="text" />
                <Campotexto required={true} label="CPF" for="cpf" name="cpf" type="text" />
                <ListaSuspensa required={true} label="Perfil" itens={perfis} />
                <Campotexto required={true} label="Email" for="email" name="email" type="email" />
                <div className='container_btn'>
                    <ButtonSub nameBtn="Cadastrar" />
                </div>
            </form>
        </section>
    )
}