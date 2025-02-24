import { Fragment } from 'react'
import JoinRoom from "../components/forms/JoinRoom"
import CreateRoom from "../components/forms/CreateRoom"
export default function Home() {
  return (
    <Fragment>
      <p className="mb-8 w-2/3 text-center mx-auto text-gray-800">Helper for your presentations. Create a room, share the url with the attendees and colab!</p>
      <div className="flex flex-col p-10 rounded-3xl content-center bg-white divide-y shadow-2xl">
        <CreateRoom />
        <JoinRoom />
      </div>
    </Fragment>
  )
}
