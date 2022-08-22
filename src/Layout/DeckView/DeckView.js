import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import BreadCrumb from "../common/BreadCrumb";

export default function DeckView({deck, setDeck}){
    const history = useHistory();
    const {deckId} = useParams();
    // console.log(deckId)
//---effects---
    useEffect(()=>{
        const abortController = new AbortController();
        async function loadDeckInfo(){
            try{
                const deckInfoFromAPI = await readDeck(deckId, abortController.signal);
                setDeck(deckInfoFromAPI)
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
    const handleStudyClick = ()=>{
        history.push(`/decks/${deck.id}/study`)
    }

    const handleEditClick = () =>{
        history.push(`/decks/${deck.id}/edit`)
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
                    <button className="btn btn-success">Add Cards</button>
                </div>
                <div>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>

            <h3>Cards</h3>
            <div>
                {deck.cards && deck.cards.map(card=>{
                    return (
                        <div className="list-group-item" key={card.id}>
                            <div className="row">
                                <div className="col">
                                    <p>{card.front}</p>
                                </div>
                                <div className="col">
                                    <p>{card.back}</p>
                                </div>
                            </div>
                            <div className="row justify-content-end">
                                <button className="btn btn-secondary mx-2">Edit</button>
                                <button className="btn btn-danger mx-2">Delete</button>
                            </div>
                        </div>
                    );
                })};
            </div>
        </div>
    )
}