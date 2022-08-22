import {React, useState, useEffect} from "react";
import { Switch, Route} from "react-router-dom";
import { listDecks } from "../utils/api/index.js";
import Header from "./common/Header";
import NotFound from "./common/NotFound";
import Home from "./home/Home.js";
import EditDeck from "./EditDeck/EditDeck.js";
import CreateDeck from "./CreateDeck/CreateDeck.js";
import DeckView from "./DeckView/DeckView.js";
import DeckStudy from "./DeckStudy/DeckStudy.js";

function Layout() {
//---state---
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});

//---hooks---
  useEffect(() => {
    // setDecks([]);
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        let _decks = await listDecks(abortController.signal);
        setDecks(_decks);
        // setLoaded(true);
      } catch (error) {
        console.log(error.message);
      }
    }
    loadDecks();
    return () => {
      console.info("aborting");
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
              <Home decks={decks} setDecks={setDecks} setDeck={setDeck}/>
          </Route>

            {/* Clicking Create Deck  */}
          <Route path='/decks/new'>
            <CreateDeck decks={decks} setDecks={setDecks}/>
          </Route>

          <Route exact path="/decks/:deckId/edit">
            <EditDeck deck={deck} setDeck={setDeck}/>
          </Route>

            {/* Clicking the View button */}
          <Route exact path="/decks/:deckId">
            <DeckView deck={deck} setDeck={setDeck}/>
          </Route>

            {/* Clicking Study  */}
          <Route path='/decks/:deckId/study'>
             <DeckStudy/>
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>
      </div>
    </>
  );
}

export default Layout;
