import Formulario from 'components/Formulario'
import './registerUser.css'
import NavBarPage from "components/navBarPage"

export const registerUser = () => {
    return (
        <div>
            <NavBarPage/>
            <div className="container_title">
                <h1 className="title">Cadastro de Usuário</h1>
                <Formulario/>
            </div>
        </div>
    )
}