import { Fragment, useEffect, useState } from "react"
import { addCollectionItemToRoom, streamRoomCollection } from "../lib/db"
import highlighterLanguages from "../lib/highlighterLanguages"
import Highlighter from "./Highlighter"

const Snippets = ({ room }) => {
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
            <button className="self-end w-32" onClick={addNewSnippetHandler}>Add Snippet</button>
            {snippets && snippets.map((snippet, i) => <Highlighter key={i} language={snippet.language} snippet={snippet.snippet} />)}
        </Fragment>
    )
}

export default Snippets