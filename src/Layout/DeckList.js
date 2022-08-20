import { useEffect } from "react";
import { listDecks } from "../utils/api/index.js";
import Card from "./Card.js";


export default function DeckList({decks, setDecks, setDeck}){
    
    useEffect(()=>{
      async function getDecks(){
        const decksArr = await listDecks();
        setDecks(decksArr)
      }
      getDecks();
      
    }, [])
      
  
  
    return(
      <>
        {decks.map(item => {
          {/* {deck.name} has {deck.cards.length} cards. Description: {deck.description} */}
          return <Card 
            key={item.id} 
            title={item.name} 
            content={item.description} 
            cardsCount={item.cards.length} 
            buttons={["view", "study", "delete"]}
            setDeck={setDeck}
            thisDeck={item}
            id={item.id}/>}
          )}
      </>
    )
  }