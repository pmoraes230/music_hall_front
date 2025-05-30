import './Campotexto.css';

export const Campotexto = (props) => {
    return (
        <div className="mb-3 content_text">
            <label htmlFor={props.for} className="form-label color_laranja body_fonts">{props.label}:</label>
            <input required={props.required} name={props.name} id={props.id} type={props.type} className="form-control input_hall color_laranja" value={props.value} onChange={props.onChange}
            />
            {props.error && <span className="error">{props.error}</span>} {/* Exibe mensagem de erro, se houver */}
        </div>
    );
};