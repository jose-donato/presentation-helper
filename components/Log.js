import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { streamRoomCollection } from "../lib/db";
import { addAndSort } from "../lib/utils";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";
import LinkLog from "./LinkLog";
import SnippetLog from "./SnippetLog";

const Log = ({ room }) => {
    const [activeSnippets, setActiveSnippets] = useState(true)
    const [activeLinks, setActiveLinks] = useState(true)
    const [logs, setLogs] = useState(room.logs)
    const { addToast } = useToasts()
    useEffect(() => {
        const unsubscribe = streamRoomCollection(room.id, {
            next: querySnapshot => {
                const updated = []
                querySnapshot.docs.forEach((snap, i) => {
                    const id = snap.id;
                    const { created, link, language, snippet, type } = snap.data()
                    if (!created) {
                        return;
                    }
                    let obj
                    if (type === "link") {
                        obj = {
                            id,
                            type,
                            date: {
                                ms: created.toDate().getTime(),
                                string: created.toDate().toUTCString()
                            },
                            link,
                        }
                        updated.push(obj)
                    } else if (type === "snippet") {
                        obj = {
                            id,
                            type,
                            date: {
                                ms: created.toDate().getTime(),
                                string: created.toDate().toUTCString()
                            },
                            snippet,
                            language
                        }
                        updated.push(obj)
                    }
                });
                setLogs(updated)
            },
            error: () => addToast("Error updating room snippets", { autoDismiss: true, appearance: "error" })
        }, 'logs');
        return () => {
            unsubscribe()
        };
    }, [setLogs]);

    return (
        <div className="pt-12 px-2">
            <div className="flex flex-row justify-between">
                <div>
                    <h3 className="font-semibold">Previous logs</h3>
                    <p>(displaying{activeLinks && activeSnippets && (" both links and snippets")}{(!activeSnippets && activeLinks) && " only links"}{(activeSnippets && !activeLinks) && " only snippets"}{(!activeLinks && !activeSnippets) && " nothing, select columns"})</p>
                </div>
                <Dropdown>
                    <Checkbox label={"Links"} checked={activeLinks} onChange={() => { setActiveLinks(!activeLinks) }} />
                    <Checkbox label={"Snippets"} checked={activeSnippets} onChange={() => { setActiveSnippets(!activeSnippets) }} />
                </Dropdown>
            </div>
            <ul className="list-decimal mt-6">
                {logs.map(log => {
                    if (log.type === "link" && activeLinks) {
                        return <LinkLog key={log.id} link={log} />
                    } else if (log.type === "snippet" && activeSnippets) {
                        return <SnippetLog key={log.id} snippet={log} />
                    }
                    return null;
                })}
            </ul>
        </div>
    )
}

export default Log;