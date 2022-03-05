import Layout from "components/layout"
import useAppContext from 'utils/context'

export default function MePage() {
  const { currentUser } = useAppContext()

  return (
    <Layout>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </Layout>
  )
}
