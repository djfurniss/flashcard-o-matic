import React , { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck, readDeck } from "../../utils/api";
import DeckInfoCard from "./DeckInfoCard";

export default function DeckList({decks, setDeck, setDecks}){

//---hooks---
  const history = useHistory();

//---handlers---
  const handleViewClick = async (deck) => {
    history.push(`/decks/${deck.id}`);
  }

  const handleStudyClick = (deck) => {
    setDeck(deck)
    history.push(`/decks/${deck.id}/study`)
  }

  const handleDeleteDeck = async (id) =>{
    try{
      window.confirm("Are you sure you want to delete this deck?") && await deleteDeck(id);

    }catch (err){
      console.log(err)
    }
  }

  // useEffect(()=>{
  //   const abortController = new AbortController();
  //     async function _deleteDeck(idToDel){
  //       try{
  //       window.confirm("Are you sure you want to delete this deck?")
  //       const response = await deleteDeck(idToDel, abortController.signal)
  //       console.log(response)
  //       }catch(err){
  //         if(err.name === "AbortError"){
  //           console.log("aborted")
  //         }else throw err.message
  //       };
  //     };
  //   idToDel && _deleteDeck(idToDel);
  // },[idToDel]);

//---return---
  return(
    <>
      {decks.map(deck => {
      return <DeckInfoCard 
        key={deck.id} 
        deck={deck} 
        handleViewClick={()=>handleViewClick(deck)}
        handleStudyClick={()=>handleStudyClick(deck)}
        handleDeleteDeck={()=>handleDeleteDeck(deck.id)}/>
    })}
    </>
  )
}