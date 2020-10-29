import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Highlighter from "../../components/Highlighter"
import { addCollectionItemToRoom, getRoom, getRoomsPaths, streamRoomCollection } from "../../lib/db"
import highlighterLanguages from "../../lib/highlighterLanguages"
export default function Room({ room }) {
    const [newLink, setNewLink] = useState("")
    const [links, setLinks] = useState(room.links)
    const [snippets, setSnippets] = useState(room.snippets)
    const [newLanguage, setNewLanguage] = useState(highlighterLanguages[0])
    const [newSnippet, setNewSnippet] = useState("")
    const { isFallback } = useRouter()

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

    const addNewLinkHandler = async () => {
        addCollectionItemToRoom({ link: newLink }, room.id, 'links').then(() => setNewLink(""))
    }

    const addNewSnippetHandler = async () => {
        addCollectionItemToRoom({ snippet: newSnippet, language: newLanguage }, room.id, 'snippets').then(() => setNewSnippet(""))
    }

    if (isFallback) {
        return <div>building page...</div>
    }
    return <div className="">
        <ul>
            {links && links.map(link => <li key={link}><a href="">{link}</a></li>)}
            <li><input type="text" value={newLink} onChange={e => setNewLink(e.currentTarget.value)} /> <button onClick={addNewLinkHandler}>add</button></li>
        </ul>
        <div>
            add code
        <select
                className="select"
                value={newLanguage}
                onChange={e => setNewLanguage(e.currentTarget.value)}
            >
                {highlighterLanguages.map(l => (
                    <option key={l} value={l}>
                        {l}
                    </option>
                ))}
            </select>
            <textarea onChange={e => setNewSnippet(e.currentTarget.value)} value={newSnippet} />
            <button onClick={addNewSnippetHandler}>add</button>
        </div>
        {snippets && snippets.map((snippet, i) => <Highlighter key={i} language={snippet.language} snippet={snippet.snippet} />)}
    </div>
}

export async function getStaticProps(context) {
    const { params: { slug } } = context
    const room = await getRoom(slug)
    return {
        props: { room }
    }
}

export async function getStaticPaths() {
    const paths = await getRoomsPaths()
    return {
        paths,
        fallback: true
    };
}