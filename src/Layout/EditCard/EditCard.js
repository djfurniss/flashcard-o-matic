///decks/:deckId/cards/:cardId/edit 
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import CardForm from "../common/CardForm";

export default function EditCard({deck, setDeck}){
//---state and hooks---
    const history = useHistory();
    const [card, setCard] = useState({})
    const {deckId, cardId} = useParams();
    
//---effect---
    useEffect(()=>{
        const abortController = new AbortController();
        async function loadDeckInfo(){
            try{
                const deckInfoFromAPI = await readDeck(deckId, abortController.signal);
                const cardFromAPI = await readCard(cardId)
                await setDeck(deckInfoFromAPI);
                setCard(cardFromAPI);
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
        await updateCard(card);
        history.push(`/decks/${deckId}`)
    }

//---return---
    return (
        <CardForm deck={deck} card={card} setCard={setCard} submitHandler={submitHandler}/>
    ) 
}