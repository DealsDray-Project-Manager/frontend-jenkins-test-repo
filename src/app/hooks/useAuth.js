import { useContext } from 'react'
// import AuthContext from 'app/contexts/JWTAuthContext'
import AuthContext from 'app/contexts/PrexoAuthContext'
// import AuthContext from 'app/contexts/Auth0Context'

const useAuth = () => useContext(AuthContext)

export default useAuth
