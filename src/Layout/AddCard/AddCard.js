///decks/:deckId/cards/new
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom"
import { readDeck, createCard } from "../../utils/api";
import CardForm from "../common/CardForm"

export default function AddCard({deck, setDeck}){
//---state and hooks---
const history = useHistory();
const {deckId} = useParams();
const [newCard, setNewCard] = useState({front: "", back: "", deckId: deckId})

//---effects---   
    useEffect(()=>{
        const abortController = new AbortController();
        async function loadDeckInfo(){
            try{
                const deckInfoFromAPI = await readDeck(deckId, abortController.signal);
                await setDeck(deckInfoFromAPI);
            }catch (err){
                if (err.name === "AbortError"){
                    console.log("aborted")
                }else throw err 
            };
        };
        
        loadDeckInfo();
        
        return ()=>abortController.abort();
    }, [])
    
//---handlers---
    const submitHandler = async(event) =>{
        event.preventDefault();
            if(newCard.front === "" && newCard.back === "") {
                history.push(`/decks/${deckId}`)
            }else {
                await createCard(deckId, newCard);
                setNewCard({front: "", back: "", deckId: null})
                history.push(`/decks/${deckId}`)
            }
    }

    const handleSaveNewCard = ()=>{
        createCard(deckId, newCard);
        setNewCard({front: "", back: "", deckId: deckId});
    }

    return (
        <CardForm deck={deck} card={newCard} setNewCard={setNewCard} submitHandler={submitHandler} handleSaveNewCard={handleSaveNewCard}/>
    )
}