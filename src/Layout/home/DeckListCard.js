import React from "react";

//this resuable component is responsible for rendering one deck's blip card on the home page's list of decks
export default function DeckListCard({deck:{name, cards, description}, handleClick}){

return (
  <div className="card my-3">
      {/* card info */}
      <div className="card-body">
          <div className="row justify-content-between mx-0">
            <h5 className="card-title">{name}</h5>
            <p className="text-secondary">{`${cards.length} cards`}</p>
          </div>
        <p className="card-text"> {description} </p>

      {/* buttons  */}
      <div className="row justify-content-between mx-0">
        <div>
            <button 
              name="view"
              onClick={handleClick}
              className="btn btn-secondary mr-3">
                View
            </button>
            <button 
              name="study"
              onClick={handleClick} 
              className="btn btn-primary">
                Study
            </button>
        </div>
        <div>
            <button 
              name="delete"
              onClick={handleClick}
              className="btn btn-danger">
                Delete
            </button>
        </div>
      </div>
    </div>
  </div>)
};