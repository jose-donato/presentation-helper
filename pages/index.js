import { Fragment } from 'react'
import JoinRoom from "../components/forms/JoinRoom"
import CreateRoom from "../components/forms/CreateRoom"

export default function Home() {
  return (
    <Fragment>
      <p className="mb-8">Helper for your presentations. Create a room, share the url with the attendees and colab!</p>
      <div className="flex flex-col p-10 rounded-3xl content-center bg-white divide-y">
        <CreateRoom />
        <JoinRoom />
      </div>
    </Fragment>
  )
}
