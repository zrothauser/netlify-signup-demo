import { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

import netlifyAuth from '../netlifyAuth.js'

export default function Home() {
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
  let [user, setUser] = useState(null)

  let login = () => {
    netlifyAuth.authenticate((user) => {
      setLoggedIn(!!user)
      setUser(user)
      netlifyAuth.closeModal()
    })
  }

  let logout = () => {
    netlifyAuth.signout(() => {
      setLoggedIn(false)
      setUser(null)
    })
  }

  useEffect(() => {
    netlifyAuth.initialize((user) => {
      setLoggedIn(!!user)
      setUser(user)
    })
  }, [loggedIn])

  return (
    <div className="container">
      <Head>
        <title>Next Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />

        {loggedIn ? (
          <div>
            You are logged in!

            {user && <>Welcome {user?.user_metadata.full_name}!</>}
            <br />
            <button onClick={logout}>
              Log out here.
            </button>
          </div>
        ) : (
          <button onClick={login}>
            Log in here.
          </button>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-family: Menlo, Monaco, Lucida Console, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
