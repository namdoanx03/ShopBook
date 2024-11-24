import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)

    return (
        <>
        {isAuthenticated === true ?
        
            // eslint-disable-next-line react/prop-types
            <>{props.children}</>    
            :
            <Navigate to='/login' replace />
            }
        </>
    )
}
export default ProtectedRoute