import React, { useState, useEffect } from 'react';
import Campotexto from 'components/Campotexto';
import './Formulario.css';
import ListaSuspensa from 'components/ListaSuspensa';
import ButtonSub from 'components/Button/';
import getProfile from 'api/profile/getProfile';
import { createUser } from 'api/user/apiCrudUsuario';

export const FormularioWithSelect = () => {
    const [nome, setNome] = useState('');
    const [login, setlogin] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [profile, setProfile] = useState(null)
    const [e_mail, setE_mail] = useState('');
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [selectedProfile, setSelectedProfile] = useState('');

    useEffect(() =>{
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data)
            } catch (error) {
                setError('Erro ao buscar perfil')
            }
        };

        fetchProfile();
    }, []) 
    
    const validarCPF = (cpf) => {
        // Remove caracteres não numéricos
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
            nome: nome,
            login: login,
            cpf: cpf,
            perfil: selectedProfile,
            e_mail: e_mail, 
            senha: senha
        }

        if (!nome || !login || !cpf || !selectedProfile || !e_mail || !senha) {
            setError('Por favor, preencha todos os campos obrigatórios.')
            setSuccess(null)
            return
        }

        try {
            const response = await createUser(userData);
            console.log(response)
            setSuccess("Usuário criado com sucesso!");
            setError(null)

            setNome('');
            setlogin('');
            setCpf('');
            setE_mail('');
            setSenha('');
        } catch (error) {
            setError(error.response?.data?.message || "Erro ao criar o usuário. Tente novamente.");
            console.error("Erro ao criar usuário:", error);
            setSuccess(null)
        }

    }

    return (
        <section className='content_form'>
            <form className='form_content' onSubmit={handleSubmit}>
                <Campotexto label="Nome" for="nome" type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                <Campotexto label="Login" for="login" id="login" type="text" value={login} onChange={(e) => setlogin(e.target.value)}/>
                <Campotexto label="Senha" for="senha" id="senha" type="text" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                <Campotexto label="CPF" for="cpf" id="cpf" type="text" value={cpf} onChange={handleCpfChange} />
                {cpfError && <span className="error">{cpfError}</span>}
                <ListaSuspensa label="Perfil" for="perfil" id="perfil" itens={profile} value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)}/>
                <Campotexto label="Email" for="email" id="email" type="email" value={e_mail} onChange={(e) => setE_mail(e.target.value)}/>
                <div className='container_btn'>
                    <ButtonSub nameBtn="Cadastrar" />
                </div>
            </form>
            {error && <p className="color_laranja">{error}</p>}
            {success && <p className="color_laranja">{success}</p>}
        </section>
    );
};