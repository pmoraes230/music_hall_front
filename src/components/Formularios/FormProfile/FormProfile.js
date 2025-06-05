import ButtonSub from "components/Button";
import Campotexto from "components/Campotexto";
import CampTextArea from "components/CampTextArea";
import "./FormProfile.css";
import { useState } from "react";
import { createProfile } from "api/profile/crudProfile";

export const FormProfile = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const profileData = {
            nome: nome,
            descricao: descricao
        };

        if (!nome || !descricao) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            setSuccess(null);
            return;
        }

        try {
            createProfile(profileData);
            setSuccess("Perfil criado com sucesso!");
            setError(null)
        } catch (error) {
            setError("Erro ao criar perfil. Tente novamente.");
            setSuccess(null);
            
        }
        setNome('');
        setDescricao('');
    }

    return (
        <section className="content_form">
            <form className="form_content" onSubmit={handleSubmit}>
                <Campotexto label="Nome" for="nome" type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                <CampTextArea label="Descrição" for="descricao" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
                <div className='container_btn'>
                    <ButtonSub nameBtn="Entrar" />
                </div>
            </form>
            {error && <div className="color_laranja">{error}</div>}
            {success && <div className="color_laranja">{success}</div>}
        </section>
    )
}