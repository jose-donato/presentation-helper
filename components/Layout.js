import { ToastProvider } from 'react-toast-notifications'

const Layout = ({ children }) => {
    return <ToastProvider>
        <div className="flex flex-col mx-auto max-w-xl py-5 content-center container">
            <header className="flex mb-10 justify-center">
                <img className="h-10 mr-6" src="/presentation.svg" alt="talkhelper logo" />
                <h1 className="text-3xl text-blue-800 font-bold">talk-helper.vercel.app</h1>
            </header>
            <main className="px-10 pb-5 text-gray-900 text-sm font-normal">
                {children}
            </main>
            <footer className="px-2">
                <div className="text-right p-10 pr-0 text-xs font-hairline text-gray-700">
                    <p>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
                </div>
            </footer>
        </div>
    </ToastProvider>
}

export default Layout