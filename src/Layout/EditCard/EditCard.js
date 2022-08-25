///decks/:deckId/cards/:cardId/edit 
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import CardForm from "../common/CardForm";

export default function EditCard({deck, setDeck}){
//---state and hooks---
    const history = useHistory();
    const [card, setCard] = useState({});
    const {deckId, cardId} = useParams();
    
//---effect---
    useEffect(()=>{
        const abortController = new AbortController();
        async function loadDeckInfo(){
            try{
                setDeck(await readDeck(deckId, abortController.signal));
                setCard(await readCard(cardId));
            }catch (err){
                if (err.name === "AbortError"){
                    //ignore user abort
                }else throw err 
            };
        };
        loadDeckInfo();
        return () => abortController.abort();
    }, []);
    
//---handler---
    const handleSubmit = async(event) => {
        event.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deckId}`);
    };
    
    /*No handleCancel function is written here for simplicity
    It's a one line function written directly into the Cancel button's event listener in CardForm.js 
    The cancel button pushes the user back to the deck page*/

//---return---
    return <CardForm deck={deck} card={card} setter={setCard} handleSubmit={handleSubmit}/>
};