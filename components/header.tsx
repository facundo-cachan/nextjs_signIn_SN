import { useEffect, useState } from "react"
import Link from "next/link"
import { signIn, signOut } from "next-auth/react"
import styles from "./header.module.css"
import useAppContext from "utils/context"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { currentUser } = useAppContext()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    console.log({ currentUser, loading });
    setLoading(currentUser === null)
  }, [currentUser])

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            loading ? styles.loading : styles.loaded
          }`}
        >
          {loading ? (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href="/api/auth/signin"
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          ) : (
            <>
              {currentUser.image && (
                <span
                  style={{ backgroundImage: `url('${currentUser.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{currentUser.name ?? currentUser.email}</strong>
              </span>
              <a
                href="/api/auth/signout"
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/client">
              <a>Client</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/server">
              <a>Server</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/protected">
              <a>Protected</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/api-example">
              <a>API</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/admin">
              <a>Admin</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/me">
              <a>Me</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
