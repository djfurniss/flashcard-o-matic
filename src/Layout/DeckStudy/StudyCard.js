import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//this component is responsible for rendering one card on a deck's Study page

export default function StudyCard({card, index, cardsAmount, setCardIndex}){
//---misc. hooks---
    const history = useHistory();

//---state---
    const [frontFace, setFrontFace] = useState(true);
    const [lastCard, setLastCard] = useState(false);

//---handlers---
    const handleClick = ({target}) => {
        if (target.name === "flip"){
             if (index === cardsAmount-1) setLastCard(true);
            setFrontFace(!frontFace);
        };
        if (target.name === "restart"){
            window.confirm("Would you like to restart this deck?") ? setCardIndex(0) : history.push("/")
        };
        if (target.name === "next") setCardIndex(index+1);
    };

//---return---
    return (
        <div className="card p-3 mb-4">
            <h4>Card {index+1} of {cardsAmount}</h4>
            {frontFace ? <p>{card.front}</p> : <p>{card.back}</p>}
            <div className="row">
                <button 
                    name="flip"
                    className="btn btn-secondary mx-2"
                    onClick={handleClick}>
                    Flip
                </button>
            {!frontFace && 
            // this button only renders on the back of a card
            //the state of lastCard determines what the button says as well as what it does via the button name
                <button
                    name={lastCard ? "restart" : "next"}
                    onClick={handleClick}
                    className="btn btn-primary">
                    {lastCard ? "Restart" : "Next"}
                </button>}
            </div>
        </div>
    )
};