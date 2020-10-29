import { useRouter } from "next/router"
import { useRef, useState } from "react"
import QRCodePopup from "../../components/QRCodePopup"
import { getRoom, getRoomsPaths } from "../../lib/db"
import useOnClickOutside from "../../lib/customHooks/useOnClickOutside"
import Links from "../../components/Links"
import Snippets from "../../components/Snippets"
export default function Room({ room }) {
    const [currentScreen, setCurrentScreen] = useState("links")
    const [isQRCodeOpen, setIsQRCodeOpen] = useState(false)
    const QRCodePopupRef = useRef()
    const { isFallback, asPath } = useRouter()

    if (isFallback) {
        return <div>building page...</div>
    }
    useOnClickOutside(QRCodePopupRef, () => setIsQRCodeOpen(false))
    return <div className="flex flex-col">
        <div className="flex flex-row justify-between">
            <h2 className="text-blue-800">Room <span className="font-semibold">{room.id}</span></h2>
            <img className="w-8 h-16 cursor-pointer" src="/qr-code-scan.svg" alt="qr-code scan" onClick={() => setIsQRCodeOpen(true)} />
        </div>
        <div className="flex flex-col p-10 rounded-3xl content-center bg-white">
        <div className="self-center mb-4">
            <button onClick={() => setCurrentScreen("links")} className={`${currentScreen === "links" ? "bg-blue-500" : "bg-blue-300"} mr-4 focus:outline-none`}>Links</button>
            <button onClick={() => setCurrentScreen("snippets")} className={`${currentScreen === "snippets" ? "bg-blue-500" : "bg-blue-300"} focus:outline-none`}>Snippets</button>
        </div>
        {isQRCodeOpen && <QRCodePopup ref={QRCodePopupRef} value={"http://localhost:3000" + asPath} />}
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