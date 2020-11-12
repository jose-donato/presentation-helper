import { ToastProvider } from 'react-toast-notifications'
import Link from "next/link"
const Layout = ({ children }) => {
    return <ToastProvider>
        <div className="flex flex-col mx-auto max-w-xl py-5 content-center container px-6">
            <header className="flex mb-6 justify-center">
                <img className="h-10 mr-6" src="/presentation.svg" alt="talkhelper logo" />
                <h1 className="text-2xl mt-1 sm:text-3xl text-blue-800 font-bold"><Link href="/"><a>presentation-helper.vercel.app</a></Link></h1>
            </header>
            <main className="pb-5 text-gray-900 text-sm font-normal">
                {children}
            </main>
            <footer className="">
                <div className="text-right p-10 pr-0 text-xs font-hairline text-gray-700">
                    <p className="mb-1">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
                    <p className="mb-1">Developed by <a href="https://jose-donato.me" title="jose-donato.me">jose-donato.me</a></p>
                    <p className="mb-1">Made with <a href="https://firebase.google.com/" title="Firebase">Firebase</a>, <a href="https://nextjs.org/" title="Next.js">Next.js</a> and <a href="https://tailwindcss.com/" title="tailwindcss">tailwindcss</a></p>
                    <p>Deployed in <a href="http://vercel.com/" title="Vercel">Vercel</a></p>
                </div>
            </footer>
        </div>
    </ToastProvider>
}

export default Layout