// import { createCard } from "../../utils/api"
// import BreadCrumb from "../common/BreadCrumb";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import DeckForm from "../common/DeckForm"

export default function CreateDeck({decks, setDecks}){
    const history = useHistory();
    const [newDeck, setNewDeck] = useState({name: "", description: ""})
    
    const submitHandler = async (event)=>{
        event.preventDefault();
        const response = await createDeck(newDeck)
        history.push(`/decks/${response.id}`)
    }
    
    const cancelHandler = ()=>{
        history.push("/")
    }

    return (
        <>
        <h1>Create Deck</h1>
        <DeckForm deck={newDeck} setNewDeck={setNewDeck} submitHandler={submitHandler} cancelHandler={cancelHandler}/>
        </>
    )
}