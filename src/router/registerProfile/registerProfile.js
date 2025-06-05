import NavBarPage from "components/navBarPage";
import FooterForm from "components/Footers/FooterForm";
import FormProfile from "components/Formularios/FormProfile";

export const registerProfile = () => {
    return (
        <div>
            <NavBarPage/>
            <h1 className="center space sub_title">Cadastro Perfil</h1>
            <FormProfile/>
            <FooterForm/>
        </div>
    )
}