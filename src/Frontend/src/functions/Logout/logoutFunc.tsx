import { useEffect } from "react"
import { Navigate, useNavigate, redirect } from "react-router-dom";

const LogoutFunc = () => {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('nivel');
        navigate('/registro')
    }, [navigate])

    return <Navigate to="/registro" replace />
};

export default LogoutFunc