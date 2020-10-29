import { Fragment, useEffect, useState } from "react";
import { addCollectionItemToRoom, streamRoomCollection } from "../lib/db"
import { isValidURL } from "../lib/utils";
import AddLink from "./forms/AddLink";

const Links = ({ room }) => {
    const [links, setLinks] = useState(room.links)

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
        <AddLink roomId={room.id} />
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