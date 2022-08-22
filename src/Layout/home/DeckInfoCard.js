export default function DeckInfoCard({deck, handleViewClick, handleStudyClick, handleDeleteDeck}){

//---handlers---

    return (
        <div className="card my-2">
            <div className="card-body">
                <div className="row justify-content-between px-3">
                  <h5 className="card-title">{deck.name}</h5>
                  <p className="text-secondary">{`${deck.cards.length} cards`}</p>
                </div>
              <p className="card-text"> {deck.description} </p>
              <div className="row justify-content-between px-3">
                <div>
                    <button 
                      onClick={handleViewClick}
                      className="btn btn-secondary mr-3"
                      >View
                    </button>
                    <button 
                      onClick={handleStudyClick} 
                      className="btn btn-primary"
                      >Study
                    </button>
                </div>
                <div>
                    <button 
                      onClick={handleDeleteDeck}
                      className="btn btn-danger text-end"
                      >Delete
                      </button>
                </div>
              </div>
          </div>
        </div>)
};