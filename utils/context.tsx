import { useContext, createContext, Context, useEffect, useState } from "react"

type User = {
  emai: string;
  id: string;
  image: string;
  name: string;
}
export const AppContext: Context<any> = createContext<any>(null)

export const AppContextProvider = ({ children }: any) => {
  const [currentUser, setUser] = useState<User | null>(null);  
  useEffect(() => {
    ;(async () => {
      console.log("CONTEXT")
      const session = await fetch('/api/examples/session').then((res) => res.json())
      const token = await fetch('/api/examples/jwt').then((res) => res.json())
      console.log({ session, token });
      if (!session || !token) {
        console.log("Loading ...")
      } else {
        if(!session?.user?.name) {
          setUser(token.user)
        }
      }
    })()
  }, [])

  return <AppContext.Provider value={{currentUser}}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    console.error("Error deploying App Context!!!")
  }
  return context
}

export default useAppContext
