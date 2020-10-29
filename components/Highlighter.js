import SyntaxHighlighter from 'react-syntax-highlighter';
import { solarizedDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Highlighter({ language, snippet }) {
    return (
        <SyntaxHighlighter language={language} style={solarizedDark} className="rounded">
            {snippet}
        </SyntaxHighlighter>
    );
}