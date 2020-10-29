import { useForm } from "react-hook-form"
import { addCollectionItemToRoom } from "../../lib/db";
const AddLink = ({roomId}) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = data => {
    addCollectionItemToRoom({ link: data.link }, roomId, 'links').then(() => reset())
  };

  return (
    <form className="flex flex-col mb-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <label htmlFor="link" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Link
      </label>
        <input name="link" id="link" ref={register({
          required: true, pattern: new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i')
        })} placeholder="https://vercel.com" className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} type="text" />
        {errors.link && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">URL is not valid</span>}
      </div>
      <input type="submit" className={`self-end w-24 mb-4 mt-4`} value="Add link" />
    </form>
  )
}

export default AddLink