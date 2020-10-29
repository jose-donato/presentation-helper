import { Fragment, useEffect, useState } from "react"
import { addCollectionItemToRoom, streamRoomCollection } from "../lib/db"
import highlighterLanguages from "../lib/highlighterLanguages"
import Highlighter from "./Highlighter"
import CopyToClipboard from "react-copy-to-clipboard"
import AddSnippet from "./forms/AddSnippet"

const Snippets = ({ room }) => {
    const [copied, setCopied] = useState(false)
    const [snippets, setSnippets] = useState(room.snippets)

    useEffect(() => {
        const unsubscribe = streamRoomCollection(room.id, {
            next: querySnapshot => {
                const updatedSnippets = querySnapshot.docs.map(docSnapshot => {
                    const { language, snippet } = docSnapshot.data()
                    return { language, snippet }
                });
                if (updatedSnippets !== snippets) setSnippets(updatedSnippets);
            },
            error: () => console.log('grocery-list-item-get-fail')
        }, 'snippets');
        return unsubscribe;
    }, [setSnippets]);
    return (
        <Fragment>
            <AddSnippet roomId={room.id} />
            
            <ul className="list-decimal">
                {snippets && snippets.map((snippet, i) => <li key={i}>
                    <div className="flex flex-row justify-between ml-4 mb-2">
                            <span className="text-xs">Added at {"26....."}</span>
                    <CopyToClipboard text={snippet.snippet}
                        onCopy={() => {
                            setCopied(true)
                            setTimeout(() => setCopied(false), 1000)
                        }}>
                        {!copied ? <svg className="-mt-2 w-6 h-6 self-end cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg> :
                            <svg className="-mt-2 w-6 h-6 self-end cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    </CopyToClipboard>
                    </div>
                    <Highlighter language={snippet.language} snippet={snippet.snippet} />
                </li>)}
            </ul>
        </Fragment>
    )
}

export default Snippets