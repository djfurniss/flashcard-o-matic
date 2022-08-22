import { useHistory } from "react-router-dom";
import DeckList from "./DeckList"

export default function Home({decks, setDecks, setDeck}){

    const history = useHistory();
    function clickHandler(){
        history.push("/decks/new")
    }

    return(
    <>
        <button onClick={clickHandler} className="btn btn-secondary">Create Deck</button>
        <DeckList decks={decks} setDecks={setDecks} setDeck={setDeck}/>
    </>
    )
}