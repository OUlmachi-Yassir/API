import { useContext } from "react"
import { UserStateContext, useUserContext } from "../context/UserContext"



export default function Home() {
  const context = useUserContext()
  return (
    <div>
        <h1>home</h1>
    </div>
  )
}

