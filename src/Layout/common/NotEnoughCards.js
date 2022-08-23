import { useHistory } from "react-router-dom"
export default function NotEnoughCards({deck}){
    const history = useHistory();
    const addCardsClickHandler = ()=>{
        history.push(`/decks/${deck.id}/cards/new`)
    }

    return(
        <div>
            <h3>Not enough cards.</h3>
            <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
            <button 
                className="btn btn-primary"
                onClick={addCardsClickHandler}
                >Add Cards</button>
        </div>
    )
}