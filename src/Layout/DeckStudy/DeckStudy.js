import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import NotEnoughCards from "../common/NotEnoughCards";
import StudyCard from "./StudyCard";

export default function DeckStudy({deck, setDeck}){
    const {deckId} = useParams();

    const [cardIndex, setCardIndex] = useState(0)
    //one card at a time.. the next button will change this state to set the index of the next card to show
    // if(cardIndex === deck.cards.length-1) 


    useEffect(()=>{
        const abortController = new AbortController
        async function loadDeck(){
            try{
                const resp = await readDeck(deckId, abortController.signal)
                setDeck(resp)
            }catch (err){
                if (err.name === "AbortError"){
                    console.log("aborted")
                } else throw err
            };
        };
        deckId && loadDeck();
    }, [])
    
    return (
        <>
        <h1>{`Study: ${deck.name}`}</h1>
        {deck.cards && deck.cards.length>2 && 
            <StudyCard 
            card={deck.cards[cardIndex]} 
            index={cardIndex} 
            cardsLength={deck.cards.length} 
            key={cardIndex} 
            setCardIndex={setCardIndex}/>}

        {deck.cards && deck.cards.length <=2 && <NotEnoughCards deck={deck}/>}
        </>
        )
};