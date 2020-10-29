import { forwardRef } from "react"
import QRCode from "react-qr-code"
const QRCodePopup = forwardRef(({ value, close }, ref) => (
    <div className="pt-2 pr-8 pl-8 pb-2 bg-white fixed left-0 right-0 mx-auto shadow-2xl appearance-none rounded w-64 opacity-95 z-50 flex flex-col content-center" ref={ref}>
        <svg className="cursor-pointer absolute right-0 top-0 w-6 mr-1 mt-1 fill-current text-primary" onClick={close} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        <h3 className="text-xs mb-2">Scan with smartphone, it will redirect to this room</h3>
        <div className="mx-auto">
            <QRCode size={200} value={value} />
        </div>
    </div>
))

export default QRCodePopup