export default function CardForm(){
    return (
        <form>
            <label htmlFor="front">Front</label>
            <textarea
                name="front"
                className="form-control"/>
            <label htmlFor="back">Back</label>
            <textarea
                name="back"
                className="form-control"/>
            <button className="btn btn-secondary mr-2">Done</button>
            <button className="btn btn-primary m-2">Save</button>
        </form>
    )
}