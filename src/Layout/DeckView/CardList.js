import { useHistory } from "react-router-dom";
import { deleteCard, updateCard, readDeck } from "../../utils/api";

export default function CardList({ deck, setDeck }) {
    const history = useHistory();

    const handleEditClick = (id) =>{
        history.push(`/decks/${deck.id}/cards/${id}/edit`)
    }

    const handleDeleteClick = async (id) =>{
        try{
        window.confirm("Are you sure you want to delete this card?") && await deleteCard(id)
        const _deck = await readDeck(deck.id)
        setDeck(_deck)
        }catch (err) {}
    }

  return (
    <>
      {deck.cards.map((card) => {
        return (
          <div className="list-group-item" key={card.id}>
            <div className="row">
              <div className="col">
                <p>{card.front}</p>
              </div>
              <div className="col">
                <p>{card.back}</p>
              </div>
            </div>
            <div className="row justify-content-end">
                <button 
                    className="btn btn-secondary mx-2"
                    onClick={()=>handleEditClick(card.id)}>
                    Edit
                </button>
                <button 
                    className="btn btn-danger mx-2"
                    onClick={()=>handleDeleteClick(card.id)}>
                    Delete
                </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
