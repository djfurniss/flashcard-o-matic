import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../../utils/api";
import DeckList from "./DeckList"

export default function Home({decks, setDecks, setDeck}){

    const history = useHistory();

    //makes the API call to get all the decks
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDecks() {
            try {
                //set the app's state of decks to the data from the API
                setDecks(await listDecks(abortController.signal));
            } catch (err) {
                if (err.name === "AbortError"){
                    //ignore user abort
                }else throw err
            };
        };
        loadDecks();
        return () => abortController.abort();
      }, []);

    return(
        <div>
            <button onClick={()=>history.push("/decks/new")} className="btn btn-secondary">Create Deck</button>
            <DeckList decks={decks} setDecks={setDecks} setDeck={setDeck}/>
        </div>
    )
};