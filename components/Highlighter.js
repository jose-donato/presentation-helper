import { Fragment } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { solarizedDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Highlighter({language, snippet}) {
    return (
        <Fragment>
            <CopyToClipboard text={snippet}
                onCopy={() => console.log(true)}>
                <button>Copy</button>
            </CopyToClipboard>
            <SyntaxHighlighter language={language} style={solarizedDark}>
                {snippet}
            </SyntaxHighlighter>
        </Fragment>
    );
}