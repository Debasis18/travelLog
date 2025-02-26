import { useEffect } from 'react'
import { useAuth } from '../contexts/FakeAuthContext'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth()
    const nevigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) nevigate("/")
    }, [isAuthenticated, nevigate])

    return isAuthenticated ? children : null
}

export default ProtectedRoute