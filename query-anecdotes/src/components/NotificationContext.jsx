import { createContext, useState } from "react"

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null)

  const notifyWith = (message) => {
    setNotification(message)
    setInterval(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, notifyWith }}>
      {props.children}
    </NotificationContext.Provider>
  )
}
