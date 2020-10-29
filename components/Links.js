import { Fragment, useEffect, useState } from "react";
import { addCollectionItemToRoom, streamRoomCollection } from "../lib/db"
import { isValidURL } from "../lib/utils";

const Links = ({ room }) => {
    const [links, setLinks] = useState(room.links)
    const [newLink, setNewLink] = useState("")
    const [error, setError] = useState("")

    const addNewLinkHandler = async () => {
        if (isValidURL(newLink)) {
            setError("")
            addCollectionItemToRoom({ link: newLink }, room.id, 'links').then(() => setNewLink(""))
        } else {
            setError("Please provide a valid URL")
        }
    }
    useEffect(() => {
        const unsubscribe = streamRoomCollection(room.id, {
            next: querySnapshot => {
                const updatedLinks = querySnapshot.docs.map(docSnapshot => docSnapshot.data().link);
                if (updatedLinks !== links) setLinks(updatedLinks);
            },
            error: () => console.log('grocery-list-item-get-fail')
        }, 'links');
        return unsubscribe;
    }, [setLinks]);
    return (<Fragment>
        <div className="flex flex-wrap mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Link
      </label>
                <input placeholder="https://vercel.com" className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${error ? "border-red-500 border": ""}`} type="text" value={newLink} onChange={e => setNewLink(e.currentTarget.value)} />
                {error && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {error}
		</span>}
            </div>
        </div>
        <button disabled={error !== ""} className={`self-end w-24 mb-4 ${error ? "bg-blue-200 cursor-not-allowed hover:bg-blue-200" : ""}`} onClick={addNewLinkHandler}>Add Link</button>
        <ul className="list-decimal">
            {links && links.map(link => <li key={link}>
                <div className="flex flex-col justify-between">
                    <a target="_blank"
                        rel="noopener noreferrer" className="font-semibold" href={link}>
                        {link}
                    </a>
                    <span className="text-xs">Added at {"26..."}</span>
                </div>
            </li>)}
        </ul>
    </Fragment>)
}

export default Links