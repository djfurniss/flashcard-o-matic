import { useState } from "react"
import { useHistory } from "react-router-dom"

export default function StudyCard({card, index, cardsLength, setCardIndex}){
    const history = useHistory();

    const [frontFace, setFrontFace] = useState(true)
    const [lastCard, setLastCard] = useState(false)

    const flipHander = ()=>{
        if(index === cardsLength-1){
            setLastCard(true);
        }else setFrontFace(!frontFace)
    }
    
    const nextHandler = ()=> setCardIndex(index+1)

    const restartHandler = ()=>{
        window.confirm("Would you like to restart this deck?") ? setCardIndex(0) : history.push("/")
    }

    return (
        <div className="card p-3">
            <h4>Card {index+1} of {cardsLength} </h4>
            {frontFace ? <p>{card.front}</p> : <p>{card.back}</p>}
            <div className="row">
                <button 
                    className="btn btn-secondary mx-2"
                    onClick={flipHander}> Flip
                </button>
                {!frontFace && <button 
                    className="btn btn-primary mx-2"
                    onClick={nextHandler}>Next</button>}
                {lastCard && <button 
                    className="btn btn-primary"
                    onClick={restartHandler}>Restart</button>}
            </div>
        </div>
    )
}