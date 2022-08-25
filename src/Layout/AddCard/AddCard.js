///decks/:deckId/cards/new
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom"
import { readDeck, createCard } from "../../utils/api";
import CardForm from "../common/CardForm";

export default function AddCard({deck, setDeck}){
//---misc.  hooks---
    const history = useHistory();
    const { deckId } = useParams();
    
//---state---
    const INIT_NEW_CARD = {front: "", back: "", deckId: deckId};
    const [newCard, setNewCard] = useState(INIT_NEW_CARD);

//---effects---   
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeckInfo(){
            try{
                setDeck(await readDeck(deckId, abortController.signal));
            }catch (err){
                if (err.name === "AbortError"){
                    //ignore user abort
                }else throw err 
            };
        };
        loadDeckInfo();
        return () => abortController.abort();
    }, []);
    
//---handlers---
    const handleSubmit = async(event) => {
        event.preventDefault();
            //if user puts nothing in the fields and accidentally clicks done,
            //no card is made and they are brought back to the deck page
            if(newCard.front === "" && newCard.back === "") {
                history.push(`/decks/${deckId}`);
            }else {
                //adds the new card to the deck 
                await createCard(deckId, newCard);
                //clears the form and resets the state
                setNewCard(INIT_NEW_CARD);
                history.push(`/decks/${deckId}`);
            };
    };

    const handleSaveNewCard = async() =>{
        await createCard(deckId, newCard);
        setNewCard(INIT_NEW_CARD);
    };

//---return---
    return <CardForm deck={deck} card={newCard} setter={setNewCard} handleSubmit={handleSubmit} handleSaveNewCard={handleSaveNewCard}/>
};