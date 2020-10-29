import { Fragment, useEffect, useState } from "react";
import { addCollectionItemToRoom, streamRoomCollection } from "../lib/db"

const Links = ({ room }) => {
    const [links, setLinks] = useState(room.links)
    const [newLink, setNewLink] = useState("")

    const addNewLinkHandler = async () => {
        addCollectionItemToRoom({ link: newLink }, room.id, 'links').then(() => setNewLink(""))
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
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Link
      </label>
                <input placeholder="https://vercel.com" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={newLink} onChange={e => setNewLink(e.currentTarget.value)} /> 
            </div>
        </div>
                <button className="self-end w-24" onClick={addNewLinkHandler}>Add Link</button>
        <ul className="list-disc">
            {links && links.map(link => <li key={link}><a target="_blank"
                rel="noopener noreferrer" className="" href={link}>{link}</a></li>)}
        </ul>
    </Fragment>)
}

export default Links