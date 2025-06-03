import './CampoSenha.css'
import { useState } from 'react'

export const CampWithPassword = (props) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="mb-3">
            <label className="form-label color_laranja body_fonts">{props.label}:</label>
            <div className="group-password">
                <input type={showPassword ? "text" : "password"} className='form-control input_hall color_laranja' onChange={props.onChange} value={props.value}/>
                <img className="eyes_icon" onClick={togglePasswordVisibility} src={showPassword ? "./icons/eye-open.svg" : "./icons/eye-closed.svg"} alt="icon-eyes"/>
            </div>
        </div>
    )
}