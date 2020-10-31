import { useState } from "react"
import Highlighter from "./Highlighter"
import copy from "copy-to-clipboard"
import { useToasts } from "react-toast-notifications"

const SnippetLog = ({ snippet }) => {
    const [copied, setCopied] = useState(false)
    const {addToast} = useToasts()

    return (
        <li className="mb-6">
            <div className="flex flex-row justify-between ml-4 mb-2">
                <span className="text-xs">Added at {snippet.date.string}</span>
                <button onClick={() => {
                    addToast("Snippet copied to clipboard", {
                        appearance: "success",
                        autoDismiss: true
                    })
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
        </li>
    )
}

export default SnippetLog