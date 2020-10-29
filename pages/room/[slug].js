import { useRouter } from "next/router"
import { useRef, useState } from "react"
import QRCodePopup from "../../components/QRCodePopup"
import { getRoom, getRoomsPaths } from "../../lib/db"
import useOnClickOutside from "../../lib/customHooks/useOnClickOutside"
import Links from "../../components/Links"
import Snippets from "../../components/Snippets"
import copy from 'copy-to-clipboard';
import { useToasts } from "react-toast-notifications"

export default function Room({ room }) {
    const { addToast } = useToasts()
    const [shared, setShared] = useState(false)
    const [currentScreen, setCurrentScreen] = useState("links")
    const [isQRCodeOpen, setIsQRCodeOpen] = useState(false)
    const QRCodePopupRef = useRef()
    const { isFallback, asPath } = useRouter()
    const shareUrl = "https://talk-helper.vercel.app" + asPath;

    if (isFallback) {
        return <div>building page...</div>
    }
    useOnClickOutside(QRCodePopupRef, () => setIsQRCodeOpen(false))

    return <div className="flex flex-col">
        <div className="flex flex-row justify-between mb-6">
            <div>
            <h2 className="text-blue-800 mb-2">Room <span className="font-semibold">{room.id}</span></h2>
            <p className="text-xs">Created at {new Date(room.created).toUTCString()}</p>
            </div>
            <div className="flex flex-row items-center -mt-5">
                <button className="w-8 h-8 bg-blue-500 rounded focus:outline-none mr-2" onClick={async () => {
                    setShared(true)
                    addToast("On mobile share popup will open and on desktop URL is copied to the clipboard", {
                        autoDismiss: true,
                        appearance: "info"
                    })
                    setTimeout(() => setShared(false), 1000)
                    if (navigator.share) {
                        await navigator.share({
                            title: 'talk-helper',
                            text: '',
                            url: shareUrl,
                        })
                    } else {
                        copy(shareUrl);
                    }
                }}>
                    {!shared ? <svg className="w-6 h-6 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                        : <svg className="w-6 h-6 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                </button>
                <button className="w-8 h-8 bg-blue-500 rounded focus:outline-none" onClick={() => setIsQRCodeOpen(true)} >
                    <svg className="w-6 h-6 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                </button>
            </div>
        </div>
        <div className="flex flex-col p-10 rounded-3xl content-center bg-white">
            <div className="self-center mb-4">
                <button id="primaryButton" onClick={() => setCurrentScreen("links")} className={`${currentScreen === "links" ? "bg-blue-500" : "bg-blue-300"} w-24 mr-4 focus:outline-none`}>Links</button>
                <button id="primaryButton" onClick={() => setCurrentScreen("snippets")} className={`${currentScreen === "snippets" ? "bg-blue-500" : "bg-blue-300"} w-24 focus:outline-none`}>Snippets</button>
            </div>
            {isQRCodeOpen && <QRCodePopup close={() => setIsQRCodeOpen(false)} ref={QRCodePopupRef} value={shareUrl} />}
            {currentScreen === "links" && <Links room={room} />}
            {currentScreen === "snippets" && <Snippets room={room} />}
        </div>
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