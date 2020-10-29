import { useForm } from "react-hook-form"
import { addCollectionItemToRoom } from "../../lib/db";
import highlighterLanguages from "../../lib/highlighterLanguages"

const AddSnippet = ({ roomId }) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const onSubmit = data => {
        addCollectionItemToRoom({ snippet: data.snippet, language: data.language }, roomId, 'snippets').then(() => reset())
    };
    return (
        <form className="flex flex-col mb-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mb-6">
                <label htmlFor="language" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Language
                </label>
                <div className="relative">
                    <select id="language" name="language"
                        ref={register({
                            required: true, validate: (val) => highlighterLanguages.includes(val)
                        })} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        {highlighterLanguages.map(l => (
                            <option key={l} value={l}>
                                {l}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
                {errors.language && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">Language must be one of the chosen ones</span>}
            </div>
            <div className="w-full">
                <label htmlFor="snippet" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Code Snippet
                </label>
                <div className="relative">
                    <textarea id="snippet" name="snippet" ref={register({ required: true })} className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" />
                </div>
                {errors.snippet && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-1">Code snippet is required</span>}
            </div>
            <input type="submit" className={`self-end w-24 px-2 mb-4 mt-4`} value="Add snippet" />
        </form>
    )
}

export default AddSnippet