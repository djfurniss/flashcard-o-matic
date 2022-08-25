import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import DeckForm from "../common/DeckForm";

export default function CreateDeck(){
//---misc. hooks---
    const history = useHistory();

//---state---
    const [newDeck, setNewDeck] = useState({name: "", description: ""})

//---handlers---
    const handleSubmit = async (event) => {
        event.preventDefault();
        //the deck is submitted and triggers a POST request
        const postedNewDeck = await createDeck(newDeck);
        //the request response holds an id that can then be used to push the user to the new deck's page
        history.push(`/decks/${postedNewDeck.id}`);
    };
    
    const handleCancel = () => history.push("/");
    
//---return---
    return (
        <div className="mb-3">
            <h1>Create Deck</h1>
            <DeckForm deck={newDeck} setter={setNewDeck} handleSubmit={handleSubmit} handleCancel={handleCancel}/>
        </div>
    )
};