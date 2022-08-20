import {React, useState} from "react";
import { Switch, Route} from "react-router-dom";
import Header from "./Header";
import CreateDeckBtn from "./CreateDeckBtn";
import DeckList from "./DeckList"
import DeckInfo from "./DeckInfo"
import NotFound from "./NotFound";

//Home Page
function Layout() {
//---state---
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});
  const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
              <CreateDeckBtn/>
              <DeckList decks={decks} setDecks={setDecks} setDeck={setDeck}/>
          </Route>

          <Route path="/decks/:deckId/study">
              {/* Study */}
          </Route>

          <Route path="/decks/:deckId">
              <DeckInfo deck={deck}/>
          </Route>

          <Route exact path="/decks/create">
              <p>Create</p>
          </Route>

          <Route path="">
            <NotFound />
          </Route>

        </Switch>
      </div>
    </>
  );
}

export default Layout;
