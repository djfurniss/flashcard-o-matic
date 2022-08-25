import React from "react";
import { useHistory, useParams } from "react-router-dom";

export default function NotEnoughCards({cardsAmount}){
//---hook---
    const history = useHistory();
    const { deckId } = useParams()
//---handler---
    const handleAddCards = () => history.push(`/decks/${deckId}/cards/new`);

//---return---
    return(
        <div className="mb-4">
            <h3>Not enough cards.</h3>
            <p>You need at least 3 cards to study. There are {cardsAmount} cards in this deck.</p>
            <button 
                className="btn btn-success"
                onClick={handleAddCards}
                autoFocus>
                Add Cards
            </button>
        </div>
    )
};