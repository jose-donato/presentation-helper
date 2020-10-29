import { Fragment, useEffect, useState } from "react"
import { addCollectionItemToRoom, streamRoomCollection } from "../lib/db"
import highlighterLanguages from "../lib/highlighterLanguages"
import Highlighter from "./Highlighter"
import CopyToClipboard from "react-copy-to-clipboard"

const Snippets = ({ room }) => {
    const [copied, setCopied] = useState(false)
    const [snippets, setSnippets] = useState(room.snippets)
    const [newLanguage, setNewLanguage] = useState(highlighterLanguages[0])
    const [newSnippet, setNewSnippet] = useState("")

    const addNewSnippetHandler = async () => {
        addCollectionItemToRoom({ snippet: newSnippet, language: newLanguage }, room.id, 'snippets').then(() => setNewSnippet(""))
    }

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
            <div>
                <div className="w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                        Language
      </label>
                    <div className="relative">
                        <select value={newLanguage}
                            onChange={e => setNewLanguage(e.currentTarget.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            {highlighterLanguages.map(l => (
                                <option key={l} value={l}>
                                    {l}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                <div className="w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                        Language
      </label>
                    <div className="relative">
                        <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" onChange={e => setNewSnippet(e.currentTarget.value)} value={newSnippet} />
                    </div>
                </div>
            </div>
            <button className="self-end w-32 mb-8" onClick={addNewSnippetHandler}>Add Snippet</button>
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