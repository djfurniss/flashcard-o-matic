import React from "react";
import { useHistory } from "react-router-dom";
import { deleteCard, readDeck } from "../../utils/api";

export default function CardList({ deck, setDeck }) {
//---misc. hooks---
    const history = useHistory();

//---handler---
  const handleClick = async({target}, cardId) => {
    if (target.name === "edit") history.push(`/decks/${deck.id}/cards/${cardId}/edit`);
    if (target.name === "delete"){
      try {
        window.confirm("Are you sure you want to delete this card?") && await deleteCard(cardId);
        setDeck(await readDeck(deck.id));
      } catch (err) {throw err}
    };
  };

//---return---
  return (
    <div>
      <h3>Cards</h3>
      <div className="list-group mb-4">
          {deck.cards.map(card => {
            return (
              <div className="list-group-item" key={card.id}> 
                <div className="row">
                  <div className="col">
                    <p>{card.front}</p>
                  </div>
                  <div className="col">
                    <p>{card.back}</p>
                  </div>
                </div>
                <div className="row justify-content-end"> {/*Buttons*/}
                    <button 
                      name="edit"
                      className="btn btn-secondary mx-2"
                      onClick={(event)=>handleClick(event, card.id)}>
                      Edit
                    </button>
                    <button 
                      name="delete"
                      className="btn btn-danger mx-2"
                      onClick={(event)=>handleClick(event, card.id)}>
                      Delete
                    </button>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
};
