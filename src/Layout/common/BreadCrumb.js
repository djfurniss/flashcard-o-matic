import React from "react";
import { Link, useParams } from "react-router-dom";

export default function BreadCrumb({deck, pageName = null}) {
//---hooks---
  const {cardId, deckId} = useParams();

//---return---
  return (
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
            {/* A breadcrumb will always have a link to the home page*/}
          <Link to="/">Home</Link>
        </li>
            {/* if there's a deckId in the url, the name is always needed. 
            deck's state is always maintained so using deck.name is always referencing the current deck */}
        {deckId && 
        <li className="breadcrumb-item">{deck.name ? deck.name : "..."}</li>}
            {/* A corresponding page name is passed in with a route and is displayed if there is one
            the page name prop is defaulted to null so that if one is not passed in, it will render nothing*/}
            {/* This ternary for this breadcrumb item is based off of cardId for two reasons: 
            (1) the only time cardId is needed is on the Edit Card page, and
            (2)the Edit Card breadcrumb item is the only item that combines a static pageName with a dynamically changing value (the card #),
            otherwise, only the page name that was passed in is needed*/}
        {pageName && 
        <li className="breadcrumb-item"> {cardId ? `${pageName} ${cardId}` : `${pageName}`} </li>}
      </ol>
  )
};