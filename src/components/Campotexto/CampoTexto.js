import './Campotexto.css'

export const Campotexto = (props) => {
    return (
        <div className="mb-3 content_text">
            <label className="form-label color_laranja body_fonts">{props.label}:</label>
            <input required={props.required} type={props.type} className="form-control input_hall color_laranja"/>
        </div>
    )
}