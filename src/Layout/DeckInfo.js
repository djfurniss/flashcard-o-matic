import { useEffect } from "react"
import { readDeck } from "../utils/api"

export default function DeckInfo({deck}){

    useEffect(()=>{
        async function loadDeck(){
            const response = await readDeck(deck.id);
        }

        if (deck.id) loadDeck();
    }, [])

    return (
        <>
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <div className="row justify-content-between">
                <div>
                    <button className="btn btn-secondary mr-2">Edit</button>
                    <button className="btn btn-primary mr-2">Study</button>
                    <button className="btn btn-success">Add Cards</button>
                </div>
                <div>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>
        </>
        )
}