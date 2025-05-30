import Campotexto from 'components/Campotexto'
import './FormWithArea.css'
import CampTextArea from 'components/CampTextArea'
import ButtonSub from 'components/Button'
import CampFile from 'components/CampFile'
import { useState } from 'react'

export const FormWithArea = () => {
    const [limitText, setLimitText] = useState('')

    const limitTexts = (event) => {
        const value = event.target.value;
        if (value.length <= 250) {
            setLimitText(value);
        }
    }

    return (
        <section className='content_form'>
            <form className='form_content'>
                <Campotexto label="Nome" type="text" required={true} />
                <Campotexto label="Qtd Público" type="number" required={true} />
                <CampFile label="imagem" required={true} />
                <CampTextArea label="Descricão" onChange={limitTexts} value={limitText}/>
                <div className='container_btn'>
                    <ButtonSub nameBtn="Cadastrar" />
                </div>
            </form>
        </section>
    )
}