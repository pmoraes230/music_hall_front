import SeatBooking from 'components/SeatBooking'
import './assentos.css'
import NavBarPage from "components/navBarPage"

export const assentsEvents = () => {
    return (
        <div>
            <NavBarPage/>
            <div className="container my-4">
                <h1 className="text-center mb-4 color_laranja">Seleção de Cadeiras para Eventos</h1>
                <SeatBooking/>
            </div>
        </div>
    )
}