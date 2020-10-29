import { useRouter } from "next/router"
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { checkIfRoomExists, createRoom } from '../lib/db'
import { generateName } from '../lib/utils'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [submitting, setSubmitting] = useState()
  const [slug, setSlug] = useState("")
  const [wantsCustomSlug, setWantsCustomSlug] = useState(false)
  const { push } = useRouter()

  const createRoomHandler = async () => {
    if (slug === "") {
      return;
    }
    try {
      const success = await createRoom(slug, {})
      if(success) push(`/room/${slug}`)
      else alert("room already exists")
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    setSlug(generateName())
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>Slug: {slug}</p>
        <input type="checkbox" value={wantsCustomSlug} onChange={() => setWantsCustomSlug(!false)} />
        {wantsCustomSlug && <input value={slug} type="text" onChange={(e) => setSlug(e.currentTarget.value)} />}
        <button onClick={createRoomHandler}>Create Room</button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
