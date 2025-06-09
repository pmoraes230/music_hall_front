import './CampFile.css';
import { useState } from 'react';

export const CampFile = (props) => {
    const [filename, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // Atualiza o nome do arquivo selecionado
        } else {
            setFileName(''); // Limpa o nome do arquivo se nenhum for selecionado
        }
        if (props.onChange) {
            props.onChange(file); // Passa o arquivo selecionado para o callback `onChange`
        }
    };

    return (
        <div className="mb-3 content_text">
            <label htmlFor={props.id || 'file'} className='form-label color_laranja body_fonts label_input label_file'>
                {filename || props.label} {/* Exibe o nome do arquivo ou o label padrão */}
            </label>
            <input
                type='file'
                name={props.name || 'file'}
                id={props.id || 'file'}
                className='form-control input_hall color_laranja'
                onChange={handleFileChange} // Chama a função `handleFileChange` ao selecionar um arquivo
            />
        </div>
    );
};