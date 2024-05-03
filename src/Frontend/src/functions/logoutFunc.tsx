import { useEffect } from "react"
import { redirect } from "react-router-dom";

const LogoutFunc = () => {
    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('nivel');
        redirect('/registro')
    }, []);
};

export default LogoutFunc