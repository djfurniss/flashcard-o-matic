import React from "react";
import { useHistory } from "react-router-dom";

//this component is used for both add card page AND edit card page...
//common props:
    //"card" is dependent on what's passed from its parent component (an existing card or a newCard state)
    //"setter" is either setCard or setNewCard passed from its parent component that is responsible for setting the "card" prop it came with
    //the button event handlers are defined in and passed from parent components (EditCard and AddCard)

export default function CardForm({deck, card, setter, handleSubmit, handleSaveNewCard}){
//---misc. hooks---
    const history = useHistory();

//---handlers---
    const handleInputChange = ({target}) => setter({...card, [target.name]: target.value});

//---return---
    return (
        <div className="mb-4">
            <h4 style={{"fontWeight": "300"}}>{card.id ? "Edit Card" : `${deck.name}: Add Card`}</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="front">Front</label>
                <textarea
                    name="front"
                    className="form-control"
                    value={card.front}
                    onChange={handleInputChange}/>
                <label htmlFor="back">Back</label>
                <textarea
                    name="back"
                    className="form-control"
                    value={card.back}
                    onChange={handleInputChange}/>

                {/* New cards don't have an id yet so card.id conditionally renders the appropriate buttons */}
                {card.id ?
                    <div className="my-2">
                        <button onClick={()=>{history.push(`/decks/${deck.id}`)}} className="btn btn-secondary mr-2">Cancel</button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div> 
                :
                    <div className="my-2">
                        <button type="submit" className="btn btn-secondary mr-2">Done</button>
                        <button type="reset" onClick={handleSaveNewCard} className="btn btn-primary">Save</button>
                    </div>
                }
            </form>
        </div>
    )
};