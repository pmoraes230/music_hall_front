import Campotexto from 'components/Campotexto'
import ButtonSub from 'components/Button'
import { getEvents } from 'api/events/createEvents'
import { useEffect, useState } from 'react'
import ListaSuspensa from 'components/ListaSuspensa'
import { pushSetor } from 'api/setor/setorApi'

export const Form = () => {
    const [nome, setNome] = useState('')
    const [qtdCadeira, setQtdCadeira] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [events, setEvents] = useState('')
    const [selectEvents, setSelectEvents] = useState('')

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents()
                setEvents(data)
            } catch(error) {
                setError('Erro ao buscar eventos')
            }
        }
        fetchEvents()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataEvents = {
            nome: nome,
            qtd_cadeira: qtdCadeira,
            id_evento: selectEvents
        }

        console.log(dataEvents);
        

        if (!nome || !qtdCadeira || !selectEvents) {
            setError('Por favor, preencha todos os campos obrigatórios.')
            setSuccess(null)
            return
        }

        try {
            await pushSetor(dataEvents)
            setSuccess("Setor Criado!")
            setError(null)
        } catch (error) {
            console.error(error)
            setError("Erro ao criar usuario")
        }
    }

    return (
        <section className='content_form' onSubmit={handleSubmit}>
            <form className='form_content'>
                <Campotexto label="Nome" type="text" required={true} value={nome} onChange={(e) => setNome(e.target.value)}/>
                <Campotexto label="Qtd de Cadeira" type="number" required={true} value={qtdCadeira} onChange={(e) => setQtdCadeira(e.target.value)}/>
                <ListaSuspensa label="Eventos" itens={events} value={selectEvents} onChange={(e) => setSelectEvents(e.target.value)}/>
                <div className='container_btn'>
                    <ButtonSub nameBtn="Cadastrar"/>
                </div>
            </form>
            {error && <p className='color_laranja'>{error}</p>}
            {success && <p className='color_laranja'>{success}</p>}
        </section>
    )
}