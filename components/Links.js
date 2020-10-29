import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { streamRoomCollection } from "../lib/db"
import AddLink from "./forms/AddLink";

const Links = ({ room }) => {
    const [links, setLinks] = useState(room.links)
    const {addToast} = useToasts()

    useEffect(() => {
        const unsubscribe = streamRoomCollection(room.id, {
            next: querySnapshot => {
                const updatedLinks = querySnapshot.docs.map(docSnapshot => {
                    let { created, link } = docSnapshot.data()
                    if(!created) created = ""
                    return { created, link }
                });
                setLinks(updatedLinks);
            },
            error: () => addToast("Error updating room snippets", {autoDismiss: true, appearance: "error"})
        }, 'links');
        return unsubscribe;
    }, [setLinks]);

    return (<div className="px-2">
        <AddLink roomId={room.id} />
        <ul className="list-decimal">
            {links && links.map((link, i) => <li key={`${link.link}${i}`}>
                <div className="flex flex-col justify-between mb-2">
                    <a target="_blank"
                        rel="noopener noreferrer" className="font-semibold" href={link.link}>
                        {link.link}
                    </a>
                    <span className="text-xs">Added at {link.created.toDate && link.created.toDate().toUTCString()}</span>
                </div>
            </li>)}
        </ul>
    </div>)
}

export default Links