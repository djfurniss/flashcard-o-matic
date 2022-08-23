import React , { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck, listDecks} from "../../utils/api";
import DeckListCard from "./DeckListCard";

export default function DeckList({decks, setDeck, setDecks}){
//---hooks---
  const history = useHistory();

//---handlers---
  const handleViewClick = (deck) => {
    setDeck(deck);
    history.push(`/decks/${deck.id}`);
  };

  const handleStudyClick = (deck) => {
    setDeck(deck);
    history.push(`/decks/${deck.id}/study`);
  };

  const handleDeleteClick = async (id) =>{
    try{
      window.confirm("Are you sure you want to delete this deck?") && await deleteDeck(id);
      setDecks(await listDecks());
    }catch (err){
      throw err
    }
  };

//---return---
  return(
    <div>
      {decks.map(deck => {
        return <DeckListCard 
          key={deck.id} 
          deck={deck} 
          handleViewClick={()=>handleViewClick(deck)}
          handleStudyClick={()=>handleStudyClick(deck)}
          handleDeleteClick={()=>handleDeleteClick(deck.id)}/>
    })}
    </div>
  )
}