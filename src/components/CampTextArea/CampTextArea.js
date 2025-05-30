import './CampTextArea.css'

export const CampTextArea = (props) => {
    return (
        <div className="mb-3">
            <label className="form-label color_laranja body_fonts">{props.label}:</label>
            <textarea className="form-control input_hall color_laranja textarea_input" onChange={props.onChange} value={props.value}></textarea>
        </div>
    )
}