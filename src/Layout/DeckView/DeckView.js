import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardList from "./CardList";

export default function DeckView({deck, setDeck}){
    const history = useHistory();
    const {deckId} = useParams();
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
    }, [deck.id])

//---handlers---
    const handleStudyClick = ()=>{
        history.push(`/decks/${deck.id}/study`)
    }

    const handleEditClick = () =>{
        history.push(`/decks/${deck.id}/edit`)
    }

    const handleAddCardsClick = ()=>{
        history.push(`/decks/${deck.id}/cards/new`)
    }
//---return---
    return (
        <div className="container">
            {/* <BreadCrumb location={window.location}/> */}
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <div className="row px-3 justify-content-between mb-4">
                <div>
                    <button className="btn btn-secondary mr-2"
                        onClick={handleEditClick}>Edit</button>
                    <button className="btn btn-primary mr-2"
                        onClick={handleStudyClick}>Study</button>
                    <button className="btn btn-success"
                        onClick={handleAddCardsClick}>Add Cards</button>
                </div>
                <div>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>

            <h3>Cards</h3>
            <div>
                {deck.cards && <CardList deck={deck} setDeck={setDeck}/>}
            </div>
        </div>
    )
}