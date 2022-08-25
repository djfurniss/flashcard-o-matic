import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../../utils/api";
import DeckList from "./DeckList";

export default function Home({ decks, setDecks, setDeck }) {
//---misc. hooks---
  const history = useHistory();

//---effect---
  //makes the initial API call to get all the decks
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        //set the app's state of decks to the data retrieved from the API
        setDecks(await listDecks(abortController.signal));
      } catch (err) {
        if (err.name === "AbortError") {
          //ignore user abort
        } else throw err;
      }
    }
    loadDecks();
    return () => abortController.abort();
  }, []);

//---return---
  return (
    <div>
      <button
        onClick={() => history.push("/decks/new")}
        className="btn btn-secondary mb-3">
            Create Deck
      </button>
      <DeckList decks={decks} setDecks={setDecks} setDeck={setDeck} />
    </div>
  );
};
