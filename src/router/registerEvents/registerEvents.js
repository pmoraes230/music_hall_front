import FooterForm from "components/Footers/FooterForm"
import FormWithArea from "components/Formularios/FormWithArea"
import NavBarPage from "components/navBarPage"

export const registerEvents = () => {
    return (
        <div>
            <NavBarPage/>
            <h1 className="center space sub_title">Cadastro Evento</h1>
            <FormWithArea/>
            <FooterForm/>
        </div>
    )
}