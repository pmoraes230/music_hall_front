import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Campotexto from 'components/Campotexto';
import './Formulario.css';
import ListaSuspensa from 'components/ListaSuspensa';
import ButtonSub from 'components/Button/';
import getProfile from 'api/profile/getProfile';
import { createUser, updateUsers, getUserById, deleteUser } from 'api/user/apiCrudUsuario';
import { Modal, Button } from 'react-bootstrap';

export const FormularioUsuario = ({ userId, onSuccess }) => {
    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [e_mail, setE_mail] = useState('');
    const [selectedProfile, setSelectedProfile] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isEditMode, setIsEditMode] = useState(!!userId || !!localStorage.getItem('userId'));
    const [showModal, setShowModal] = useState(false);
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

        const fetchUser = async () => {
            const fetchId = userId || localStorage.getItem('userId');
            if (!fetchId) {
                setError('Nenhum ID de usuário fornecido para edição');
                return;
            }
            try {
                const userData = await getUserById(fetchId);
                setNome(userData.nome || '');
                setLogin(userData.login || '');
                setCpf(formatarCPF(userData.cpf || ''));
                setE_mail(userData.e_mail || '');
                setSelectedProfile(userData.id_perfil ? userData.id_perfil.toString() : '');
            } catch (error) {
                setError(error.message || 'Erro ao buscar dados do usuário');
            }
        };

        fetchProfile();
        setIsEditMode(!!userId || !!localStorage.getItem('userId'));
        if (isEditMode) {
            fetchUser();
        }
    }, [userId, isEditMode]);

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
        if (resto !== parseInt(cpf.substring(9, 10))) {
            return false;
        }
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) {
            return false;
        }
        return true;
    };

    const formatarCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, '');
        const formatted = cpf
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return formatted;
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
            cpf: cpf.replace(/\D/g, ''),
            id_perfil: parseInt(selectedProfile),
            e_mail,
            ...(senha && { senha }),
        };

        if (!nome || !login || !cpf || !selectedProfile || !e_mail || (!isEditMode && !senha)) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            setSuccess(null);
            return;
        }

        if (cpfError) {
            setError('Corrija o CPF antes de salvar.');
            setSuccess(null);
            return;
        }

        try {
            if (isEditMode) {
                const localUserId = localStorage.getItem('userId');
                if (!localUserId) {
                    throw new Error('Nenhum ID de usuário encontrado para atualização');
                }
                await updateUsers(userData);
                setSuccess('Usuário atualizado com sucesso!');
            } else {
                await createUser(userData);
                setSuccess('Usuário criado com sucesso!');
            }
            setError(null);
            setSenha('');
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            setError(error.message || `Erro ao ${isEditMode ? 'atualizar' : 'criar'} o usuário.`);
            setSuccess(null);
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmDelete = async () => {
        const deleteId = userId || localStorage.getItem('userId');
        if (!deleteId) {
            setError('Nenhum ID de usuário encontrado para exclusão');
            setShowModal(false);
            return;
        }
        try {
            await deleteUser(deleteId);
            setSuccess('Usuário excluído com sucesso!');
            setError(null);
            setShowModal(false);
            setIsEditMode(false);
            // Limpar dados de autenticação e redirecionar para a tela de login
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
            navigate('/');
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            setError(error.message || 'Erro ao excluir o usuário.');
            setSuccess(null);
            setShowModal(false);
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
                />
                <Campotexto
                    label="Login"
                    for="login"
                    id="login"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <Campotexto
                    label="Senha"
                    for="senha"
                    id="senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder={isEditMode ? 'Deixe em branco para não alterar' : 'Digite a senha'}
                />
                <Campotexto
                    label="CPF"
                    for="cpf"
                    id="cpf"
                    type="text"
                    value={cpf}
                    onChange={handleCpfChange}
                    readOnly={true}
                />
                {cpfError && <span className="error">{cpfError}</span>}
                <ListaSuspensa
                    label="Perfil"
                    for="perfil"
                    id="perfil"
                    itens={profile}
                    value={selectedProfile}
                    onChange={(e) => setSelectedProfile(e.target.value)}
                />
                <Campotexto
                    label="Email"
                    for="email"
                    id="email"
                    type="email"
                    value={e_mail}
                    onChange={(e) => setE_mail(e.target.value)}
                />
                <div className='container_btn'>
                    <ButtonSub nameBtn={isEditMode ? 'Atualizar' : 'Criar'} />
                    {isEditMode && (
                        <button type="button" onClick={handleShowModal} className="btn_delete">
                            Excluir
                        </button>
                    )}
                </div>
            </form>
            {error && <p className="color_laranja">{error}</p>}
            {success && <p className="color_laranja">{success}</p>}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
};