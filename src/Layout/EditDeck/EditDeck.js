import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import DeckForm from "../common/DeckForm";

export default function EditDeck({deck, setDeck}){
//---misc. hooks---
    const history = useHistory();
    const { deckId } = useParams();

//---effect---
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck(){
            try{
            //once this page is loaded, the deckId param is pulled from the url to set the current deck
            //even when refreshed, the page is still working with the deck's most recent state
            setDeck(await readDeck(deckId, abortController.signal));
            }catch(err){
                if (err.name === "AbortError"){
                    //ignore user abort
                }else throw err;
            };
        };
        loadDeck();
        return () => abortController.abort();
    },[deckId]);

//---handlers---
    const handleSubmit = async (event) => {
        event.preventDefault();
        //the deck data is updated before the user is pushed back to the deck page
        //this way, the moment it renders, it renders with the updated data
        await updateDeck(deck);
        history.push(`/decks/${deck.id}`);
    };

    const handleCancel = () => history.push(`/decks/${deck.id}`);

//---return---
    return (
        //depends on deck.id to make sure the inputs in DeckForm that are sent from the deck stay controlled
        //DeckForm renders only once deck is set and the inputs in DeckForm are then controlled from deck's properties
        deck.id ? <DeckForm deck={deck} setter={setDeck} handleSubmit={handleSubmit} handleCancel={handleCancel}/>
        : <p>loading</p>
    )
};