import { useParams } from "react-router-dom"

export default function DeckStudy(){
    const {deckId} = useParams();
    console.log(deckId)
    console.log("you've reached the study page")

    
    return <p>Studying a Deck</p>
};