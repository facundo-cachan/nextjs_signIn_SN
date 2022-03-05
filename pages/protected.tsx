import { useState, useEffect } from "react"
import Layout from "components/layout"
import AccessDenied from "components/access-denied"
import useAppContext from "utils/context"

export default function ProtectedPage() {
  const { currentUser } = useAppContext()
  const [content, setContent] = useState()

  useEffect(() => {
    ;(async () => {      
      const json = await fetch("/api/examples/protected").then((res) => res.json())
      if (json.content) {
        setContent(json.content)
      }
    })()
  }, [currentUser])

  // When rendering client side don't display anything until loading is complete
  // if (typeof window !== "undefined" && !currentUser) return null

  // If no session exists, display access denied message
  if (!currentUser) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>{content ?? "\u00a0"}</strong>
      </p>
    </Layout>
  )
}
