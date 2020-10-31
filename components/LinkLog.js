const { default: SnippetLog } = require("./SnippetLog")

const LinkLog = ({ link }) => {
    /*const [links, setLinks] = useState(room.links)
    const { addToast } = useToasts()*/

    return (
        <li className="mb-6">
            <div className="flex flex-col justify-between">
                <a target="_blank"
                    rel="noopener noreferrer" className="font-semibold" href={link.link}>
                    {link.link}
                </a>
                <span className="text-xs">Added at {link.date.string}</span>
            </div>
        </li>
    )
}

export default LinkLog