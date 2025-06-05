import './ListaSuspensa.css';

export const ListaSuspensa = (props) => {
    return (
        <div className='mb-3 content_text'>
            <label htmlFor={props.for} className='form-label color_laranja body_fonts'>
                {props.label}
            </label>
            <select required={props.required} id={props.id} onChange={props.onChange} className='form-control input_hall color_laranja'>
                <option value="" disabled>
                    Selecione uma opção
                </option>
                {props.itens &&
                    props.itens.map((item, index) => {
                        return (
                            <option key={index} value={item.id}>
                                {item.nome}
                            </option>
                        );
                    })}
            </select>
        </div>
    );
};