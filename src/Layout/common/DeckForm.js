import React from "react";

//this component is used for both create deck page AND edit deck page...
//common props:
    //"deck" is dependent on what's passed from its parent component (an existing deck or newDeck)
    //"setter" is either setDeck or setNewDeck passed from its parent component that is responsible for setting the "deck" prop it came with
    //the button event handlers are defined in and passed from parent components (EditDeck and CreateDeck)

export default function DeckForm({deck, setter, handleSubmit, handleCancel}){
//---handler---
    const handleInputChange = ({target}) => setter({...deck, [target.name]: target.value});

//---return---
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                value = {deck.name}
                onChange={handleInputChange}
                required
                className="form-control mb-2"/>

            <label htmlFor="description">Description</label>
            <textarea
                name="description"
                value = {deck.description}
                onChange={handleInputChange}
                required
                className="form-control mb-2"/>

            <div className="pt-1">
                <button 
                    onClick={handleCancel} 
                    className="btn btn-secondary mr-2">
                    Cancel
                </button>

                <button 
                    type="submit" 
                    className="btn btn-primary">
                        {/* New cards don't have an ID yet so deck.id conditionally renders for editing a deck */}
                    {deck.id ? "Save Changes" : "Add Deck"}
                </button>
            </div>
        </form>
    )
};