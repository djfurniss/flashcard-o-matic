// import { createCard } from "../../utils/api"
// import BreadCrumb from "../common/BreadCrumb";
import { useEffect, useState } from "react";
import DeckForm from "../common/DeckForm"

export default function CreateDeck({decks, setDecks}){
    
    const [newDeck, setNewDeck] = useState({name: "", description: ""})
    

    const submitHandler = (event)=>{
        event.preventDefault();
        // setDecks([...decks, newDeck])
    }
    
    return (
        <>
        {/* <BreadCrumb breadcrumb={['Create Deck']}/> */}
        <DeckForm deck={newDeck} setNewDeck={setNewDeck} submitHandler={submitHandler}/>
        </>
    )
}