import React, { useState } from 'react';
import Campotexto from 'components/Campotexto';
import './Formulario.css';
import ListaSuspensa from 'components/ListaSuspensa';
import ButtonSub from 'components/Button/';

export const FormularioWithSelect = () => {
    const [cpf, setCpf] = useState('');
    const [cpfError, setCpfError] = useState('');

    const perfis = [
        'Administrador',
        'Vendedor',
        'Leitor'
    ];

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

    return (
        <section className='content_form'>
            <form className='form_content'>
                <Campotexto required={true} label="Nome" for="nome" type="text" id="nome"/>
                <Campotexto required={true} label="Usuario" for="usuario" id="usuario" type="text" />
                <Campotexto required={true} label="CPF" for="cpf" id="cpf" type="text" value={cpf} onChange={handleCpfChange} />
                {cpfError && <span className="error">{cpfError}</span>}
                <ListaSuspensa required={true} label="Perfil" for="perfil" id="perfil" itens={perfis} />
                <Campotexto required={true} label="Email" for="email" id="email" type="email" />
                <div className='container_btn'>
                    <ButtonSub nameBtn="Cadastrar" />
                </div>
            </form>
        </section>
    );
};