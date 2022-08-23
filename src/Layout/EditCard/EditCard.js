import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import CardForm from "../common/CardForm";

export default function EditCard({deck, setDeck}){
    const {deckId} = useParams();

    useEffect(()=>{
        const abortController = new AbortController();
        async function loadDeckInfo(){
            try{
                const deckInfoFromAPI = await readDeck(deckId, abortController.signal);
                await setDeck(deckInfoFromAPI);
            }catch (err){
                if (err.name === "AbortError"){
                    console.log("aborted")
                }else throw err 
            };
        };

        loadDeckInfo();

        return ()=>abortController.abort();
    }, [])
    ///decks/:deckId/cards/:cardId/edit 
    return (
        <CardForm/>
    ) 
}