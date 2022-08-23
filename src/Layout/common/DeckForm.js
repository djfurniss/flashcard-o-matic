import { useState } from "react"

//using same form for create deck AND edit deck...
export default function DeckForm({deck, setDeck, submitHandler, cancelHandler, setNewDeck}){
    // let newdeck = false;
    // if (!deck.id) {newdeck = true;}
    // console.log(newdeck)

    const inputChangeHandler = ({target}) =>{
        if(deck.id){
            setDeck({...deck, [target.name]: target.value})
        }else{
            setNewDeck({...deck, [target.name]: target.value})
        }
    }
    // console.log(deck)
    // console.log(newDeck)

//---return---
    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                required = {true}
                // minLength={3}
                className="form-control"
                value = {deck.name}
                onChange={inputChangeHandler}/>

            <label htmlFor="description">Description</label>
            <textarea
                name="description"
                className="form-control"
                value = {deck.description}
                onChange={inputChangeHandler}/>
            
            <button onClick={cancelHandler} className="btn btn-secondary mr-2">Cancel</button>

            <button type="submit" className="btn btn-primary m-2">
                {deck.id ? "Save Changes" : "Add Deck"}
            </button>
        </form>
    )
}