import Campotexto from 'components/Campotexto'
import './FormWithArea.css'
import CampTextArea from 'components/CampTextArea'
import ButtonSub from 'components/Button'
import CampFile from 'components/CampFile'
import { useState } from 'react'
import { createEvent } from '@testing-library/dom'

export const FormWithArea = () => {
    const [limitText, setLimitText] = useState('')
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [nome, setNome] = useState('');
    const [qtdPublico, setQtdPublico] = useState('');
    const [dataEvento, setDataEvento] = useState('');
    const [imagem, setImagem] = useState('');
    const [horario, setHorario] = useState('');


    const limitTexts = (event) => {
        const value = event.target.value;
        if (value.length <= 250) {
            setLimitText(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = {
            nome: nome,
            capacidade_pessoas: qtdPublico,
            imagem: imagem,
            data_evento: dataEvento,
            horario: horario,
            descricao: limitText
        }

        if(!nome || !qtdPublico || !dataEvento || !imagem || !horario) {
            setError("Por favor, preencha todos os campos obrigatórios.")
            setSuccess(null)
            return
        }

        try {
            const response = await createEvent(eventData);
        } catch(error) {
            setError(error.response?.data?.messege || "Erro ao criar evento")
            console.error("Erro ao criar usuário:", error)
            setSuccess(null)
        }
    }

    return (
        <section className='content_form'>
            <form className='form_content'>
                <Campotexto label="Nome" type="text" required={true} />
                <Campotexto label="Qtd Público" type="number" required={true} />
                <CampFile label="imagem" required={true} />
                <Campotexto label="Data de Evento" type="date" required={true}/>
                <Campotexto label="Horário" type="time" required={true}/>
                <CampTextArea label="Descricão" onChange={limitTexts} value={limitText}/>
                <div className='container_btn'>
                    <ButtonSub nameBtn="Cadastrar" />
                </div>
            </form>
        </section>
    )
}