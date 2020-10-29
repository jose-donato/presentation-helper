import { forwardRef } from "react"
import QRCode from "react-qr-code"
const QRCodePopup = forwardRef(({ value }, ref) => (<div className="" ref={ref}>
    <QRCode value={value} />
</div>
))

export default QRCodePopup