import {React, useState, useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import { listDecks } from "../utils/api/index.js";
import Header from "./common/Header";
import NotFound from "./common/NotFound";
import BreadCrumb from "./common/BreadCrumb.js";
import Home from "./Home/Home.js";
import EditDeck from "./EditDeck/EditDeck.js";
import CreateDeck from "./CreateDeck/CreateDeck.js";
import DeckView from "./DeckView/DeckView.js";
import DeckStudy from "./DeckStudy/DeckStudy.js";
import AddCard from "./AddCard/AddCard.js";
import EditCard from "./EditCard/EditCard.js";

function Layout() {
//---state---
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});

//---return---
  return (
    <main>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
              <Home decks={decks} setDecks={setDecks} setDeck={setDeck}/>
          </Route>

            {/* Clicking Edit on a deck */}
          <Route path="/decks/:deckId/edit">
            <BreadCrumb deck={deck} pageName="Edit"/>
            <EditDeck deck={deck} setDeck={setDeck}/>
          </Route>

            {/* Clicking Study  */}
          <Route path="/decks/:deckId/study">
            <BreadCrumb deck={deck} pageName="Study"/>
            <DeckStudy deck={deck} setDeck={setDeck}/>
          </Route>

            {/* Clicking Create Deck  */}
          <Route strict exact path="/decks/new">
            <BreadCrumb pageName="Create Deck"/>
            <CreateDeck decks={decks} setDecks={setDecks}/>
          </Route>

            {/* Clicking Add Cards  */}
          <Route path="/decks/:deckId/cards/new">
            <BreadCrumb deck={deck} pageName="Add Card"/>
            <AddCard deck={deck} setDeck={setDeck}/>
          </Route>

            {/* Clicking Edit on a card  */}
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <BreadCrumb deck={deck} pageName="Edit Card"/>
            <EditCard deck={deck} setDeck={setDeck}/>
          </Route>

            {/* Clicking the View button on a deck */}
          <Route path="/decks/:deckId">
            <BreadCrumb deck={deck}/>
            <DeckView deck={deck} setDeck={setDeck}/>
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>
      </div>
    </main>
  );
};

export default Layout;
