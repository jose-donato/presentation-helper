import { useEffect, useState } from "react"
import { addCollectionItemToRoom, streamRoomCollection } from "../lib/db"
import highlighterLanguages from "../lib/highlighterLanguages"
import Highlighter from "./Highlighter"
import AddSnippet from "./forms/AddSnippet"
import copy from "copy-to-clipboard"
import { useToasts } from "react-toast-notifications"

const Snippets = ({ room }) => {
    const [snippets, setSnippets] = useState(room.snippets)
    const [copied, setCopied] = useState(false)
    const {addToast} = useToasts()

    useEffect(() => {
        const unsubscribe = streamRoomCollection(room.id, {
            next: querySnapshot => {
                const updatedSnippets = querySnapshot.docs.map(docSnapshot => {
                    let { language, snippet, created } = docSnapshot.data()
                    if(!created) created = ""
                    return { language, snippet, created }
                });
                setSnippets(updatedSnippets);
            },
            error: () => addToast("Error updating room snippets", {autoDismiss: true, appearance: "error"})
        }, 'snippets');
        return unsubscribe;
    }, [setSnippets]);
    return (
        <div className="px-2">
            <AddSnippet roomId={room.id} />
            <ul className="list-decimal">
                {snippets && snippets.map((snippet, i) => <li key={i} className="mb-6">
                    <div className="flex flex-row justify-between ml-4 mb-2">
                        <span className="text-xs">Added at {snippet.created.toDate && snippet.created.toDate().toUTCString()}</span>
                        <button onClick={() => {
                            copy(snippet.snippet)
                            setCopied(true)
                            setTimeout(() => setCopied(false), 1000)
                        }}
                        className="w-8 h-8 bg-blue-500 rounded focus:outline-none"
                        >
                            {!copied ? <svg className="w-6 h-6 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg> :
                                <svg className="w-6 h-6 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                        </button>
                    </div>
                    <Highlighter language={snippet.language} snippet={snippet.snippet} />
                </li>)}
            </ul>
        </div>
    )
}

export default Snippets