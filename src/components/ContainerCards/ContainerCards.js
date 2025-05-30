import "./ContainerCards.css"

export const ContainerCards = (props) => {
    return (
        <button className="card_show btn">
            <figure className="img_card"><img src={props.img} alt={props.altImg} /></figure>
            <div className="container_letter">
                <h2 className="letter_card">Nome: <span className="title_span">{props.name}</span></h2>
                <h2 className="letter_card">Show: <span className="title_span">{props.Show}</span></h2>
                <h2 className="letter_card">Idade: <span className="title_span">{props.category}</span></h2>
            </div>
        </button>
    )
}