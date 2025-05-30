import './ListaSuspensa.css'

export const ListaSuspensa = (props) => {
    return(
        <div className='mb-3 content_text'>
            <label htmlFor={props.for} className='form-label color_laranja body_fonts'>{props.label}</label>
            <select required={props.required} id={props.id} className='form-control input_hall color_laranja'>
                {props.itens.map(item => {
                    return <option key={item}>{item}</option>
                })}
            </select>
        </div>
    )
}