import Campotexto from 'components/Campotexto';
import './FormWithArea.css';
import CampTextArea from 'components/CampTextArea';
import ButtonSub from 'components/Button';
import CampFile from 'components/CampFile';
import { useState } from 'react';
import { createEvents } from 'api/events/createEvents';

export const FormWithArea = () => {
    const [limitText, setLimitText] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [nome, setNome] = useState('');
    const [qtdPublico, setQtdPublico] = useState('');
    const [dataEvento, setDataEvento] = useState('');
    const [imagem, setImagem] = useState(null);
    const [horario, setHorario] = useState('');

    const limitTexts = (event) => {
        const value = event.target.value;
        if (value.length <= 250) {
            setLimitText(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(); // Usando FormData para enviar o arquivo
        formData.append('nome', nome);
        formData.append('capacidade_pessoas', qtdPublico);
        formData.append('imagem', imagem); // Adiciona o arquivo ao FormData
        formData.append('data_evento', dataEvento);
        formData.append('horario', horario);
        formData.append('descricao', limitText);

        const userId = localStorage.getItem('userId'); // Obtém o ID do usuário logado
        formData.append('id_usuario', userId)

        if (!nome || !qtdPublico || !dataEvento || !imagem || !horario) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            setSuccess(null);
            return;
        }

        try {
            const response = await createEvents(formData); // Envia o FormData para a API
            console.log(response);
            setSuccess('Evento criado com sucesso!');
            setError(null);

            // Limpar os campos após o envio
            setNome('');
            setQtdPublico('');
            setDataEvento('');
            setImagem(null);
            setHorario('');
            setLimitText('');
        } catch (error) {
            setError('Erro ao criar evento:', error);
            setSuccess(null);
        }
    };

    return (
        <section className='content_form'>
            <form className='form_content' onSubmit={handleSubmit}>
                <Campotexto label="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                <Campotexto label="Qtd Público" type="number" value={qtdPublico} onChange={(e) => setQtdPublico(e.target.value)} />
                <CampFile label="Imagem" onChange={(file) => setImagem(file)} /> {/* Ajustado para passar o arquivo diretamente */}
                <Campotexto label="Data de Evento" type="date" value={dataEvento} onChange={(e) => setDataEvento(e.target.value)} />
                <Campotexto label="Horário" type="time" value={horario} onChange={(e) => setHorario(e.target.value)} />
                <CampTextArea label="Descrição" onChange={limitTexts} value={limitText} />
                <div className='container_btn'>
                    <ButtonSub nameBtn="Cadastrar" />
                </div>
                {error && <p className='color_laranja'>{error}</p>}
                {success && <p className='color_laranja'>{success}</p>}
            </form>
        </section>
    );
};