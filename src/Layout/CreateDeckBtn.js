import { useHistory } from "react-router-dom";
export default function CreateDeckBtn(){

    const history = useHistory();
    function clickHandler(){
        history.push("/decks/create")
    }

    return (
        <button onClick={clickHandler} className="btn btn-secondary">
            Create Deck
        </button>
    )
}