import { useRouter } from "next/router"
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { createRoom } from '../lib/db'
import { generateName } from '../lib/utils'
import { useToasts } from "react-toast-notifications"

export default function Home() {
  const { addToast } = useToasts()
  const [submitting, setSubmitting] = useState()
  const [joinSubmitting, setJoinSubmitting] = useState()
  const [slug, setSlug] = useState("")
  const [joinSlug, setJoinSlug] = useState("")
  const { push } = useRouter()

  const createRoomHandler = async () => {
    setSubmitting(true)
    if (slug === "") {
      return;
    }
    try {
      const success = await createRoom(slug, {})
      setSubmitting(false)
      if (success) {
        addToast('Room available. Redirecting...', { appearance: 'success', autoDismiss: true })
        setTimeout(() => { push(`/room/${slug}`) }, 200)
      }
      else alert("room already exists")
    } catch (err) {
      setSubmitting(false)
      console.log(err)
    }
  }

    const joinRoomHandler = async () => {
    setJoinSubmitting(true)
    if (slug === "") {
      return;
    }
    try {
      const success = await createRoom(slug, {})
      setJoinSubmitting(false)
      if (success) {
        addToast('Room available. Redirecting...', { appearance: 'success', autoDismiss: true })
        setTimeout(() => { push(`/room/${slug}`) }, 200)
      }
      else alert("room already exists")
    } catch (err) {
      setSubmitting(false)
      console.log(err)
    }
  }

  useEffect(() => {
    setSlug(generateName())
  }, [])

  return (
    <Fragment>
      <p className="mb-4">Helper for your presentations. Create a room, share the url with the attendees and colab!</p>
      <div className="flex flex-col p-10 rounded-3xl content-center bg-white divide-y">
        <div className="mb-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              for="username"
            >
              Slug
              </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => setSlug(e.currentTarget.value)}
              required
              autofocus
              value={slug}
            />
          </div>
          <button className={`self-end ${submitting ? "bg-blue-200 cursor-not-allowed" : ""}`} onClick={createRoomHandler}>{submitting ? "Creating Room" : "Create Room"}</button>
        </div>
        <div>
          <div className="mb-4 mt-8">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              for="username"
            >
              Slug
              </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => setJoinSlug(e.currentTarget.value)}
              required
              value={joinSlug}
              placeholder="Room slug"
            />
          </div>
          <button className={`self-end ${submitting ? "bg-blue-200 cursor-not-allowed" : ""}`} onClick={joinRoomHandler}>{joinSubmitting ? "Joining Room" : "Join Room"}</button>
        </div>


      </div>
    </Fragment>
  )
}
