import { useHistory } from "react-router-dom";

export default function CardForm({deck, card, submitHandler, setCard, setNewCard, handleSaveNewCard}){
    const history = useHistory();

//---handlers---
    const inputChangeHandler = ({target}) => {
        if (card.id) {
            setCard({...card, [target.name]: target.value})
        }else{
            setNewCard({...card, [target.name]: target.value})
        }

    }
    return (
        <div>
            <h2>{deck.name}</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="front">Front</label>
                <textarea
                    name="front"
                    className="form-control"
                    value={card.front}
                    onChange={inputChangeHandler}/>
                <label htmlFor="back">Back</label>
                <textarea
                    name="back"
                    className="form-control"
                    value={card.back}
                    onChange={inputChangeHandler}/>


                {card.id && 
                    <div className="my-2">
                        <button onClick={()=>{history.push(`/decks/${deck.id}`)}} className="btn btn-secondary mr-2">Cancel</button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                }

                {!card.id && 
                    <div className="my-2">
                        <button type="submit" className="btn btn-secondary mr-2">Done</button>
                        <button onClick={handleSaveNewCard} className="btn btn-primary">Save</button>
                    </div>
                }

            </form>
        </div>
    )
}