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
  const [loading, setLoading] = useState(false);

  const limitTexts = (event) => {
    const value = event.target.value;
    if (value.length <= 250) {
      setLimitText(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Validações
    if (!nome || !qtdPublico || !dataEvento || !imagem || !horario || !limitText) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    if (parseInt(qtdPublico) <= 0) {
      setError('A quantidade de público deve ser maior que zero.');
      setLoading(false);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (dataEvento < today) {
      setError('A data do evento não pode ser no passado.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('capacidade_pessoas', qtdPublico);
    formData.append('imagem', imagem);
    formData.append('data_evento', dataEvento);
    formData.append('horario', horario);
    formData.append('descricao', limitText);

    const userId = localStorage.getItem('userId')
    formData.append('id_usuario', userId)

    // Log para depuração
    console.log('FormData enviado:', [...formData.entries()]);

    try {
      const response = await createEvents(formData);
      console.log('Evento criado:', response);
      setSuccess('Evento criado com sucesso!');
      setError(null);
      setNome('');
      setQtdPublico('');
      setDataEvento('');
      setImagem(null);
      setHorario('');
      setLimitText('');
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      setError(error.message || 'Erro ao criar evento. Tente novamente.');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='content_form'>
      <form className='form_content' onSubmit={handleSubmit}>
        <Campotexto
          label="Nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          aria-label="Nome do evento"
          disabled={loading}
        />
        <Campotexto
          label="Qtd Público"
          type="number"
          value={qtdPublico}
          onChange={(e) => setQtdPublico(e.target.value)}
          required
          aria-label="Capacidade de público"
          min="1"
          disabled={loading}
        />
        <CampFile
          label="Imagem"
          onChange={(file) => setImagem(file)}
          required
          aria-label="Imagem do evento"
          disabled={loading}
        />
        <Campotexto
          label="Data de Evento"
          type="date"
          value={dataEvento}
          onChange={(e) => setDataEvento(e.target.value)}
          required
          aria-label="Data do evento"
          min={new Date().toISOString().split('T')[0]}
          disabled={loading}
        />
        <Campotexto
          label="Horário"
          type="time"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          required
          aria-label="Horário do evento"
          disabled={loading}
        />
        <CampTextArea
          label="Descrição"
          onChange={limitTexts}
          value={limitText}
          required
          aria-label="Descrição do evento (máximo 250 caracteres)"
          disabled={loading}
        />
        <div className='container_btn'>
          <ButtonSub
            nameBtn={loading ? 'Cadastrando...' : 'Cadastrar'}
            disabled={loading}
          />
        </div>
        {error && <p className='color_laranja'>{error}</p>}
        {success && <p className='color_laranja'>{success}</p>}
      </form>
    </section>
  );
};

export default FormWithArea;