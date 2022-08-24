import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";

export default function BreadCrumb({deck = {}, pageName=null}) {
  const {cardId, deckId} = useParams();
  // console.log(deck.id)

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>

        {deckId && 
          <li className="breadcrumb-item">
            {deck.name}
        </li>}

        {pageName && 
          <li className="breadcrumb-item"> {cardId ? `${pageName} ${cardId}` : `${pageName}`} </li>
          }
      </ol>
    </nav>
  )
};
