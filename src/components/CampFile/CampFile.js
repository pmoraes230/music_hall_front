import './CampFile.css';
import { useState } from 'react';

export const CampFile = (props) => {
    const [filename, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file){
            setFileName(file.name);
        } else {
            setFileName('');
        }
        if (props.onchange) {
            props.onchange(event);
        }
    }

    return (
        <div className="mb-3 content_text">
            <label htmlFor='file' className='form-label color_laranja body_fonts label_input label_file'>
                {filename || props.label}
            </label>
            <input type='file' name='file' id='file' onClick={handleFileChange} value={props.value} className='form-control input_hall color_laranja'/>
        </div>
    );
};