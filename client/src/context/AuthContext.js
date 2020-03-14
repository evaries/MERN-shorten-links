import { createContext } from 'react'

//just function for doing nothing
function noop() { }

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})