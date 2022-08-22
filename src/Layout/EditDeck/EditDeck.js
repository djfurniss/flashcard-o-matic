import { useParams, useHistory } from "react-router-dom";
import { updateDeck } from "../../utils/api";
import DeckForm from "../common/DeckForm";
export default function EditDeck({deck, setDeck}){

    const history = useHistory();

    const submitHandler = (event)=>{
        event.preventDefault();
        updateDeck(deck);
        // setDecks([...decks, newDeck])
    }

    const cancelHandler = ()=>{
        history.push(`/decks/${deck.id}`)
    }

    return (
        <DeckForm deck={deck} setDeck={setDeck} submitHandler={submitHandler} cancelHandler={cancelHandler}/>
    )

}