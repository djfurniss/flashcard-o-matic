import { useHistory } from "react-router-dom";


export default function Card({ thisDeck, id, title, content, cardsCount, buttons, setDeck }) {
//----hooks----
    const history = useHistory();

//---button options
    const viewBtn = buttons.find(name=> name === "view")
    const studyBtn = buttons.find(name=> name === "study")
    const deleteBtn = buttons.find(name=> name === "delete")
    const flipBtn = buttons.find(name=> name === "flip")

//---handlers---
    const handleViewClick = () => {
        setDeck(thisDeck);
        history.push(`/decks/${id}`);
    }

    const handleStudyClick = () => history.push(`/decks/${id}/study`)

//---return---
  return (
    <div className="card my-2">
        <div className="card-body">
            <div className="row justify-content-between px-3">
                <h5 className="card-title">{title}</h5>
                <p className="text-secondary">{cardsCount && `${cardsCount} cards`}</p>
            </div>
            <p className="card-text"> {content} </p>
            <div className="row justify-content-between px-3">
                <div>
                    {viewBtn && <button onClick={handleViewClick} className="btn btn-secondary mr-3">View</button>}
                    {studyBtn && <button onClick={handleStudyClick} className="btn btn-primary">Study</button>}
                    {flipBtn && <button className="btn btn-secondary">Flip</button>}
                </div>
                <div>
                    {deleteBtn && <button className="btn btn-danger text-end">Delete</button>}
                </div>
            </div>
        </div>
    </div>
  );
}
