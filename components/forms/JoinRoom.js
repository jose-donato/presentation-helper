import { useForm } from "react-hook-form"
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router"
import { checkIfRoomExists } from "../../lib/db";
import { useState } from "react";
const JoinRoom = () => {
    const [submitting, setSubmitting] = useState(false)
    const { push } = useRouter()
    const { addToast } = useToasts()
    const { register, handleSubmit, errors, reset } = useForm();
    const onSubmit = async data => {
        setSubmitting(true)
        if (data.joinSlug === "") {
            return;
        }
        try {
            const exists = await checkIfRoomExists(data.joinSlug)
            setSubmitting(false)
            if (exists) {
                addToast('Room available. Redirecting...', { appearance: 'success', autoDismiss: true })
                push(`/room/${data.joinSlug}`)
            }
            else addToast('Room does not exist, create one!', { appearance: 'warning', autoDismiss: true })
        } catch (err) {
            setSubmitting(false)
            console.log(err)
        }
    };

    return (
        <form className="flex flex-col mt-4 pt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
                <label htmlFor="joinSlug" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    ID of room to join
                </label>
                <input name="joinSlug" id="joinSlug" ref={register({
                    required: true, pattern: /^\S*$/
                })} placeholder="room-id-123" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                {errors.joinSlug && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">Room id cannot have spaces</span>}
            </div>
            <input type="submit" id="joinRoomButton" className={`primaryButton self-end w-24 mb-4 mt-4`} value={submitting ? "Joining Room" : "Join Room"} />
        </form>
    )
}

export default JoinRoom