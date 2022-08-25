import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck, listDecks} from "../../utils/api";
import DeckListCard from "./DeckListCard";

export default function DeckList({decks, setDecks}){
//---misc. hooks---
  const history = useHistory();

//---handler---
    const handleClick = async({target}, deck) =>{
        //each button has a unique name that ties to its functionality
        //this condition is based on the name of the button clicked
      if (target.name === "view") history.push(`/decks/${deck.id}`)
      else if (target.name === "study") history.push(`/decks/${deck.id}/study`)
      else if ( target.name === "delete"){
        try{
          //window.confirm's boolean evaluating to true will result in the deck being deleted
        window.confirm("Are you sure you want to delete this deck?") && await deleteDeck(deck.id)
          //once the deck is deleted, this page will setDecks and rerender without the deleted deck
        setDecks(await listDecks());
        }catch (err) {throw err};
      };
    };

//---return---
  return(
    <div className="mb-4">
      {decks.map(deck => {
        return <DeckListCard 
          key={deck.id} 
          deck={deck} 
          handleClick={(event)=>handleClick(event, deck)}/>
      })}
    </div>
  )
}