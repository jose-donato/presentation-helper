import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { streamRoomCollection } from "../lib/db";
import { addAndSort } from "../lib/utils";
import LinkLog from "./LinkLog";
import SnippetLog from "./SnippetLog";

const Log = ({ room }) => {
    const [logs, setLogs] = useState(room.logs)
    const { addToast } = useToasts()
    useEffect(() => {
        const unsubscribeLinks = streamRoomCollection(room.id, {
            next: querySnapshot => {
                querySnapshot.docs.forEach((snap, i) => {
                    const id = snap.id;
                    if (!room.docsIds.includes(id)) {
                        const { created, link } = snap.data()
                        if (!created) {
                            return;
                        }
                        const obj = {
                            id,
                            type: "link",
                            date: {
                                ms: created.toDate().getTime(),
                                string: created.toDate().toUTCString()
                            },
                            link,
                        }
                        console.log(obj)
                        const arr = addAndSort(logs, obj)
                        setLogs(arr)
                        room.docsIds.push(id)
                    }
                });
            },
            error: () => addToast("Error updating room snippets", { autoDismiss: true, appearance: "error" })
        }, 'links');
        const unsubscribeSnippets = streamRoomCollection(room.id, {
            next: querySnapshot => {
                querySnapshot.forEach(snap => {
                    const id = snap.id;
                    if (!room.docsIds.includes(id)) {
                        const { created, language, snippet } = snap.data()
                        if (!created) {
                            console.log(snippet)
                            return;
                        }
                        const obj = {
                            id,
                            type: "snippet",
                            date: {
                                ms: created.toDate().getTime(),
                                string: created.toDate().toUTCString()
                            },
                            language,
                            snippet
                        }
                        const arr = addAndSort(logs, obj)
                        setLogs(arr)
                        room.docsIds.push(id)
                    }
                });
            },
            error: () => addToast("Error updating room snippets", { autoDismiss: true, appearance: "error" })
        }, 'snippets');
        return () => {
            unsubscribeLinks()
            unsubscribeSnippets
        };
    }, [setLogs]);

    return (
        <div className="pt-12 px-2">
            <ul className="list-decimal">
                {logs.map(log => {
                    if (log.type === "link") {
                        return <LinkLog key={log.id} link={log} />
                    } else if (log.type === "snippet") {
                        return <SnippetLog key={log.id} snippet={log} />
                    }
                    return null;
                })}
            </ul>
        </div>
    )
}

export default Log;