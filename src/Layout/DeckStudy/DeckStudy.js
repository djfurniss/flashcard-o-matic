import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import NotEnoughCards from "../common/NotEnoughCards";
import StudyCard from "./StudyCard";

export default function DeckStudy({deck, setDeck}){
//---misc. hooks---
    const { deckId } = useParams();
        
//---state---
    const [cardIndex, setCardIndex] = useState(0);

//---effect---
    useEffect(()=>{
        const abortController = new AbortController();
        async function loadDeck(){
            try{
                setDeck(await readDeck(deckId, abortController.signal))
            }catch (err){
                if (err.name === "AbortError"){
                    //ignore user abort
                } else throw err
            };
        };
        loadDeck();
        return () => abortController.abort();
    }, [deckId]);

//---return---
    return (
        <div>
            <h1>{`Study: ${deck.name}`}</h1>
            {/* cards need to exist as well as have a certain lengh in order to study */}
            {deck.cards && deck.cards.length>2 &&
                <StudyCard 
                key={cardIndex} 
                card={deck.cards[cardIndex]} //this changing state, cardIndex, keeps up with the deck's cards at a certain index
                index={cardIndex} 
                cardsAmount={deck.cards.length} 
                setCardIndex={setCardIndex}/>}

            {/* cards still need to exist here also but the length of the array renders a different component, NotEnoughCards */}
            {deck.cards && deck.cards.length <=2 && <NotEnoughCards cardsAmount={deck.cards.length}/>}
        </div>
        )
};