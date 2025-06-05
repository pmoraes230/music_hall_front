import Campotexto from 'components/Campotexto';
import './FormularioSenha.css';
import CampWithPassword from 'components/CampoSenha';
import ButtonSub from 'components/Button';
import { useState } from 'react';
import { loginUser } from 'api/user/api_usuarios';
import { useNavigate } from 'react-router-dom';

export const FormWithPassword = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Faz login e obtém o token
            const token = await loginUser(username, password);
            setSuccess('Login realizado com sucesso!');

            // Salva o token no localStorage
            localStorage.setItem('authToken', token);

            // Redireciona para a página inicial
            navigate('/Home');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='content_form'>
            <form className='form_content' onSubmit={handleSubmit}>
                <Campotexto
                    label="Nome de Usuário"
                    for="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <CampWithPassword
                    label="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className='color_laranja'>{error}</p>}
                {success && <p className='color_laranja'>{success}</p>}
                {loading ? (
                    <p className='spinner'></p> // Exibe o spinner enquanto carrega
                ) : (
                    <div className='container_btn'>
                        <ButtonSub nameBtn="Entrar" />
                    </div>
                )}
            </form>
        </section>
    );
};