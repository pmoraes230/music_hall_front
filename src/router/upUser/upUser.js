import FooterForm from "components/Footers/FooterForm"
import FormularioUsuario from "components/Formularios/FormularioUpdate"
import NavBarPage from "components/navBarPage"

export const upUser = () => {
    return (
        <div>
            <NavBarPage/>
            <div className="container_form">
                <h1 className="center space-12 sub_title">Edição de Usuário</h1>
                <FormularioUsuario/>
            </div>
            <FooterForm/>
        </div>
    )
}