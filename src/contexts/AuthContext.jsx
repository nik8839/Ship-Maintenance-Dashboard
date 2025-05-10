import { createContext, useEffect ,useContext,useState } from "react"
import { getFromLocalStorage,setToLocalStorage,removeFromLocalStorage } from "../utils/localStorageUtils"

const AuthContext = createContext()

const USERS=[
  { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
  { id: '2', role: 'Inspector', email: 'inspector@entnt.in', password: 'inspect123' },
  { id: '3', role: 'Engineer', email: 'engineer@entnt.in', password: 'engine123' },
];

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(getFromLocalStorage('user') || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = getFromLocalStorage('user')
    if (storedUser) {
      setUser(storedUser)
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const foundUser = USERS.find(user => user.email === email && user.password === password)
    if (foundUser) {
      setUser(foundUser)
      setToLocalStorage('user', foundUser)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    removeFromLocalStorage('user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);


