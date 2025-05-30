import FormularioWithSelect from 'components/Formularios/FormularioWithSelect'
import './registerUser.css'
import NavBarPage from "components/navBarPage"
import FooterForm from 'components/Footers/FooterForm'

export const registerUser = () => {
    return (
        <div>
            <NavBarPage/>
            <div className="container_form">
                <h1 className="center space sub_title">Cadastro de Usuário</h1>
                <FormularioWithSelect/>
                <FooterForm/>
            </div>
        </div>
    )
}