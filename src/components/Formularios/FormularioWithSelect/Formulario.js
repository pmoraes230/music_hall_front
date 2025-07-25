import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Campotexto from 'components/Campotexto';
import './Formulario.css';
import ListaSuspensa from 'components/ListaSuspensa';
import ButtonSub from 'components/Button/';
import getProfile from 'api/profile/getProfile';
import { createUser } from 'api/user/apiCrudUsuario';

export const FormularioWithSelect = () => {
    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [profile, setProfile] = useState(null);
    const [e_mail, setE_mail] = useState('');
    const [error, setError] = useState(null); // Erro geral
    const [fieldErrors, setFieldErrors] = useState({}); // Erros por campo
    const [success, setSuccess] = useState(null);
    const [selectedProfile, setSelectedProfile] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                setError('Erro ao buscar perfil');
            }
        };

        fetchProfile();
    }, []);

    const validarCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false;
        }
        let soma = 0;
        let resto;
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    };

    const formatarCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, '');
        return cpf
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const handleCpfChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) {
            return;
        }
        const cpfFormatado = formatarCPF(value);
        setCpf(cpfFormatado);
        if (value && !validarCPF(value)) {
            setCpfError('CPF inválido');
        } else {
            setCpfError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            nome,
            login,
            senha,
            cpf: cpf.replace(/\D/g, ''),
            e_mail,
            id_perfil: parseInt(selectedProfile),
        };

        if (!nome || !login || !senha || !cpf || !selectedProfile || !e_mail) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            setFieldErrors({});
            setSuccess(null);
            return;
        }

        if (cpfError) {
            setError('Corrija o CPF antes de salvar.');
            setFieldErrors({});
            setSuccess(null);
            return;
        }

        try {
            await createUser(userData);
            setSuccess('Usuário criado com sucesso!');
            setError(null);
            setFieldErrors({});
            setNome('');
            setLogin('');
            setSenha('');
            setCpf('');
            setE_mail('');
            setSelectedProfile('');
            navigate('/');
        } catch (error) {
            if (error.response?.data) {
                const errors = error.response.data;
                // Lidar com erros de validação do serializer
                const newFieldErrors = {};
                if (errors.cpf) newFieldErrors.cpf = errors.cpf[0];
                if (errors.login) newFieldErrors.login = errors.login[0];
                if (errors.e_mail) newFieldErrors.e_mail = errors.e_mail[0];
                if (errors.senha) newFieldErrors.senha = errors.senha[0];
                if (errors.non_field_errors) {
                    setError(errors.non_field_errors[0]);
                } else if (Object.keys(newFieldErrors).length > 0) {
                    setFieldErrors(newFieldErrors);
                    setError(null);
                } else {
                    setError('Erro ao criar o usuário.');
                }
            } else {
                setError('Erro ao criar o usuário.');
            }
            setSuccess(null);
        }
    };

    return (
        <section className='content_form'>
            <form className='form_content' onSubmit={handleSubmit}>
                <Campotexto
                    label="Nome"
                    for="nome"
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    error={fieldErrors.nome}
                />
                <Campotexto
                    label="Login"
                    for="login"
                    id="login"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    error={fieldErrors.login}
                />
                <Campotexto
                    label="Senha"
                    for="senha"
                    id="senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    error={fieldErrors.senha}
                />
                <Campotexto
                    label="CPF"
                    for="cpf"
                    id="cpf"
                    type="text"
                    value={cpf}
                    onChange={handleCpfChange}
                    error={cpfError || fieldErrors.cpf}
                />
                <ListaSuspensa
                    label="Perfil"
                    for="perfil"
                    id="perfil"
                    itens={profile}
                    value={selectedProfile}
                    onChange={(e) => setSelectedProfile(e.target.value)}
                    error={fieldErrors.id_perfil}
                />
                <Campotexto
                    label="Email"
                    for="email"
                    id="email"
                    type="email"
                    value={e_mail}
                    onChange={(e) => setE_mail(e.target.value)}
                    error={fieldErrors.e_mail}
                />
                <div className='container_btn'>
                    <ButtonSub nameBtn="Cadastrar" />
                </div>
            </form>
            {error && <p className="color_laranja">{error}</p>}
            {success && <p className="color_laranja">{success}</p>}
        </section>
    );
};