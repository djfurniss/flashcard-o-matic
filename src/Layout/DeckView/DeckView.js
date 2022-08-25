import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, deleteDeck} from "../../utils/api";
import CardList from "./CardList";

export default function DeckView({deck, setDeck}){
//---misc. hooks---
    const history = useHistory();
    const { deckId } = useParams();
    
//---effects---
    useEffect(()=>{
        const abortController = new AbortController();
        async function loadDeckInfo(){
            try{
                const deckInfoFromAPI = await readDeck(deckId, abortController.signal);
                await setDeck(deckInfoFromAPI);
            }catch (err){
                if (err.name === "AbortError"){
                    //ignore user abort
                }else throw err 
            };
        };
        loadDeckInfo();
        return ()=>abortController.abort();
    }, []);

//---handler---
    const handleClick = async({target}) => {
        //unless a deck is being deleted, it's just pushing the user to another page
        //every button except delete has a value attribute that is set to the path it will push to
        if (target.name === "delete"){
            window.confirm("Are you sure you want to delete this deck?") &&
            await deleteDeck(deckId) &&
            history.push("/");
        }else history.push(`/decks/${deck.id}/${target.value}`)
    };

//---return---
    return (
        <div className="container">
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <div className="row px-3 justify-content-between mb-4">{/* buttons */}
                <div>
                    <button 
                        name="edit"
                        value="edit"
                        onClick={handleClick}
                        className="btn btn-secondary mr-2">
                        Edit
                    </button>
                    <button 
                        name="study"
                        value="study"
                        onClick={handleClick}
                        className="btn btn-primary mr-2">
                        Study
                    </button>
                    <button 
                        name="add"
                        value="cards/new"
                        onClick={handleClick}
                        className="btn btn-success">
                        Add Cards
                    </button>
                </div>
                <div>
                    <button 
                        name="delete"
                        onClick={handleClick}
                        className="btn btn-danger">
                        Delete
                    </button>
                </div>
            </div>
        {deck.cards && <CardList deck={deck} setDeck={setDeck}/>}
        </div>
    )
};