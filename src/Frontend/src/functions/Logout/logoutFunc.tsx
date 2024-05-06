import { useEffect } from "react"
import { Navigate, useNavigate, redirect } from "react-router-dom";

const LogoutFunc = () => {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('nivel');
        navigate('/login')
    }, [navigate])

    return <Navigate to="/login" replace />
};

export default LogoutFunc