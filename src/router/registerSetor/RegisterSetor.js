import FooterForm from "components/Footers/FooterForm"
import { Form } from "components/Formularios/Form/Form"
import NavBarPage from "components/navBarPage"

export const RegisterSetor = () => {
    return(
        <div>
            <NavBarPage/>
            <h1 className="center space sub_title">Cadastro Setor</h1>
            <Form/>
            <FooterForm/>
        </div>
    )
}