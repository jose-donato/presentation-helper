import { useForm } from "react-hook-form"
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router"
import { createRoom } from "../../lib/db";
import { useState } from "react";
import { generateName } from "../../lib/utils";
const CreateRoom = () => {
    const [submitting, setSubmitting] = useState(false)
    const { push } = useRouter()
    const { addToast } = useToasts()
    const { register, handleSubmit, errors, reset } = useForm();
    const onSubmit = async data => {
       setSubmitting(true)
    if (data.createSlug === "") {
      return;
    }
    try {
      const success = await createRoom(data.createSlug, {})
      setSubmitting(false)
      if (success) {
        addToast('Room available. Redirecting...', { appearance: 'success', autoDismiss: true })
        push(`/room/${data.createSlug}`)
      }
      else addToast('Room already exists, create with another slug!', { appearance: 'error', autoDismiss: true })
    } catch (err) {
      alert(err)
      setSubmitting(false)
      console.log(err)
    } 
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
                <label htmlFor="createSlug" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    ID of room to create
                </label>
                <input name="createSlug" id="createSlug" ref={register({
                    required: true, pattern: /^\S*$/
                })} defaultValue={generateName()} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
                {errors.createSlug && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">Room id cannot have spaces</span>}
            </div>
            <input type="submit" id="primaryButton" className={`self-end w-24 mb-4 mt-4`} value={submitting ? "Creating Room" : "Create Room"} />
        </form>
    )
}

export default CreateRoom