import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import DeckForm from "../common/DeckForm";

export default function EditDeck({deck, setDeck}){

    const history = useHistory();
    const {deckId} = useParams();

    useEffect(()=>{
        async function loadDeck(){
        const _deck = await readDeck(deckId)
        setDeck(_deck)
        }

        loadDeck();
    },[])

    const submitHandler = async (event)=>{
        event.preventDefault();
        await updateDeck(deck);
        history.push(`/decks/${deck.id}`)
    }

    const cancelHandler = ()=>{
        history.push(`/decks/${deck.id}`)
    }

    return (
        <DeckForm deck={deck} setDeck={setDeck} submitHandler={submitHandler} cancelHandler={cancelHandler}/>
    )

}