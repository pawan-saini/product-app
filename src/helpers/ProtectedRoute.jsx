import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import AuthContext from './AuthContext'
import { getToken } from './index'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, accessBy }) => {
  const { user } = useContext(AuthContext)

  if (accessBy === 'non-authenticated') {
    if (!user) {
      return children
    }
  } else if (accessBy === 'authenticated') {
    if (user) {
      return children
    }
  }
  const token = getToken()
  let path = '/'
  if (token) {
    path = '/dashboard'
  }

  return <Navigate to={path}></Navigate>
}

export default ProtectedRoute
